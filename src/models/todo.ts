import TasksModel from "./task";

class TodosModel {
  id: string;
  text: string;
  timestamp: Date;
  tasks: TasksModel[];
  constructor(todoText: string) {
    this.text = todoText;
    this.timestamp = new Date();
    this.id = new Date().toISOString();
    this.tasks = [];
  }
}
export default TodosModel;
