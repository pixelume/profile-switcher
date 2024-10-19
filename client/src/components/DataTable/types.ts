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

export interface TableData {
  iterations: Iteration[];
}
