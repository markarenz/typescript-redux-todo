import { render, screen, fireEvent, act } from '@testing-library/react';
import Btn from '../../components/Btn';

describe('Btn', () => {
  const mockClick = jest.fn();
  it('renders component', () => {
    render(<Btn title="Test" handleClick={mockClick} />);
    const element = screen.getByText('Test');
    expect(element).not.toHaveClass('border-2');
  });

  it('renders outlined variant of component', () => {
    render(<Btn title="Test" handleClick={mockClick} variant="outlined" />);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('border-2');
  });

  it('fires handleClick when clicked', () => {
    render(
      <div>
        <Btn title="Test" handleClick={mockClick} testId="btn-test" />
      </div>
    );
    fireEvent.click(screen.getByTestId('btn-test'));
    expect(mockClick).toHaveBeenCalled();
  });
});
