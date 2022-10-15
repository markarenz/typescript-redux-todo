import React from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import CompletionStats from './components/CompletionStats';
import TagSelector from './components/TagSelector';
import FilterSelector from './components/FilterSelector';
import Footer from './components/Footer';

const App: React.FC = () => (
  <div
    className="bg-gray-800 dark:bg-gray-900 text-white flex flex-col min-h-screen"
    data-testid="app"
  >
    <Header />
    <div className="p-4 mb-24">
      <TodoInput />
      <TodoList />
      <CompletionStats />
      <TagSelector />
    </div>
    <Footer />
    <FilterSelector />
  </div>
);

export default App;
