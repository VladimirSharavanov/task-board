export type Task = {
  id: string;
  title: string;
  position: number;
};

export type TaskProps = {
  id: string;
  title: string;
  position: number;
  length: number;
  onMoveTask(task: Task, pos: number): void;
};
