import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import FilterSelector from '../../components/FilterSelector';

describe('FilterSelector', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-hideCompleted');
    expect(element).toBeInTheDocument();
  });

  it('toggles hideCompleted when button clicked', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-hideCompleted');
    fireEvent.click(element);
    const result = store.getState();
    expect(result.todo.hideCompleted).toBe(true);
    fireEvent.click(element);
    const result2 = store.getState();
    expect(result2.todo.hideCompleted).toBe(false);
  });

  it('updates tag filter state when tag is clicked', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-filter-tag-typescript');
    fireEvent.click(element);
    const result = store.getState();
    expect(result.todo.tagFilter).toBe('typescript');
  });

  it('updates tag filter state to an empty string when the "all" button is clicked', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-filter-tag--all');
    fireEvent.click(element);
    const result = store.getState();
    expect(result.todo.tagFilter).toBe('');
  });

  it('clears data in state when "clear" button is clicked', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('btn-filter-clear');
    fireEvent.click(element);
    const result = store.getState();
    expect(result.todo.todos.length).toBe(0);
  });

  it('unsets the isModalOpen value in state hen the close button is clicked', () => {
    render(
      <Provider store={store}>
        <FilterSelector />
      </Provider>
    );
    const element = screen.getByTestId('modal-btn-close');
    fireEvent.click(element);
    const result = store.getState();
    expect(result.todo.isFilterModalOpen).toBe(false);
  });
});
