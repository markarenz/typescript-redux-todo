import { Todo } from './type.d';

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

const zeroPad = (n: number): string => (n > 9 ? `${n}` : `0${n}`);

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const h24 = d.getHours();
  const h = h24 > 12 ? zeroPad(h24 - 12) : zeroPad(h24);
  const ampm = h24 > 11 ? 'PM' : 'AM';
  const m = zeroPad(d.getMinutes());
  const s = zeroPad(d.getSeconds());
  const fd = d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return `${fd} @${h}:${m}:${s} ${ampm}`;
};

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
