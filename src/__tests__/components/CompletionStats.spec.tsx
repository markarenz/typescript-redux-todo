import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import CompletionStats from '../../components/CompletionStats';
import { store } from '../../store/store';
import { saveTodo } from '../../store/todoSlice';

describe('CompletionStats', () => {
  it('renders properly', () => {
    render(
      <Provider store={store}>
        <CompletionStats />
      </Provider>
    );
    const element = screen.getByTestId('completion-stats');
    expect(element).toBeInTheDocument();
  });

  it('displays statistics properly', () => {
    render(
      <Provider store={store}>
        <CompletionStats />
      </Provider>
    );
    act(() => {
      store.dispatch(saveTodo('Test Todo Title 1'));
    });
    const element = screen.getByTestId('completion-stats');
    expect(element).toHaveTextContent('0 of 3');
  });
});
