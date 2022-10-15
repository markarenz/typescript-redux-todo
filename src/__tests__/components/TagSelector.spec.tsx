import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import TagSelector from '../../components/TagSelector';
import TodoList from '../../components/TodoList';

// We mock the helper file functions to inject initial state for todos and tags
jest.mock('../../helpers.ts', () => ({
  ...jest.requireActual('../../helpers.ts'),
  getTagFilterDefault: jest.fn(() => {
    return 'test';
  }),
  getTagsFromStorage: jest.fn(() => {
    return ['test'];
  }),
  loadFromStorage: jest.fn(() => {
    return [
      {
        title: 'Test Title',
        id: '12345abcde',
        dateCreated:
          'Tue Oct 11 2022 11:15:21 GMT-0400 (Eastern Daylight Time)',
        dateCompleted: '',
        isComplete: false,
        tags: ['test']
      },
      {
        title: 'Test Title 2',
        id: '12345abcdf',
        dateCreated:
          'Tue Oct 11 2022 11:15:21 GMT-0400 (Eastern Daylight Time)',
        dateCompleted: '',
        isComplete: false,
        tags: ['test']
      },
      {
        title: 'Test Title 3',
        id: '12345abcdg',
        dateCreated:
          'Tue Oct 11 2022 11:15:21 GMT-0400 (Eastern Daylight Time)',
        dateCompleted: '',
        isComplete: false,
        tags: ['apple']
      }
    ];
  })
}));

describe('Tag', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <TagSelector />
      </Provider>
    );
    const element = screen.getByTestId('tag-selector-wrap');
    expect(element).toBeInTheDocument();
  });
  it('selects tag when tag is clicked', () => {
    render(
      <Provider store={store}>
        <TagSelector />
      </Provider>
    );
    fireEvent.click(screen.getByTestId('modal-btn-close'));
    expect(store.getState().todo.isTagModalOpen).toBe(false);
  });
  it('sets flag in global state when close button is clicked', () => {
    render(
      <Provider store={store}>
        <TagSelector />
      </Provider>
    );
    const prevTags = store.getState().todo.tags;
    expect(prevTags.length).toBe(1);
    fireEvent.click(screen.getByTestId('tag-selector-tag-test'));
    const nextTags = store.getState().todo.tags;
    expect(nextTags.length).toBe(2);
  });

  it('responds to Enter key in the input', async () => {
    render(
      <Provider store={store}>
        <TagSelector />
      </Provider>
    );
    const tagText = 'NewTag';
    const input = screen.getByTestId('tag-selector-input');
    const okBtn = screen.getByTestId('tag-selector-btn-ok');
    fireEvent.change(input, {
      target: { value: tagText }
    });
    await waitFor(() => {
      expect(okBtn).not.toBeDisabled();
    });
    fireEvent.keyDown(input, { key: 'a' });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(okBtn).toBeDisabled();
    });
    const nextTags = store.getState().todo.tags;
    // expect(nextTags.includes(tagText)).toBe(true);
  });
  it('adds responds when the OK button is clicked', async () => {
    render(
      <Provider store={store}>
        <TagSelector />
        <TodoList />
      </Provider>
    );
    // We use TodoList to click on the addTag button to set the selectedTodoId
    const addTagBtn = screen.getByTestId('btn-add-tag-12345abcde');
    fireEvent.click(addTagBtn);

    const okBtn = screen.getByTestId('tag-selector-btn-ok');
    fireEvent.click(okBtn);
    const input = screen.getByTestId('tag-selector-input');
    const tagText = 'NewTag';
    fireEvent.change(input, {
      target: { value: tagText }
    });
    await waitFor(() => {
      expect(okBtn).not.toBeDisabled();
    });
    fireEvent.click(okBtn);
    await waitFor(() => {
      expect(okBtn).toBeDisabled();
    });
    const nextTags = store.getState().todo.tags;
    expect(nextTags.includes(tagText.toLowerCase())).toBe(true);
  });
});
