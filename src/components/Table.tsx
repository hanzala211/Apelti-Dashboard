import { ChangeEvent, ReactNode } from 'react';
import { TableSkeleton } from './TableSkeleton';
import { TableCheckbox } from './TableCheckbox';
import { formatDate } from '@helpers';

interface TableProps<T> {
  headings: string[];
  data: T[];
  keys: (keyof T)[];
  isLoading?: boolean;
  skeletonRowCount?: number;
  selectedIndex?: number | null;
  setSelectedIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  multiSelect?: boolean;
  selectedItems?: T[];
  onItemSelect?: (e: ChangeEvent<HTMLInputElement>, item: T) => void;
  actionLabel?: string;
  onActionClick?: (item: T, index: number) => void;
  validateCell?: (item: T, key: keyof T) => boolean;
  dateFields?: Array<keyof T>;
  renderCustomCell?: (item: T, key: keyof T) => ReactNode;
  tableContainerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  tableClassName?: string,
}

export const Table = <T,>({
  headings,
  data,
  keys,
  isLoading = false,
  skeletonRowCount = 20,
  selectedIndex,
  setSelectedIndex,
  multiSelect = false,
  selectedItems = [],
  onItemSelect,
  actionLabel,
  onActionClick,
  validateCell,
  dateFields = [] as Array<keyof T>,
  renderCustomCell,
  tableContainerClassName = "w-full mt-5 sm:max-h-[calc(100vh-270px)] max-h-[calc(100dvh-280px)] overflow-auto",
  rowClassName = "border-b border-silverGray last:border-0 hover:bg-gray-50",
  cellClassName = "px-6 py-4 text-[14px]",
  tableClassName = "text-left"
}: TableProps<T>) => {
  if (isLoading) {
    return (
      <TableSkeleton headings={headings} skeletonRowCount={skeletonRowCount} />
    );
  }

  return (
    <div className={tableContainerClassName}>
      <table className={`w-full text-sm ${tableClassName} text-gray-700`}>
        <thead className="sticky top-0 z-20 bg-paleGray border-silverGray border-b">
          <tr>
            {multiSelect ? <th className="px-6 py-4 font-medium text-[14px] text-slateGrey">Select</th> : <th></th>}
            {headings.map((heading, idx) => (
              <th
                key={idx}
                className="px-6 py-4 font-medium text-[14px] text-slateGrey"
              >
                {heading}
              </th>
            ))}
            {actionLabel && (
              <th className="px-6 py-4 font-medium text-[14px] text-slateGrey">
                {actionLabel}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowClassName}
            >
              {multiSelect ? (
                <td className={`${cellClassName} pl-3`}>
                  {onItemSelect && (
                    <TableCheckbox
                      isChecked={selectedItems.some(selected =>
                        JSON.stringify(selected) === JSON.stringify(item)
                      )}
                      onChange={(e) => onItemSelect(e, item)}
                    />
                  )}
                </td>
              ) : (
                <TableCheckbox
                  isChecked={selectedIndex === rowIndex}
                  onChange={() =>
                    setSelectedIndex && setSelectedIndex((prev) =>
                      prev === rowIndex ? null : rowIndex
                    )
                  }
                />
              )}

              {keys.map((key, colIndex) => {
                const hasError = validateCell ? !validateCell(item, key) : false;
                const isDateField = dateFields.includes(key);

                return (
                  <td
                    key={colIndex}
                    className={`${cellClassName} ${hasError ? "border-l border-basicRed bg-red-200" : ""
                      }`}
                  >
                    {renderCustomCell ? (
                      renderCustomCell(item, key)
                    ) : isDateField ? (
                      formatDate((item[key] as string) || "")
                    ) : key === 'status' ? (
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${item[key] === 'approved'
                          ? 'bg-temporaryGreen text-graphGreen'
                          : item[key] === 'rejected'
                            ? 'bg-temporaryRed text-basicRed'
                            : 'bg-gray-200 text-gray-800'
                          } ${item[key] === "active" && "text-primaryColor"} ${item[key] === "inactive" && "text-red-500"}`}
                      >
                        {((item[key] as string) || "").slice(0, 1).toUpperCase() +
                          ((item[key] as string) || "").slice(1)}
                      </span>
                    ) : (
                      (item[key] as ReactNode)
                    )}
                  </td>
                );
              })}

              {actionLabel && onActionClick && (
                <td className={cellClassName}>
                  <button
                    onClick={() => onActionClick(item, rowIndex)}
                    className="text-primaryColor bg-transparent hover:underline"
                  >
                    {actionLabel}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
