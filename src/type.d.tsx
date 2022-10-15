export interface Todo {
  title: string;
  id: string;
  dateCreated: string;
  dateCompleted: string;
  isComplete: boolean;
  tags: string[];
}

export type TodoAction = {
  type: string;
  title?: string;
  id?: string;
};

export type DispatchType = (args: TodoAction) => TodoAction;

interface EventTarget {
  name: string;
  value: string | number;
}
export interface Event {
  target: EventTarget;
}

export type TodoActionById = {
  id: string;
  value: string;
};

export type GenericObject = { [key: string]: any };
