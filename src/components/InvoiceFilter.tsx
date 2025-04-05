import { DATE_FOMRAT, ICONS } from '@constants';
import { ReactSVG } from 'react-svg';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { FilterTypes } from '@types';

interface InvoiceFilterProps {
  filters: FilterTypes[];
  setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>;
}

export const InvoiceFilter: React.FC<InvoiceFilterProps> = ({
  filters,
  setFilters,
}) => {
  const addFilter = () => {
    if (filters.length < filterOptions.length)
      setFilters([
        ...filters,
        { id: filters.length + 1, field: '', condition: '', value: '' },
      ]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const updateFilter = (id: number, key: string, value: string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, [key]: value } : filter
      )
    );
  };

  const onDateChange = (
    _: dayjs.Dayjs,
    dateString: string | string[],
    id: number
  ) => {
    const formattedDate = Array.isArray(dateString)
      ? dateString[0]
      : dateString;
    updateFilter(id, 'value', formattedDate);
  };

  const filterOptions = [
    { label: 'Invoice Number', value: 'invoiceNumber' },
    { label: 'Supplier', value: 'supplierName' },
    { label: 'PO no.', value: 'poNumber' },
    { label: 'Invoice Date', value: 'invoiceDate' },
    { label: 'Payment Terms', value: 'paymentTerms' },
    { label: 'Amount', value: 'amount' },
  ];

  return (
    <div className="w-full relative h-full">
      <div className="flex flex-col gap-2">
        {filters.map((filter) => {
          const selectedFields = filters
            .filter((f) => f.id !== filter.id && f.field)
            .map((f) => f.field);

          return (
            <div key={filter.id} className="flex items-center gap-2">
              <p className="mb-0">Where</p>
              <select
                className="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-1.5 px-3 border-basicBlack border-[1px]"
                value={filter.field}
                onChange={(e) =>
                  updateFilter(filter.id, 'field', e.target.value)
                }
              >
                <option value="">Filter</option>
                {filterOptions
                  .filter((option) => !selectedFields.includes(option.value))
                  .map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>

              <select
                className="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-1.5 px-3 border-basicBlack border-[1px]"
                value={filter.condition}
                onChange={(e) =>
                  updateFilter(filter.id, 'condition', e.target.value)
                }
              >
                <option value="">Condition</option>
                {filter.field !== filterOptions[3].value &&
                  filter.field !== filterOptions[4].value &&
                  filter.field !== filterOptions[5].value &&
                  filter.field !== filterOptions[2].value &&
                  filter.field !== filterOptions[0].value && (
                    <>
                      <option value="contains">contains</option>
                      <option value="equals">equals</option>
                      <option value="startsWith">starts with</option>
                    </>
                  )}
                {(filter.field === filterOptions[3].value ||
                  filter.field === filterOptions[4].value) && (
                    <>
                      <option value="before">before</option>
                      <option value="after">after</option>
                      <option value="on">on</option>
                    </>
                  )}
                {(filter.field === filterOptions[5].value ||
                  filter.field === filterOptions[2].value ||
                  filter.field === filterOptions[0].value) && (
                    <>
                      <option value="equal">is equal to</option>
                      <option value="greater">greater than</option>
                      <option value="lesser">lesser than</option>
                    </>
                  )}
              </select>

              {filter.field !== filterOptions[3].value &&
                filter.field !== filterOptions[4].value ? (
                <input
                  type="text"
                  placeholder="Enter value..."
                  className="bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200"
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, 'value', e.target.value)
                  }
                />
              ) : (
                <DatePicker
                  format={DATE_FOMRAT}
                  placeholder={DATE_FOMRAT}
                  className="bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200"
                  value={filter.value ? dayjs(filter.value, DATE_FOMRAT) : null}
                  onChange={(date, dateString) =>
                    onDateChange(date, dateString, filter.id)
                  }
                />
              )}

              <ReactSVG
                src={ICONS.close}
                className="cursor-pointer"
                onClick={() => removeFilter(filter.id)}
                beforeInjection={(svg) => {
                  svg.style.width = '20px';
                }}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={addFilter}
        className="mt-2 flex gap-2 items-center text-neutralGray absolute top-full translate-y-1/2 text-sm"
      >
        <ICONS.plusIcon /> Add Filter
      </button>
    </div>
  );
};

export default InvoiceFilter;
