class TasksModel {
  id: string;
  text: string;
  todoId: string;

  constructor(todoText: string, todoId: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
    this.todoId = todoId;
  }
}
export default TasksModel;
