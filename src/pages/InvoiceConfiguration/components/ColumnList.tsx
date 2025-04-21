import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ColumnConfig } from './ColumnConfig';
import { INVOICE_FIELD_OPTIONS } from '@constants';

interface ColumnData {
  id: string;
  headerName: string;
  headerValue: string;
  itemMapping?: {
    [key: string]: {
      header: string;
      value: string;
    };
  };
}

interface ColumnListProps {
  columns: ColumnData[];
  updateColumn: (id: string, field: 'headerName' | 'headerValue', value: string) => void;
  updateItemMapping: (columnId: string, field: string, header: string) => void;
  onDragEnd: (result: DropResult) => void;
}

export const ColumnList: React.FC<ColumnListProps> = ({
  columns,
  updateColumn,
  updateItemMapping,
  onDragEnd,
}) => {
  const getAvailableOptions = (currentId: string) => {
    const used = columns
      .filter((c) => c.id !== currentId && c.headerValue)
      .map((c) => c.headerValue);
    return [
      ...INVOICE_FIELD_OPTIONS,
      { label: 'Item Mapping', value: 'itemMapping' },
    ].filter((opt) => !used.includes(opt.value));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns-droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-4"
          >
            {columns.map((column, index) => (
              <ColumnConfig
                key={column.id}
                column={column}
                index={index}
                updateColumn={updateColumn}
                updateItemMapping={updateItemMapping}
                availableOptions={getAvailableOptions(column.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnList; 