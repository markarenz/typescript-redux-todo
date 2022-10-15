import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Footer from '../../components/Footer';

jest.mock('../../helpers.ts', () => ({
  ...jest.requireActual('../../helpers.ts'),
  getTagFilterDefault: jest.fn(() => {
    return 'test';
  })
}));

describe('Footer', () => {
  it('renders component with tag filter', () => {
    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    const element = screen.getByTestId('disp-tag-filter');
    expect(element).toBeInTheDocument();
  });
});
