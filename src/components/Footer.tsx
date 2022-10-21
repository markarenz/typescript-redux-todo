import DarkModeSelector from './DarkModeSelector';
import { useTodoSelector } from '../store/reduxHooks';
import BtnFilter from './BtnFilter';

const Footer = () => {
  const { tagFilter } = useTodoSelector((state) => state.todo);
  return (
    <footer
      data-testid="app-footer"
      className="fixed bottom-0 left-0 w-full py-4 bg-gray-700 dark:bg-black text-white dark:text-gray-300 border-t-2 border-primary dark:border-primaryDark shadow-2xl"
    >
      <div className="py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BtnFilter />
            {tagFilter && (
              <span data-testid="disp-tag-filter" className="uppercase ml-2">
                Filter: {tagFilter}
              </span>
            )}
          </div>
          <div>
            <DarkModeSelector />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
