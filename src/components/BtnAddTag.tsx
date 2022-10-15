import IconTag from './icons/IconTag';
import { useTodoDispatch } from '../store/reduxHooks';
import { setTagModalOpen } from '../store/todoSlice';

type Props = {
  id: string;
};
const BtnAddTag: React.FC<Props> = ({ id }) => {
  const dispatch = useTodoDispatch();
  const handleAddTag = () => {
    dispatch(setTagModalOpen(id));
  };
  return (
    <button
      type="button"
      className="w-4 h-4"
      onClick={handleAddTag}
      data-testid={`btn-add-tag-${id}`}
    >
      <IconTag add />
    </button>
  );
};

export default BtnAddTag;
