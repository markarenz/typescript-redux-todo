import Modal from './Modal';
import { useTodoDispatch, useTodoSelector } from '../store/reduxHooks';
import {
  setFilterModalOpen,
  sethideCompleted,
  setTagFilter,
  clearAll
} from '../store/todoSlice';
import IconCheckmark from './icons/IconCheckmark';

const FilterSelector = () => {
  const dispatch = useTodoDispatch();
  const { isFilterModalOpen, tagFilter, hideCompleted, tags } = useTodoSelector(
    (state) => state.todo
  );
  const handleCloseFilterModal = (): void => {
    dispatch(setFilterModalOpen('close'));
  };
  const handleToggleHideCompleted = (): void => {
    dispatch(sethideCompleted(hideCompleted ? 'show' : 'hide'));
  };
  const handleTagFilterChange = (t: string): void => {
    dispatch(setTagFilter(t));
  };
  const getTagBtnClass = (t: string) =>
    `text-gray-100 py-1 px-2 rounded-full mr-2 mb-2 uppercase ${
      t === tagFilter
        ? 'bg-primary dark:bg-primaryDark'
        : 'bg-gray-500 dark:bg-gray-700'
    }`;
  const handleClearAll = () => {
    dispatch(clearAll());
  };
  return (
    <Modal
      isOpen={isFilterModalOpen}
      title="Filter Todos"
      handleClose={handleCloseFilterModal}
    >
      <div>
        <div className="flex items-center">
          <span className="mr-4">Hide Completed Items:</span>
          <button
            type="button"
            data-testid="btn-hideCompleted"
            onClick={handleToggleHideCompleted}
            className={`text-2xl w-8 h-8 flex justify-center items-center rounded-md border-2 border-gray-300 transition-all duration-200 md:hover:bg-yellow-300/50 md:hover:ring-2 md:hover:ring-offset-2 ring-yellow-600 active:scale-90 ${
              hideCompleted
                ? 'bg-primary dark:bg-primaryDark'
                : 'bg-transparent'
            }`}
          >
            {hideCompleted && <IconCheckmark data-testid="icon-checkmark" />}
          </button>
        </div>
        <div className="pb-4">
          <div className="py-4">Filter by Tag:</div>
          <button
            data-testid="btn-filter-tag--all"
            type="button"
            onClick={() => handleTagFilterChange('')}
            className={getTagBtnClass('')}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={`filter-by-tag-${t}`}
              data-testid={`btn-filter-tag-${t}`}
              type="button"
              onClick={() => handleTagFilterChange(t)}
              className={getTagBtnClass(`${t}`)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-right">
          <button
            data-testid="btn-filter-clear"
            type="button"
            onClick={handleClearAll}
            className="py-2 px-4 rounded-md bg-red-500 dark:bg-red-800 hover:bg-gray-100 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-900 active:scale-90 transition-all duration-200"
          >
            Clear All Todos
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterSelector;
