import React from 'react';

type Props = {
  title: string;
  handleClick: () => void;
  disabled?: boolean;
  variant?: string;
  testId?: string;
};

const Btn: React.FC<Props> = ({
  title,
  handleClick,
  variant,
  disabled,
  testId
}) => {
  const btnBaseClasses =
    'uppercase p-4 rounded-md transition-all duration-200 font-bold active:scale-90 hover:ring-2 hover:ring-offset-2 disabled:pointer-events-none';
  const btnClass =
    variant === 'outlined'
      ? 'bg-transparent border-2 border-gray-100 dark:border-gray-300 text-gray-100 dark:text-gray-300 hover:bg-gray-100/50 hover:text-gray-900 ring-primary dark:ring-primaryDark disabled:text-gray-500 disabled:border-gray-600'
      : 'bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray900Dark hover:bg-primary dark:hover:bg-primaryDark hover:text-white dark:hover:text-gray-300 ring-primary disabled:text-gray-500 disabled:bg-gray-600 dark:disabled:bg-gray-800';
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${btnBaseClasses} ${btnClass}`}
      data-testid={testId}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Btn;
