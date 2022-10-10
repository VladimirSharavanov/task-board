import { Task } from './task.type';

export type AppState = {
  taskColumns: TaskColumns[];
};

export type TaskColumns = {
  id: string;
  title: string;
  color: string;
  taskList: Task[];
}
