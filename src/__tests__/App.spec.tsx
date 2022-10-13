import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';
import { initState, saveTodo } from '../store/todoSlice';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  store.dispatch(initState());
});

describe('App', () => {
  it('renders the main App component', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    act(() => {
      store.dispatch(saveTodo('Test Todo Title'));
    });
    await waitFor(() =>
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    );
  });

  it('updates global state when delete and complete buttons are clicked', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Add 2 new todos
    act(() => {
      store.dispatch(saveTodo('Test Todo Title 1'));
    });
    act(() => {
      store.dispatch(saveTodo('Test Todo Title 2'));
    });
    await waitFor(() =>
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    );
    const buttons = screen.getAllByRole('button');
    const btnComplete = buttons[1];
    const btnDelete = buttons[2];
    fireEvent.click(btnComplete);
    const stateAfterCompleteClick = store.getState();
    expect(stateAfterCompleteClick.todo.todos[0].isComplete).toBe(true);
    fireEvent.click(btnComplete);
    fireEvent.click(btnDelete);
    const stateAfterDeleteClick = store.getState();
    expect(stateAfterDeleteClick.todo.todos.length).toBe(1);
  });
});
