import { DATE_FOMRAT } from "@constants";
import { FilterTypes, Invoice } from "@types";
import dayjs from "dayjs";

export const handleInvoiceFilters = (invoices: Invoice[] | undefined, filters: FilterTypes[]) => {
  let filteredValues = invoices;
  if (!filteredValues) return;
  filteredValues = filteredValues.filter((invoice) => {
    for (const filter of filters) {
      if (!filter.field || !filter.condition || !filter.value) continue;

      switch (filter.field) {
        case 'supplierName': {
          if (
            filter.condition === 'contains' &&
            !invoice[filter.field].toLowerCase().includes(filter.value.toLowerCase())
          )
            return false;
          if (
            filter.condition === 'equals' &&
            invoice[filter.field].toLowerCase() !== filter.value.toLowerCase()
          )
            return false;
          if (
            filter.condition === 'startsWith' &&
            !invoice[filter.field].toLowerCase().startsWith(filter.value.toLowerCase())
          )
            return false;
          break;
        }

        case 'invoiceDate':
        case 'paymentTerms': {
          const filterDate = filter.value
            ? dayjs(filter.value, DATE_FOMRAT)
            : null;
          const invoiceDate = invoice[filter.field]
            ? dayjs(invoice[filter.field], DATE_FOMRAT)
            : null;

          if (
            filterDate &&
            invoiceDate &&
            filterDate.isValid() &&
            invoiceDate.isValid()
          ) {
            if (
              filter.condition === 'before' &&
              !invoiceDate.isBefore(filterDate)
            )
              return false;
            if (
              filter.condition === 'after' &&
              !invoiceDate.isAfter(filterDate)
            )
              return false;
            if (
              filter.condition === 'on' &&
              !invoiceDate.isSame(filterDate, 'day')
            )
              return false;
          } else {
            return false;
          }
          break;
        }

        case 'invoiceNumber':
        case 'amount':
        case 'poNumber': {
          const filterAmount = parseFloat(filter.value);
          const invoiceAmount = parseFloat(invoice[filter.field] as string);

          if (filter.condition === 'equal' && invoiceAmount !== filterAmount)
            return false;
          if (filter.condition === 'greater' && invoiceAmount <= filterAmount)
            return false;
          if (filter.condition === 'lesser' && invoiceAmount >= filterAmount)
            return false;
          break;
        }
        default:
          break;
      }
    }
    return true;
  });

  return filteredValues
};