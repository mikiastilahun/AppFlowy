import { DatabaseController } from '@/appflowy_app/stores/effects/database/database_controller';
import AddSvg from '../../_shared/svg/AddSvg';
import { useGridTableHeaderHooks } from './GridTableHeader.hooks';
import { GridTableHeaderItem } from './GridTableHeaderItem';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '$app/stores/store';
import { DragDropContext, Draggable, Droppable, DroppableProvided, OnDragEndResponder } from 'react-beautiful-dnd';

export const GridTableHeader = ({
  controller,
  onShowFilterClick,
  onShowSortClick,
}: {
  controller: DatabaseController;
  onShowFilterClick: () => void;
  onShowSortClick: () => void;
}) => {
  const columns = useAppSelector((state) => state.database.columns);
  const fields = useAppSelector((state) => state.database.fields);
  const { onAddField } = useGridTableHeaderHooks(controller);
  const { t } = useTranslation();

  const onColumnsDragEnd: OnDragEndResponder = async (result) => {
    // TODO: implement column reordering in the backend.
    console.log('onColumnsDragEnd', result);
  };

  return (
    <DragDropContext onDragEnd={onColumnsDragEnd}>
      <Droppable droppableId='Header' direction='horizontal'>
        {(droppableProvided: DroppableProvided) => (
          <div
            className={'flex select-none pl-8 text-xs'}
            style={{ userSelect: 'none' }}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {columns
              .filter((column) => column.visible)
              .map((column, i) => {
                return (
                  <GridTableHeaderItem
                    onShowFilterClick={onShowFilterClick}
                    onShowSortClick={onShowSortClick}
                    field={fields[column.fieldId]}
                    fieldId={column.fieldId}
                    controller={controller}
                    key={i}
                    index={i}
                  />
                );
              })}

            {droppableProvided.placeholder}
            <div className='m-0 -ml-2 w-40 border border-l-0 border-r-0 border-line-divider p-0 hover:bg-fill-list-hover hover:text-text-title'>
              <div className='flex cursor-pointer items-center px-4 py-2 text-text-caption ' onClick={onAddField}>
                <i className='mr-2 h-5 w-5'>
                  <AddSvg />
                </i>
                <span className={'whitespace-nowrap'}>{t('grid.field.newProperty')}</span>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
