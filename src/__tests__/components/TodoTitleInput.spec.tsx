import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import TodoTitleInput from '../../components/TodoTitleInput';

describe('TodoTitleInput', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <TodoTitleInput id="abcdefg12345" title="Test Title" />
      </Provider>
    );
    const element = screen.getByTestId('todo-title-edit');
    expect(element).toBeInTheDocument();
  });

  it('updates title in global state when the input is changed and the OK button is clicked', () => {
    render(
      <Provider store={store}>
        <TodoTitleInput id="12345abcde" title="Test Title" />
      </Provider>
    );
    const newTitle = 'New Title';
    const input = screen.getByTestId('todo-title-edit');
    fireEvent.change(input, { target: { value: newTitle } });
    fireEvent.click(screen.getByTestId('todo-title-edit-ok'));
    expect(store.getState().todo.todos[0].title).toBe(newTitle);
  });

  it('does NOT update title in global state when the input is changed and the CANCEL button is clicked', () => {
    render(
      <Provider store={store}>
        <TodoTitleInput id="12345abcdf" title="Test Title" />
      </Provider>
    );
    const newTitle = 'New Title';
    const input = screen.getByTestId('todo-title-edit');
    fireEvent.change(input, { target: { value: newTitle } });
    fireEvent.click(screen.getByTestId('todo-title-edit-cancel'));
    expect(store.getState().todo.todos[1].title).not.toBe(newTitle);
  });

  it('saves new title when enter key is pressed and input has text', () => {
    render(
      <Provider store={store}>
        <TodoTitleInput id="12345abcde" title="Test Title" />
      </Provider>
    );
    const newTitle = 'New Title2';
    const input = screen.getByTestId('todo-title-edit');
    fireEvent.change(input, { target: { value: newTitle } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(store.getState().todo.todos[0].title).toBe(newTitle);
  });

  it('does not save new title when ESC key is pressed and input has text', () => {
    render(
      <Provider store={store}>
        <TodoTitleInput id="12345abcde" title="Test Title" />
      </Provider>
    );
    const newTitle = 'New Title3';
    const input = screen.getByTestId('todo-title-edit');
    fireEvent.change(input, { target: { value: newTitle } });
    fireEvent.keyDown(input, { key: 'Escape', code: 13, charCode: 13 });
    expect(store.getState().todo.todos[0].title).not.toBe(newTitle);
  });
});
