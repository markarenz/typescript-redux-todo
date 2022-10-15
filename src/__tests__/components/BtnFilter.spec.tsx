import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import BtnFilter from '../../components/BtnFilter';

describe('BtnFilter', () => {
  const mockClick = jest.fn();
  it('renders component', () => {
    render(
      <Provider store={store}>
        <BtnFilter />
      </Provider>
    );
    const element = screen.getByTestId('btn-filter');
    expect(element).toBeInTheDocument();
  });

  it('updates the store when clicked', () => {
    render(
      <Provider store={store}>
        <BtnFilter />
      </Provider>
    );
    const resultBefore = store.getState();
    expect(resultBefore.todo.isFilterModalOpen).toBe(false);
    const element = screen.getByTestId('btn-filter');
    fireEvent.click(element);
    const resultAfter = store.getState();
    expect(resultAfter.todo.isFilterModalOpen).toBe(true);
  });
});
