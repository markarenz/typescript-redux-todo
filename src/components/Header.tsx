import IconLogo from '../components/icons/IconLogo';

const Header = () => (
  <header className="mb-4 bg-gray-900 dark:bg-gray900Dark py-4 border-b-2 border-primary dark:border-primaryDark">
    <h1 className="text-3xl font-bold text-center" data-testid="app-header">
      <div className="w-6 h-6 inline-block mr-2">
        <IconLogo />
      </div>
      <span className="text-gray-100 dark:text-gray-300">ToDone</span>
    </h1>
  </header>
);
export default Header;
