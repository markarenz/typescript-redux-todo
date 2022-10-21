import { useState } from 'react';
import { useTodoDispatch, useTodoSelector } from '../store/reduxHooks';
import { addTag, setTagModalOpen } from '../store/todoSlice';
import { Event } from '../type.d';
import Modal from './Modal';
import Btn from './Btn';

const TagSelector = () => {
  const [tagInput, setTagInput] = useState('');
  const dispatch = useTodoDispatch();
  const handleCloseTagModal = (): void => {
    setTagInput('');
    dispatch(setTagModalOpen(''));
  };
  const { tags, isTagModalOpen, selectedTodoId } = useTodoSelector(
    (state) => state.todo
  );
  const handleSelectTag = (t: string): void => {
    dispatch(addTag({ id: selectedTodoId, value: t }));
    handleCloseTagModal();
  };
  const handleClickOk = (): void => {
    dispatch(addTag({ id: selectedTodoId, value: tagInput }));
    handleCloseTagModal();
  };
  const handleTagInputChange = (e: Event) => {
    const val = `${e.target.value}`;
    const cleanVal = val.replace(/[^a-z0-9]/gi, '');
    setTagInput(cleanVal);
  };
  const handleCheckEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && tagInput !== '') {
      handleClickOk();
    }
  };
  const isOkBtnDisabled = tagInput === '';

  return (
    <Modal
      isOpen={isTagModalOpen}
      title="Select or Create Tag"
      handleClose={handleCloseTagModal}
    >
      <div className="flex mb-4" data-testid="tag-selector-wrap">
        <input
          value={`${tagInput}`}
          onChange={handleTagInputChange}
          onKeyDown={handleCheckEnter}
          autoFocus
          className="w-full rounded-md bg-transparent px-4 py-2 mr-2 md:mr-4 border-2 border-white/50 text-white outline-none focus:bg-gray-900/30 font-bold"
          data-testid="tag-selector-input"
        />
        <Btn
          testId="tag-selector-btn-ok"
          title="OK"
          handleClick={handleClickOk}
          disabled={isOkBtnDisabled}
        />
      </div>
      <div>
        {tags.map((t) => (
          <button
            key={`tag-selector-tag-${t}`}
            data-testid={`tag-selector-tag-${t}`}
            type="button"
            onClick={() => handleSelectTag(t)}
            className="uppercase text-sm rounded-full py-1 px-2 bg-gray-100 dark:bg-gray-300 text-gray-900 mr-2 hover:bg-primary hover:text-white dark:hover:bg-primaryDark dark:hover:text-gray-300 transition-all duration-200"
          >
            {t}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default TagSelector;
