
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}