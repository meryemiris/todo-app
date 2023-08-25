class Todo {
  id: string;
  text: string;
  status: string;

  constructor(todoText: string, todoStatus: string) {
    this.text = todoText;
    this.status = todoStatus;
    this.id = new Date().toISOString();
  }
}
export default Todo;
