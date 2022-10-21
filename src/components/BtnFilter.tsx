import IconFilter from './icons/IconFilter';
import { useTodoSelector, useTodoDispatch } from '../store/reduxHooks';
import { setFilterModalOpen } from '../store/todoSlice';

const BtnFilter = () => {
  const dispatch = useTodoDispatch();
  const { isFilterModalOpen } = useTodoSelector((state) => state.todo);
  const handleFilterOpen = () => {
    dispatch(setFilterModalOpen('open'));
  };
  return (
    <div className="w-8 h-8">
      <button
        type="button"
        onClick={handleFilterOpen}
        className="w-full h-full"
        data-testid="btn-filter"
      >
        <IconFilter />
      </button>
    </div>
  );
};

export default BtnFilter;
