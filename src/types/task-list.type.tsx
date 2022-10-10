import { Task } from './task.type';

export type TaskListProps = {
  title: string;
  taskList: Task[];
  length: number;
  onMoveTask(task: Task, pos: number): void;
};
