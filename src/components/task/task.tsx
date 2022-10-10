import { TaskProps } from '../../types/task.type';
import styles from './task.module.css';

const Task = (props: TaskProps) => {
  const { title, position, length, onMoveTask } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{title}</p>
      <button
        disabled={position === 0}
        onClick={() => onMoveTask(props, position - 1)}
      >
        L
      </button>
      <button
        disabled={position + 1 === length}
        onClick={() => onMoveTask(props, position + 1)}
      >
        R
      </button>
    </div>
  );
};

export default Task;
