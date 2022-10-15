import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import TodoTitle from '../../components/TodoTitle';

describe('TodoTitle', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <TodoTitle id="abcdefg12345" title="Test Title" />
      </Provider>
    );
    const element = screen.getByTestId('todo-title');
    expect(element).toBeInTheDocument();
  });

  it('updates state when title is clicked', () => {
    render(
      <Provider store={store}>
        <TodoTitle id="abcdefg12345" title="Test Title" />
      </Provider>
    );
    fireEvent.click(screen.getByTestId('todo-title'));
    expect(store.getState().todo.isEditingTodoTitle).toBe(true);
  });
});
