import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetting } from '@context';
import { toast } from '@helpers';
import {
  INVOICE_ITEM_MAPPING_OPTIONS,
  INVOICE_FIELD_OPTIONS,
} from '@constants';
import { ColumnConfig, ItemMappingValue } from '@types';

export const useInvoiceConfig = () => {
  const {
    createInvoiceExportFormat,
    getInvoiceFormatExport,
    selectExportFormat,
    updateExportFieldsFormat,
  } = useSetting();
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
      toast.success('Invoice export format saved successfully');
      queryClient.invalidateQueries({ queryKey: ['invoiceFormat'] });
      setIsAddingNewImport(false);
      setExportFormatName('');
    },
    onError: (error) => {
      console.error('Error changing invoice export format:', error);
      toast.error('Error changing invoice export format', error.message);
    },
  });

  const selectExportFormatMutation = useMutation({
    mutationFn: (data: unknown) => selectExportFormat(data),
    onSuccess: () => {
      toast.success('Export format selected successfully');
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
    if (!invoiceFormat || invoiceFormat.length === 0) return;
    const first: Record<string, string | string[]> = invoiceFormat[0];
    if (selectedFormat && first._id !== selectedFormat._id) return;

    setSelectedFormat(first);
    setExportFormat(first.exportFormateName as string);
    setFieldOrder(first.fieldOrder as string[]);
    setColumns(formatInvoiceColumns(first));
  }, [invoiceFormat]);

  useEffect(() => {
    if (!selectedFormat) return;

    setColumns(formatInvoiceColumns(selectedFormat));
    setExportFormat(selectedFormat.exportFormateName as string);
    if (Array.isArray(selectedFormat.fieldOrder)) {
      setFieldOrder(selectedFormat.fieldOrder as string[]);
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

    if (fieldOrderArray.length > 0) {
      let hasItemMappingFields = false;

      fieldOrderArray.forEach((fieldKey) => {
        if (
          INVOICE_ITEM_MAPPING_OPTIONS.some(
            (option) => option.value === fieldKey
          )
        ) {
          hasItemMappingFields = true;
          return;
        }

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
      Object.entries(invoiceFormat).forEach(([key, value]) => {
        if (
          key === 'itemMapping' ||
          key === 'exportFormateName' ||
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
    setColumns((prev) => {
      const updatedColumns = prev.slice(0, -1);
      const newFieldOrder = updatedColumns.flatMap((col): string[] => {
        if (col.headerValue === 'itemMapping' && col.itemMapping) {
          return Object.values(col.itemMapping)
            .filter((mapping) => mapping.header.trim() !== '')
            .map((mapping) => mapping.value);
        } else if (col.headerValue) {
          return [col.headerValue];
        }
        return [];
      });
      setFieldOrder(newFieldOrder);
      return updatedColumns;
    });
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
    const result = {} as Record<string, unknown>;

    columns.forEach((col) => {
      if (col.headerValue === 'itemMapping' && col.itemMapping) {
        result[col.headerValue] = transformItemMappingForSaving(
          col.itemMapping
        );
      } else {
        result[col.headerValue] = col.headerName;
      }
    });
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
      itemAcc[key] = value.header;
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
    setFieldOrder
  };
};

export default useInvoiceConfig;