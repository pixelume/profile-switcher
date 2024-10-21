export interface EmployeeAction {
  employee: string;
  datetime: string;
}

export interface Iteration {
  id: string;
  name: string;
  created: EmployeeAction;
  updated: EmployeeAction;
  status: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  published: string;
  pages: number;
}

export interface TableData {
  iterations: Iteration[];
}
