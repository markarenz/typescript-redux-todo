import { useTodoSelector } from '../store/reduxHooks';
import { useTodoDispatch } from '../store/reduxHooks';
import { setDarkMode } from '../store/darkModeSlice';
import IconSun from './icons/IconSun';
import IconMoon from './icons/IconMoon';

const DarkModeSelector = () => {
  const dispatch = useTodoDispatch();
  const { isDarkMode } = useTodoSelector((state) => state.darkMode);
  const handleToggleDarkMode = () => {
    dispatch(setDarkMode(isDarkMode ? 'light' : 'dark'));
  };
  return (
    <button
      type="button"
      onClick={handleToggleDarkMode}
      data-testid="btn-darkmode"
    >
      <div className="rounded-full bg-gray-800 dark:bg-gray-900 border-2 border-white dark:border-gray-300 p-1 relative">
        <div
          className={`w-6 h-6 bg-primary dark:bg-primaryDark absolute transition-all duration-200 ${
            isDarkMode ? 'left-[calc(100%-1.5rem)]' : 'left-0'
          } top-0 rounded-full`}
        />
        <div className="relative flex">
          <div
            className={`w-4 h-4 mr-2 transition-opacity duration-200 ${
              !isDarkMode ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <IconSun />
          </div>
          <div
            className={`w-4 h-4 transition-opacity duration-200 ${
              isDarkMode ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <IconMoon />
          </div>
        </div>
      </div>
    </button>
  );
};

export default DarkModeSelector;
