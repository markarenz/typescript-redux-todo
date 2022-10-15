import { render, screen, fireEvent } from '@testing-library/react';
import BtnDelete from '../../components/BtnDelete';

const props = {
  id: 'abcd1234',
  handleDeleteTodo: jest.fn(),
  idx: 0
};

describe('BtnDelete', () => {
  it('renders component', () => {
    render(<BtnDelete {...props} />);
    const element = screen.getByTestId(`todo-delete-${props.idx}`);
    expect(element).toBeInTheDocument();
  });
  it('responds to a click', () => {
    render(<BtnDelete {...props} />);
    const element = screen.getByTestId(`todo-delete-${props.idx}`);
    fireEvent.click(element);
    expect(props.handleDeleteTodo).toHaveBeenCalled();
  });
});
