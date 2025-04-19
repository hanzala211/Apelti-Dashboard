import { DATE_FOMRAT } from '@constants';
import { FilterTypes, Invoice } from '@types';
import dayjs from 'dayjs';

export const handleInvoiceFilters = (
  invoices: Invoice[] | undefined,
  filters: FilterTypes[]
) => {
  if (!invoices) return invoices;
  if (!filters.length || !filters.some(f => f.field && f.condition && f.value)) return invoices;

  let filteredValues = [...invoices];

  filteredValues = filteredValues.filter((invoice) => {
    for (const filter of filters) {
      if (!filter.field || !filter.condition || !filter.value) continue;

      const invoiceValue = invoice[filter.field as keyof Invoice];
      if (invoiceValue === undefined || invoiceValue === null) return false;

      switch (filter.field) {
        case 'supplierName':
        case 'poNumber':
        case 'invoiceNumber': {
          const searchValue = String(filter.value).toLowerCase();
          const fieldValue = String(invoiceValue).toLowerCase();

          if (filter.condition === 'contains' && !fieldValue.includes(searchValue)) return false;
          if (filter.condition === 'equals' && fieldValue !== searchValue) return false;
          if (filter.condition === 'startsWith' && !fieldValue.startsWith(searchValue)) return false;
          break;
        }

        case 'invoiceDate':
        case 'paymentTerms': {
          if (typeof invoiceValue !== 'string') return false;

          const filterDate = dayjs(filter.value, DATE_FOMRAT);
          const invoiceDate = dayjs(invoiceValue, DATE_FOMRAT);

          if (!filterDate.isValid() || !invoiceDate.isValid()) return false;

          if (filter.condition === 'before' && !invoiceDate.isBefore(filterDate)) return false;
          if (filter.condition === 'after' && !invoiceDate.isAfter(filterDate)) return false;
          if (filter.condition === 'on' && !invoiceDate.isSame(filterDate, 'day')) return false;
          break;
        }

        case 'amount': {
          if (typeof invoiceValue !== 'number') return false;

          const filterAmount = parseFloat(filter.value);
          const invoiceAmount = invoiceValue;

          if (isNaN(filterAmount)) return false;

          if (filter.condition === 'equal' && invoiceAmount !== filterAmount) return false;
          if (filter.condition === 'greater' && invoiceAmount <= filterAmount) return false;
          if (filter.condition === 'lesser' && invoiceAmount >= filterAmount) return false;
          break;
        }
        default:
          break;
      }
    }
    return true;
  });

  return filteredValues;
};
