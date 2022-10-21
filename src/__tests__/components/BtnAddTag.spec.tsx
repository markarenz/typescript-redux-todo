import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import BtnAddTag from '../../components/BtnAddTag';

const testId = 'abcd1234';
describe('BtnAddTag', () => {
  const mockClick = jest.fn();
  it('renders component', () => {
    render(
      <Provider store={store}>
        <BtnAddTag id={testId} />
      </Provider>
    );
    const element = screen.getByTestId(`btn-add-tag-${testId}`);
    expect(element).toBeInTheDocument();
  });

  it('updates the store when clicked', () => {
    render(
      <Provider store={store}>
        <BtnAddTag id={testId} />
      </Provider>
    );
    const resultBefore = store.getState();
    expect(resultBefore.todo.isTagModalOpen).toBe(false);
    const element = screen.getByTestId(`btn-add-tag-${testId}`);
    fireEvent.click(element);
    const resultAfter = store.getState();
    expect(resultAfter.todo.isTagModalOpen).toBe(true);
  });
});
