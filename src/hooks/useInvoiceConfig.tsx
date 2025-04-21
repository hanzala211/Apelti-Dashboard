import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSetting } from '@context';
import { toast } from '@helpers';
import { INVOICE_ITEM_MAPPING_OPTIONS, INVOICE_FIELD_OPTIONS } from '@constants';

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
  const { changeInvoiceExportFormat, getInvoiceFormatExport } = useSetting();
  const [exportFormat, setExportFormat] = useState<string>('');
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: '1', headerName: '', headerValue: '' },
  ]);
  const [showError, setShowError] = useState<boolean>(false);

  const changeInvoiceExportFormatMutation = useMutation({
    mutationFn: changeInvoiceExportFormat,
    onSuccess: () => {
      console.log('Invoice export format changed successfully');
      toast.success('Invoice export format saved successfully');
    },
    onError: (error) => {
      console.error('Error changing invoice export format:', error);
      toast.error('Error changing invoice export format', error.message);
    },
  });

  const { data: invoiceFormat, isLoading: isFormatLoading } = useQuery({
    queryKey: ["invoiceFormat"],
    queryFn: getInvoiceFormatExport,
  });

  useEffect(() => {
    if (!invoiceFormat || isFormatLoading) return;

    if (invoiceFormat.exportFormatName) {
      setExportFormat(invoiceFormat.exportFormatName as string);
    }

    const formattedColumns = formatInvoiceColumns(invoiceFormat);
    if (formattedColumns.length > 0) {
      setColumns(formattedColumns);
    }
  }, [invoiceFormat, isFormatLoading]);

  const formatInvoiceColumns = (invoiceFormat: Record<string, unknown>): ColumnConfig[] => {
    const columns: ColumnConfig[] = [];
    let columnCounter = 1;

    Object.entries(invoiceFormat).forEach(([key, value]) => {
      if (key === 'itemMapping' || key === 'exportFormatName') return;

      const isValidOption = INVOICE_FIELD_OPTIONS.some(option => option.value === key);
      if (isValidOption) {
        columns.push({
          id: `column-${columnCounter++}`,
          headerName: value as string,
          headerValue: key,
        });
      }
    });

    if (invoiceFormat.itemMapping && typeof invoiceFormat.itemMapping === 'object') {
      columns.push(createItemMappingColumn(invoiceFormat.itemMapping as Record<string, string>, columnCounter));
    }

    return columns;
  };

  const createItemMappingColumn = (itemMappingData: Record<string, string>, columnId: number): ColumnConfig => {
    const mappingColumn: ColumnConfig = {
      id: `column-${columnId}`,
      headerName: 'Item Mapping',
      headerValue: 'itemMapping',
      itemMapping: {}
    };

    INVOICE_ITEM_MAPPING_OPTIONS.forEach(option => {
      let headerForValue = '';
      Object.entries(itemMappingData).forEach(([header, value]) => {
        if (value === option.value) {
          headerForValue = header;
        }
      });

      if (headerForValue !== '') {
        mappingColumn.itemMapping![option.value] = {
          header: headerForValue,
          value: option.value
        };
      }
    });

    return mappingColumn;
  };

  const addColumn = () => {
    const columnId = `column-${columns.length + 1}`;
    setColumns(prev => [...prev, { id: columnId, headerName: '', headerValue: '' }]);
  };

  const removeLastColumn = () => {
    setColumns(prev => prev.slice(0, -1));
  };

  const updateColumn = (
    id: string,
    field: 'headerName' | 'headerValue',
    value: string
  ) => {
    setColumns(prev =>
      prev.map(col => {
        if (col.id !== id) return col;

        if (field === 'headerValue' && value === 'itemMapping') {
          return createItemMappingColumnFromExisting(col, value);
        }

        return { ...col, [field]: value };
      })
    );
    setShowError(false);
  };

  const createItemMappingColumnFromExisting = (column: ColumnConfig, value: string): ColumnConfig => {
    const initialItemMapping: { [key: string]: ItemMappingValue } = {};
    INVOICE_ITEM_MAPPING_OPTIONS.forEach(option => {
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
    setColumns(prev =>
      prev.map(col => {
        if (col.id !== columnId) return col;

        return {
          ...col,
          itemMapping: {
            ...(col.itemMapping || {}),
            [field]: {
              ...(col.itemMapping?.[field] || { value: field }),
              header,
            },
          },
        };
      })
    );
    setShowError(false);
  };

  const validateFields = (): boolean => {
    return columns.every(col => {
      if (!col.headerName || !col.headerValue) return false;

      if (col.headerValue === 'itemMapping') {
        return col.itemMapping &&
          Object.values(col.itemMapping).every(mapping => mapping.header.trim() !== '');
      }

      return true;
    });
  };

  const handleSave = () => {
    if (!validateFields()) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const transformedData = transformColumnsForSaving();
    changeInvoiceExportFormatMutation.mutate({
      ...transformedData,
      exportFormatName: exportFormat
    });
  };

  const transformColumnsForSaving = (): Record<string, unknown> => {
    return columns.reduce((acc, col) => {
      if (col.headerValue === 'itemMapping' && col.itemMapping) {
        acc[col.headerValue] = transformItemMappingForSaving(col.itemMapping);
      } else {
        acc[col.headerValue] = col.headerName;
      }
      return acc;
    }, {} as Record<string, unknown>);
  };

  const transformItemMappingForSaving = (itemMapping: Record<string, ItemMappingValue>): Record<string, string> => {
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
    handleSave,
    onDragEnd,
    isLoading: isFormatLoading,
  };
};

export default useInvoiceConfig; 