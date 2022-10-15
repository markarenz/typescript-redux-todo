import { render, screen, fireEvent, act } from '@testing-library/react';
import BtnComplete from '../../components/BtnComplete';
import { testTodo } from '../__fixtures__/testTodo';

const props = {
  todo: testTodo,
  handleToggleCompletion: jest.fn(),
  idx: 0
};

describe('BtnComplete', () => {
  it('renders component', () => {
    render(<BtnComplete {...props} />);
    const element = screen.getByTestId('todo-complete-0');
    expect(element).toBeInTheDocument();
  });
  it('responds to a click', () => {
    render(<BtnComplete {...props} />);
    const element = screen.getByTestId('todo-complete-0');
    fireEvent.click(element);
    expect(props.handleToggleCompletion).toHaveBeenCalled();
  });
});
