import { Component } from 'react';
import './App.css';
import ColumnForm from './components/column-form/column-form';
import TaskForm from './components/task-form/task-form';
import TaskList from './components/task-list/task-list';
import { AppState } from './types/app.type';
import { ColumnFormState } from './types/column-form.type';
import { TaskFormState } from './types/task-form.type';
import { Task } from './types/task.type';

class App extends Component<unknown, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      taskColumns: [],
    };
    this.enableControl();
  }

  public addTask = (form: TaskFormState) => {
    if (!this.state.taskColumns.length) {
      return;
    }

    this.setState((state) => {
      state.taskColumns[0] = {
        id: state.taskColumns[0].id,
        title: state.taskColumns[0].title,
        color: state.taskColumns[0].color,
        taskList: state.taskColumns[0].taskList.concat([form]),
      };

      return { ...state, taskColumns: [...state.taskColumns] };
    });
  };

  public addColumn = (form: ColumnFormState) => {
    this.setState((state) => {
      const newColumn = { ...form, taskList: [] };

      return {
        ...state,
        taskColumns: state.taskColumns.concat([newColumn]),
      };
    });
  };

  public moveTask = (task: Task, pos: number) => {
    const source = this.state.taskColumns[task.position];
    const taskIndex = source.taskList.findIndex((item) => item.id === task.id);
    source.taskList.splice(taskIndex, 1);

    const newTask: Task = {
      id: task.id,
      title: task.title,
      position: pos,
    };

    this.setState((state) => {
      state.taskColumns[pos] = {
        ...state.taskColumns[pos],
        taskList: state.taskColumns[pos].taskList.concat([newTask]),
      };

      return { ...state, taskColumns: [...state.taskColumns] };
    });
  };

  private enableControl = () => {
    document.addEventListener('keydown', (event) => {
      if (!event.ctrlKey) {
        return;
      }

      event.stopImmediatePropagation();

      const controlList: Record<string, () => void> = {
        KeyM: this.showColumnForm,
        Comma: this.showTaskForm,
      };

      if (controlList[event.code]) { 
        controlList[event.code]();
      }
    });
  };

  private showColumnForm = () => {
    const taskForm = document.getElementById('taskForm')!;
    const columnForm = document.getElementById('columnForm')!;

    if (columnForm.classList.contains('show')) {
      columnForm.classList.remove('show');

      return;
    }

    columnForm.classList.add('show');
    taskForm.classList.remove('show');
  };

  private showTaskForm = () => {
    const taskForm = document.getElementById('taskForm')!;
    const columnForm = document.getElementById('columnForm')!;

    if (taskForm.classList.contains('show')) {
      taskForm.classList.remove('show');

      return;
    }

    taskForm.classList.add('show');
    columnForm.classList.remove('show');
  };

  public render() {
    const elements = this.state.taskColumns.map((item) => {
      return (
        <TaskList
          {...item}
          key={item.id}
          length={this.state.taskColumns.length}
          onMoveTask={(task, pos) => this.moveTask(task, pos)}
        />
      );
    });

    return (
      <div className="App">
        <header>
          <ColumnForm onSend={this.addColumn} />
          <TaskForm onSend={this.addTask} />
        </header>
        <section className="section">{elements}</section>
      </div>
    );
  }
}

export default App;
