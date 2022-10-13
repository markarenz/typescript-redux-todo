import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import TodoInput from '../../components/TodoInput';

type TestElement = Document | Element | Window | Node;

function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}

describe('TodoInput', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );
    const elements = screen.getAllByTestId('todo-input');
    expect(elements.length).toBe(1);
  });

  it('updates when text is entered in the input', () => {
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );
    const input = screen.getByTestId('todo-input');
    const todoText = 'This is my test todo';
    fireEvent.change(input, { target: { value: todoText } });
    expect(hasInputValue(input, todoText)).toBe(true);
  });

  it('saves a todo when the enter key is pressed and the input has text', () => {
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );
    const input = screen.getByTestId('todo-input');
    fireEvent.keyDown(input, { key: '.' });
    const todoText = 'This is my test todo';
    fireEvent.change(input, { target: { value: todoText } });
    expect(hasInputValue(input, todoText)).toBe(true);
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    const resultState = store.getState();
    expect(resultState.todo.todos[0].title === todoText).toBe(true);
  });

  it('does NOT save a todo when the enter key is pressed and the input is empty', () => {
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );
    const input = screen.getByTestId('todo-input');
    const todoText = '';
    fireEvent.change(input, { target: { value: todoText } });
    expect(hasInputValue(input, todoText)).toBe(true);
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    const resultState = store.getState();
    expect(resultState.todo.todos[0].title === todoText).toBe(false);
  });
});
