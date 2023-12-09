import TasksModel from "./task";

class TodosModel {
  id: string;
  text: string;
  timestamp: Date;
  tasks: TasksModel[];
  constructor(todoText: string, timestamp: Date) {
    this.text = todoText;
    this.timestamp = timestamp;
    this.id = new Date().toISOString();
    this.tasks = [];
  }
}
export default TodosModel;
