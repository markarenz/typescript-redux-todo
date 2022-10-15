import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import DarkModeSelector from '../../components/DarkModeSelector';

describe('DarkModeSelector', () => {
  const mockClick = jest.fn();
  it('renders component', () => {
    render(
      <Provider store={store}>
        <DarkModeSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-darkmode');
    expect(element).toBeInTheDocument();
  });

  it('updates the store when clicked and then reverts when clicked again', () => {
    render(
      <Provider store={store}>
        <DarkModeSelector />
      </Provider>
    );
    const resultBefore = store.getState();
    expect(resultBefore.darkMode.isDarkMode).toBe(false);
    const element = screen.getByTestId('btn-darkmode');
    fireEvent.click(element);
    const resultAfter = store.getState();
    expect(resultAfter.darkMode.isDarkMode).toBe(true);
    fireEvent.click(element);
    const resultReset = store.getState();
    expect(resultReset.darkMode.isDarkMode).toBe(false);
  });
});
