export interface TaskFormProps {
  onSend: (form: TaskFormState) => void;
};

export interface TaskFormState { 
  id: string;
  title: string;
  position: number;
};
