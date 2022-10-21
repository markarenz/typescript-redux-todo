import React from 'react';
import { useTodoDispatch } from '../store/reduxHooks';
import { deleteTag } from '../store/todoSlice';
import IconClose from './icons/IconClose';
import { TodoActionById } from '../type.d';

type Props = {
  tag: string;
  id: string;
};

const Tag: React.FC<Props> = ({ tag, id }) => {
  const dispatch = useTodoDispatch();
  const handleDeleteTag = () => {
    const payload: TodoActionById = {
      id,
      value: tag
    };
    dispatch(deleteTag(payload));
  };
  return (
    <div className="inline-block py-1 px-2 bg-gray-700 dark:bg-gray-900 rounded-full mr-1 group">
      <div className="flex items-center">
        <span className="text-xs leading-none text-white dark:text-gray-300 uppercase">{`${tag}`}</span>
        <button
          data-testid={`btn-delete-tag-${tag}-${id}`}
          type="button"
          className="w-2 h-2 ml-2 group"
          onClick={handleDeleteTag}
        >
          <div className="group-hover:rotate-90 transition-all duration-200">
            <IconClose />
          </div>
        </button>
      </div>
    </div>
  );
};
export default Tag;
