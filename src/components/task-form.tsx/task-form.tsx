import { Component, ChangeEvent, FormEvent } from 'react';
import { TaskFormProps, TaskFormState } from '../../types/task-form.type';
import { v4 as uuidv4 } from 'uuid';
import styles from './task-form.module.css';

class TaskForm extends Component<TaskFormProps, TaskFormState> {
  private initState: TaskFormState = {
    id: '',
    title: '',
    position: 0,
  };

  constructor(public props: TaskFormProps) {
    super(props);
    this.state = this.initState;
  }

  public handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      id: uuidv4(),
      title: event.target.value,
    }));
  };

  public send = (event: FormEvent) => {
    event.preventDefault();

    const titleFormControl = (
      event.target as HTMLFormElement
    ).elements.namedItem('title') as HTMLInputElement;

    if (!titleFormControl.value) {
      return;
    }

    this.props.onSend(this.state);
    this.resetForm();
    this.focusOn(titleFormControl);
  };

  public render() {
    return (
      <div className={styles.wrapper}>
        <form
          onSubmit={this.send}
          className={styles.form}
        >
          <div className={styles.form__control}>
            <p></p>
            <input
              type="text"
              name="title"
              onChange={this.handleChanges}
              value={this.state.title}
            />
          </div>

          <div className={styles.form__control}>
            <button type="submit">Добавить задачу</button>
          </div>
        </form>
      </div>
    );
  }

  private resetForm = () => {
    this.setState(this.initState);
  };

  private focusOn = (target: HTMLInputElement) => {
    target.focus();
  };
}

export default TaskForm;
