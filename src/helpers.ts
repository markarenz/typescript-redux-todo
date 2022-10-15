import { Todo, GenericObject } from './type.d';

export const getIdHash = (): string => {
  const hl = 36;
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const cl = c.length;
  let result = '';
  for (let i = 0; i < hl; i++) {
    result += c.charAt(Math.floor(Math.random() * cl));
  }
  return result;
};

export const cleanInputText = (str: string): string =>
  str.trim().replace(/[\n\r]+/g, ' ');

export const getCompletionStats = (todos: Todo[]): string => {
  const total = todos?.length || 0;
  const completed = todos?.reduce(
    (total, t) => (t.isComplete ? total + 1 : total),
    0
  );
  return `${completed} of ${total}`;
};

export const saveToStorage = (todos: Todo[]) => {
  localStorage.setItem('todoData', JSON.stringify(todos));
};

export const loadFromStorage = (): Todo[] => {
  try {
    const todoStr = `${localStorage.getItem('todoData')}`;
    return JSON.parse(todoStr);
  } catch (e) {
    return [];
  }
};

export const saveTagFilter = (tagFilter: string) => {
  localStorage.setItem('todoTagFilter', tagFilter);
};

export const getTagFilterDefault = () => {
  const str = localStorage.getItem('todoTagFilter');
  return str;
};

export const getTagsFromTodos = (todos: Todo[]): string[] => {
  const tagsObj: GenericObject = {};
  todos.forEach((t: Todo) => {
    t.tags.forEach((tg: string) => {
      tagsObj[tg] = t.tags;
    });
  });
  return Object.keys(tagsObj).sort((a, b) => (a > b ? 1 : -1));
};

export const getTagsFromStorage = (): string[] | null => {
  try {
    const todoStr = `${localStorage.getItem('todoData')}`;
    const todos = JSON.parse(todoStr);
    return getTagsFromTodos(todos);
  } catch (e) {
    return null;
  }
};

const setDarkModeClass = (isDarkmode: boolean): void => {
  if (isDarkmode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const processDarkModeChange = (newDarkMode: boolean): void => {
  setDarkModeClass(newDarkMode);
  localStorage.setItem('todoDarkmode', JSON.stringify(newDarkMode));
};

export const getInitialDarkmode = (): boolean => {
  const browserDarkmode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const str = localStorage.getItem('todoDarkmode');
  if (str && str.length > 0) {
    const initialDarkMode = str === 'true';
    setDarkModeClass(initialDarkMode);
    return initialDarkMode;
  }
  return browserDarkmode;
};
