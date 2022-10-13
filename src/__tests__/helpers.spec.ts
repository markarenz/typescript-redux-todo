import { Todo } from '../type.d';
import { testTodo } from './__fixtures__/testTodo';
import {
  getIdHash,
  cleanInputText,
  formatDate,
  getCompletionStats,
  saveToStorage,
  loadFromStorage
} from '../helpers';

describe('getIdHash', () => {
  it('returns a hash of 36 characters', () => {
    const result = getIdHash();
    expect(result.length).toBe(36);
  });
});

describe('cleanInputText', () => {
  it('returns a clean string with no linefeeds', () => {
    const dirtyString = `one line
two lines`;
    const result = cleanInputText(dirtyString);
    expect(result).toBe('one line two lines');
  });
});

describe('formatDate', () => {
  it('returns a properly formatted date when a legitimate JS date is provided', () => {
    const input = testTodo.dateCreated;
    const result = formatDate(input);
    expect(result).toBe('Tuesday, October 11, 2022 @11:15:21 AM');
  });
  it('returns nonsense when no JS date is provided', () => {
    const input = '';
    const result = formatDate(input);
    expect(result.includes('NaN')).toBe(true);
  });
});

describe('getCompletionStats', () => {
  it('returns X of Y when a todos array is provided', () => {
    const todos: Todo[] = [{ ...testTodo }, { ...testTodo, isComplete: true }];
    const result = getCompletionStats(todos);
    expect(result).toBe('1 of 2');
  });
});

jest.spyOn(Storage.prototype, 'setItem');
jest.spyOn(Storage.prototype, 'getItem');

describe('saveToStorage', () => {
  it('fires setItem', () => {
    const todos = [{ ...testTodo }];
    saveToStorage(todos);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('loadFromStorage', () => {
  it('fires getItem', () => {
    loadFromStorage();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
