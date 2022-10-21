import React from 'react';
import IconClose from './icons/IconClose';

type Props = {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, title, handleClose, children }) => (
  <div
    className={`fixed top-0 left-0 w-full h-full ${
      isOpen ? '' : 'pointer-events-none'
    }`}
  >
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-900/75 pointer-events-none transition-opacity duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    />
    <div className="fixed transition-opacity duration-300 top-0 left-0 w-full h-full p-4">
      <div className="h-full flex justify-center items-center">
        <div
          className={`bg-gray-200 border-2 border-gray-100 dark:border-gray-300 rounded-lg w-full max-w-lg transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="rounded-tl-md rounded-tr-md bg-primary dark:bg-primaryDark p-4 font-bold text-white dark:text-gray-300 uppercase">
            <div className="flex justify-between">
              <span data-testid="modal-title">{title}</span>
              <button
                data-testid="modal-btn-close"
                className="w-4 h-4 transition-all duration-200 hover:rotate-90 active:scale-90"
                onClick={handleClose}
              >
                <IconClose />
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-bl-md rounded-br-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
