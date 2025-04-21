import { UncontrolledInput } from '@components';
import { ICONS, INVOICE_ITEM_MAPPING_OPTIONS } from '@constants';
import { Draggable } from '@hello-pangea/dnd';

interface ColumnConfigProps {
  column: {
    id: string;
    headerName: string;
    headerValue: string;
    itemMapping?: {
      [key: string]: {
        header: string;
        value: string;
      };
    };
  };
  index: number;
  updateColumn: (id: string, field: 'headerName' | 'headerValue', value: string) => void;
  updateItemMapping: (columnId: string, field: string, header: string) => void;
  availableOptions: { label: string; value: string }[];
}

export const ColumnConfig: React.FC<ColumnConfigProps> = ({
  column,
  index,
  updateColumn,
  updateItemMapping,
  availableOptions,
}) => {
  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col p-2 rounded-md transition-shadow ${snapshot.isDragging ? 'shadow-lg bg-gray-100' : ''
            } md:border-none border-b border-gray-200`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <UncontrolledInput
              type="text"
              placeholder="Enter Header Name"
              name={`header-${column.id}`}
              value={column.headerName}
              className="flex-1 w-full md:w-auto"
              setValue={(value) =>
                typeof value === 'string' &&
                updateColumn(column.id, 'headerName', value)
              }
            />
            <div className="flex items-center gap-4 w-full md:w-auto pb-2 md:pb-0">
              <select
                className="flex-1 md:flex-none bg-white rounded-md py-[2.5px] px-3 border border-basicBlack focus:outline-none focus:border-darkBlue hover:border-darkBlue transition-all duration-200"
                value={column.headerValue}
                onChange={(e) =>
                  updateColumn(
                    column.id,
                    'headerValue',
                    e.target.value
                  )
                }
              >
                <option value="">Select Field</option>
                {availableOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                {...provided.dragHandleProps}
                className="cursor-move p-2 hidden md:block"
              >
                <ICONS.menu className="h-5 w-5" />
              </button>
            </div>
          </div>
          {column.headerValue === 'itemMapping' && (
            <div className="md:ml-8 mt-4 space-y-2">
              {INVOICE_ITEM_MAPPING_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border-l-2 border-gray-200 pl-4 py-2 border-b md:border-b-0"
                >
                  <label className="min-w-[120px] md:min-w-[150px] text-sm font-medium">
                    {option.label}:
                  </label>
                  <UncontrolledInput
                    type="text"
                    placeholder="Enter Header"
                    name={`header-${column.id}-${option.value}`}
                    value={
                      column.itemMapping?.[option.value]
                        ?.header || ''
                    }
                    className="flex-1 w-full sm:w-auto mb-2 md:mb-0"
                    setValue={(value) => {
                      if (typeof value === 'string') {
                        updateItemMapping(
                          column.id,
                          option.value,
                          value
                        );
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnConfig; 