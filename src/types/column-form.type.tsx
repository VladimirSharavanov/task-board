export interface ColumnFormProps {
  onSend: (form: ColumnFormState) => void;
}

export interface ColumnFormState {
  id: string;
  title: string;
  color: string;
}
