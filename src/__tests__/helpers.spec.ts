import { testTodo } from './__fixtures__/testTodo';
import {
  getIdHash,
  cleanInputText,
  getCompletionStats,
  saveToStorage,
  loadFromStorage,
  getTagsFromTodos,
  processDarkModeChange,
  getInitialDarkmode
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

describe('getCompletionStats', () => {
  it('returns X of Y when a todos array is provided', () => {
    const todos = [{ ...testTodo }, { ...testTodo, isComplete: true }];
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

describe('getTagsFromTodos', () => {
  it('returns a ist of tags', () => {
    const todos = [
      { ...testTodo, tags: ['bar'] },
      { ...testTodo, tags: ['foo'] },
      { ...testTodo }
    ];
    const result = getTagsFromTodos(todos);
    expect(result.length).toBe(3);
  });
  it('returns a sorted list of tags', () => {
    const todos = [
      { ...testTodo },
      { ...testTodo, tags: ['foo'] },
      { ...testTodo, tags: ['bar'] }
    ];
    const result = getTagsFromTodos(todos);
    let isSorted = true;
    for (let i = 0; i < result.length - 1; i += 1) {
      if (result[i] > result[i + 1]) {
        isSorted = false;
      }
    }
    expect(isSorted).toBe(true);
  });
});

describe('processDarkModeChange', () => {
  it('sets the body class for darkmode', () => {
    processDarkModeChange(true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('todoDarkmode', 'true');
  });
  it('sets the body class for darkmode', () => {
    processDarkModeChange(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('todoDarkmode', 'false');
  });
});

describe('getInitialDarkmode', () => {
  it('returns false when browser darkmode is disabled', () => {
    const result = getInitialDarkmode();
    expect(result).toBe(false);
  });
  it('returns true when browser darkmode is disabled', () => {
    Storage.prototype.getItem = jest.fn(() => 'true');
    const result = getInitialDarkmode();
    expect(result).toBe(true);
  });
});
