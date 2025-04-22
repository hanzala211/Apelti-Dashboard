import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useSetting } from '@context';
import { toast } from '@helpers';
import {
  INVOICE_ITEM_MAPPING_OPTIONS,
  INVOICE_FIELD_OPTIONS,
} from '@constants';

interface ItemMappingValue {
  header: string;
  value: string;
}

export interface ColumnConfig {
  id: string;
  headerName: string;
  headerValue: string;
  itemMapping?: {
    [key: string]: ItemMappingValue;
  };
}

export const useInvoiceConfig = () => {
  const {
    createInvoiceExportFormat,
    getInvoiceFormatExport,
    selectExportFormat,
    updateExportFieldsFormat,
  } = useSetting();
  const { setUserData } = useAuth();
  const queryClient = useQueryClient();
  const [exportFormat, setExportFormat] = useState<string>('');
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: '1', headerName: '', headerValue: '' },
  ]);
  const [fieldOrder, setFieldOrder] = useState<string[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [isAddingNewImport, setIsAddingNewImport] = useState<boolean>(false);
  const [exportFormatName, setExportFormatName] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<Record<
    string,
    string | string[]
  > | null>(null);

  const createInvoiceExportFormatMutation = useMutation({
    mutationFn: createInvoiceExportFormat,
    onSuccess: () => {
      console.log('Invoice export format changed successfully');
      toast.success('Invoice export format saved successfully');
      setIsAddingNewImport(false);
      setExportFormatName('');
      queryClient.invalidateQueries({ queryKey: ['invoiceFormat'] });
    },
    onError: (error) => {
      console.error('Error changing invoice export format:', error);
      toast.error('Error changing invoice export format', error.message);
    },
  });

  const selectExportFormatMutation = useMutation({
    mutationFn: (data: unknown) => selectExportFormat(data),
    onSuccess: () => {
      console.log('Export format selected successfully');
      toast.success('Export format selected successfully');
      setUserData((prev) =>
        prev
          ? { ...prev, exportFormatMethodId: selectedFormat?._id as string }
          : prev
      );
    },
    onError: (error) => {
      console.error('Error selecting export format:', error);
      toast.error('Error selecting export format', error.message);
    },
  });

  const updateExportFieldsFormatMutation = useMutation({
    mutationFn: (data: unknown) =>
      updateExportFieldsFormat(selectedFormat?._id as string, data),
    onSuccess: () => {
      console.log('Export fields format updated successfully');
      toast.success('Export fields format updated successfully');
      queryClient.invalidateQueries({ queryKey: ['invoiceFormat'] });
    },
    onError: (error) => {
      console.error('Error updating export fields format:', error);
      toast.error('Error updating export fields format', error.message);
    },
  });

  const { data: invoiceFormat, isLoading: isFormatLoading } = useQuery({
    queryKey: ['invoiceFormat'],
    queryFn: getInvoiceFormatExport,
  });

  useEffect(() => {
    if (!invoiceFormat || isFormatLoading || invoiceFormat.length === 0) return;
    setSelectedFormat(invoiceFormat[0]);
    if (invoiceFormat[0].exportFormateName) {
      setExportFormat(invoiceFormat[0].exportFormateName as string);
    }

    if (
      invoiceFormat[0].fieldOrder &&
      Array.isArray(invoiceFormat[0].fieldOrder)
    ) {
      setFieldOrder(invoiceFormat[0].fieldOrder as string[]);
    }

    const formattedColumns = formatInvoiceColumns(invoiceFormat[0]);
    if (formattedColumns.length > 0) {
      setColumns(formattedColumns);
    }
  }, [invoiceFormat, isFormatLoading]);

  useEffect(() => {
    if (selectedFormat) {
      const formattedColumns = formatInvoiceColumns(selectedFormat);
      if (formattedColumns.length > 0) {
        setColumns(formattedColumns);
        setExportFormat(selectedFormat.exportFormateName as string);
      }

      if (
        selectedFormat.fieldOrder &&
        Array.isArray(selectedFormat.fieldOrder)
      ) {
        setFieldOrder(selectedFormat.fieldOrder as string[]);
      }
    }
  }, [selectedFormat]);

  const formatInvoiceColumns = (
    invoiceFormat: Record<string, unknown>
  ): ColumnConfig[] => {
    const columns: ColumnConfig[] = [];
    let columnCounter = 1;
    const fieldOrderArray = Array.isArray(invoiceFormat.fieldOrder)
      ? (invoiceFormat.fieldOrder as string[])
      : [];

    // If we have a fieldOrder array, use it to order the columns
    if (fieldOrderArray.length > 0) {
      // Track if we need an item mapping column
      let hasItemMappingFields = false;

      // Process fields according to fieldOrder
      fieldOrderArray.forEach((fieldKey) => {
        // If this is an item mapping field, mark that we need an item mapping column
        if (
          INVOICE_ITEM_MAPPING_OPTIONS.some(
            (option) => option.value === fieldKey
          )
        ) {
          hasItemMappingFields = true;
          return;
        }

        // Regular field
        const isValidOption = INVOICE_FIELD_OPTIONS.some(
          (option) => option.value === fieldKey
        );

        if (isValidOption && invoiceFormat[fieldKey] !== undefined) {
          columns.push({
            id: `column-${columnCounter++}`,
            headerName: invoiceFormat[fieldKey] as string,
            headerValue: fieldKey,
          });
        }
      });

      // Add item mapping column if needed
      if (
        hasItemMappingFields &&
        invoiceFormat.itemMapping &&
        typeof invoiceFormat.itemMapping === 'object'
      ) {
        columns.push(
          createItemMappingColumn(
            invoiceFormat.itemMapping as Record<string, string>,
            columnCounter
          )
        );
      }
    } else {
      // Fallback to the original implementation if no fieldOrder
      Object.entries(invoiceFormat).forEach(([key, value]) => {
        if (
          key === 'itemMapping' ||
          key === 'exportFormatName' ||
          key === 'fieldOrder'
        )
          return;

        const isValidOption = INVOICE_FIELD_OPTIONS.some(
          (option) => option.value === key
        );
        if (isValidOption) {
          columns.push({
            id: `column-${columnCounter++}`,
            headerName: value as string,
            headerValue: key,
          });
        }
      });

      if (
        invoiceFormat.itemMapping &&
        typeof invoiceFormat.itemMapping === 'object'
      ) {
        columns.push(
          createItemMappingColumn(
            invoiceFormat.itemMapping as Record<string, string>,
            columnCounter
          )
        );
      }
    }

    return columns;
  };

  const createItemMappingColumn = (
    itemMappingData: Record<string, string>,
    columnId: number
  ): ColumnConfig => {
    const mappingColumn: ColumnConfig = {
      id: `column-${columnId}`,
      headerName: 'Item Mapping',
      headerValue: 'itemMapping',
      itemMapping: {},
    };

    INVOICE_ITEM_MAPPING_OPTIONS.forEach((option) => {
      let headerForValue = '';
      Object.entries(itemMappingData).forEach(([header, value]) => {
        if (value === option.value) {
          headerForValue = header;
        }
      });

      if (headerForValue !== '') {
        mappingColumn.itemMapping![option.value] = {
          header: headerForValue,
          value: option.value,
        };
      }
    });

    return mappingColumn;
  };

  const addColumn = () => {
    const columnId = `column-${columns.length + 1}`;
    setColumns((prev) => [
      ...prev,
      { id: columnId, headerName: '', headerValue: '' },
    ]);
  };

  const removeLastColumn = () => {
    setColumns((prev) => prev.slice(0, -1));
    updateFieldOrderInSelectedFormat();
  };

  const updateColumn = (
    id: string,
    field: 'headerName' | 'headerValue',
    value: string
  ) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== id) return col;

        if (field === 'headerValue' && value === 'itemMapping') {
          return createItemMappingColumnFromExisting(col, value);
        }

        const updatedCol = { ...col, [field]: value };

        if (field === 'headerValue' && value !== 'itemMapping') {
          updateFieldOrderInSelectedFormat();
        }

        return updatedCol;
      })
    );
    setShowError(false);
  };

  const createItemMappingColumnFromExisting = (
    column: ColumnConfig,
    value: string
  ): ColumnConfig => {
    const initialItemMapping: { [key: string]: ItemMappingValue } = {};

    INVOICE_ITEM_MAPPING_OPTIONS.forEach((option) => {
      initialItemMapping[option.value] = {
        header: '',
        value: option.value,
      };
    });

    return {
      ...column,
      headerValue: value,
      itemMapping: initialItemMapping,
    };
  };

  const updateItemMapping = (
    columnId: string,
    field: string,
    header: string
  ) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;

        const updatedItemMapping = {
          ...(col.itemMapping || {}),
          [field]: {
            ...(col.itemMapping?.[field] || { value: field }),
            header,
          },
        };

        return {
          ...col,
          itemMapping: updatedItemMapping,
        };
      })
    );

    updateFieldOrderInSelectedFormat();
    setShowError(false);
  };

  const updateFieldOrderInSelectedFormat = () => {
    const newFieldOrder = columns.flatMap((col): string[] => {
      if (col.headerValue === 'itemMapping' && col.itemMapping) {
        return Object.values(col.itemMapping)
          .filter((mapping) => mapping.header.trim() !== '')
          .map((mapping) => mapping.value);
      } else if (col.headerValue) {
        return [col.headerValue];
      }
      return [];
    });

    console.log('New field order:', newFieldOrder);
    setFieldOrder(newFieldOrder);
  };

  const validateFields = (): boolean => {
    return columns.every((col) => {
      if (!col.headerName || !col.headerValue) return false;

      if (col.headerValue === 'itemMapping') {
        return (
          col.itemMapping &&
          Object.values(col.itemMapping).every(
            (mapping) => mapping.header.trim() !== ''
          )
        );
      }

      return true;
    });
  };

  const transformColumnsForSaving = (): Record<string, unknown> => {
    const result = columns.reduce((acc, col) => {
      if (col.headerValue === 'itemMapping' && col.itemMapping) {
        acc[col.headerValue] = transformItemMappingForSaving(col.itemMapping);
      } else {
        acc[col.headerValue] = col.headerName;
      }
      return acc;
    }, {} as Record<string, unknown>);

    result.fieldOrder = fieldOrder;

    if (exportFormatName) {
      result.exportFormateName = exportFormatName;
    } else if (exportFormat) {
      result.exportFormateName = exportFormat;
    }

    return result;
  };

  const transformItemMappingForSaving = (
    itemMapping: Record<string, ItemMappingValue>
  ): Record<string, string> => {
    return Object.entries(itemMapping).reduce((itemAcc, [key, value]) => {
      itemAcc[value.header] = key;
      return itemAcc;
    }, {} as Record<string, string>);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updated = Array.from(columns);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);

    setColumns(updated);

    const newFieldOrder = updated.flatMap((col): string[] => {
      if (col.headerValue === 'itemMapping' && col.itemMapping) {
        return Object.values(col.itemMapping)
          .filter((mapping) => mapping.header.trim() !== '')
          .map((mapping) => mapping.value);
      } else if (col.headerValue) {
        return [col.headerValue];
      }
      return [];
    });

    console.log(newFieldOrder);

    setFieldOrder(newFieldOrder);
  };

  return {
    exportFormat,
    setExportFormat,
    columns,
    showError,
    addColumn,
    removeLastColumn,
    updateColumn,
    updateItemMapping,
    validateFields,
    transformColumnsForSaving,
    setShowError,
    fieldOrder,
    onDragEnd,
    isLoading: isFormatLoading,
    createInvoiceExportFormatMutation,
    isAddingNewImport,
    setIsAddingNewImport,
    exportFormatName,
    setExportFormatName,
    selectedFormat,
    setSelectedFormat,
    invoiceFormat,
    selectExportFormatMutation,
    updateExportFieldsFormatMutation,
  };
};

export default useInvoiceConfig;
