import React from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import CompletionStats from './components/CompletionStats';

const App: React.FC = () => (
  <div
    className="bg-gray-800 text-white flex flex-col min-h-screen"
    data-testid="app"
  >
    <Header />
    <div className="p-4">
      <TodoInput />
      <TodoList />
      <CompletionStats />
    </div>
  </div>
);

export default App;
