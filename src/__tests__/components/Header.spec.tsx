import { render, screen, fireEvent, act } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders component', () => {
    render(<Header />);
    const element = screen.getByTestId('app-header');
    expect(element).toBeInTheDocument();
  });
});
