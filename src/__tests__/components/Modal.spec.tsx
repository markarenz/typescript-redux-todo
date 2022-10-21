import { render, screen, fireEvent, act } from '@testing-library/react';
import Modal from '../../components/Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  it('renders component', () => {
    render(
      <Modal isOpen title="Test Title" handleClose={mockOnClose}>
        <div>Test</div>
      </Modal>
    );
    const element = screen.getByTestId('modal-title');
    expect(element).toHaveTextContent('Test Title');
  });

  it('fires close function when close button is clicked', () => {
    render(
      <Modal isOpen title="Test Title" handleClose={mockOnClose}>
        <div>Test</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-btn-close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
