import { TaskListProps } from '../../types/task-list.type';
import Task from '../task/task';
import styles from './task-list.module.css';

const TaskList = (props: TaskListProps) => {
  const elements = props.taskList.map((item) => (
    <Task
      {...item}
      key={item.id}
      length={props.length}
      onMoveTask={(item, pos) => props.onMoveTask(item, pos)}
    />
  ));

  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.list}>{elements}</div>
    </div>
  );
};

export default TaskList;
