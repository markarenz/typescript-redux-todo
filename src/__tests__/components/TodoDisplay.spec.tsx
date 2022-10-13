import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import TodoDisplay from '../../components/TodoDisplay';
import { testTodo } from '../__fixtures__/testTodo';

describe('TodoDisplay', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <TodoDisplay todo={testTodo} />
      </Provider>
    );
    const element = screen.getByText('Test Title');
    expect(element).toBeInTheDocument();
  });

  it('renders component with completed todo item and checkmark', () => {
    const wrapper = render(
      <Provider store={store}>
        <TodoDisplay
          todo={{
            ...testTodo,
            isComplete: true,
            dateCompleted:
              'Tue Oct 11 2022 11:25:21 GMT-0400 (Eastern Daylight Time)'
          }}
        />
      </Provider>
    );
    const completeButton = screen.getByTestId('todo-complete-12345abcde');
    const checkmark = completeButton.querySelector('svg');
    expect(checkmark).toBeInTheDocument();
  });
});
