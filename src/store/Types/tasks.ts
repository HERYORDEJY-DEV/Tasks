export type TaskType = {
  title: string;
  details?: string;
  date?: Date;
  time?: Date;
  isStarred: boolean;
  list: string;
  id: string;
  isCompleted: boolean;
};

export type ListType = {
  title: string;
  id: string;
};

export type TasksStateType = {
  lists: Array<ListType>;
  tasks: Array<TaskType>;
};
