export interface EmployeeAction {
  employee: string;
  datetime: string;
}

export interface Iteration {
  id: number;
  name: string;
  created: EmployeeAction;
  updated: EmployeeAction;
  status: string;
}

export interface TableData {
  iterations: Iteration[];
}
