class Todo {
  id: string;
  text: string;
  timestamp: Date;
  constructor(todoText: string) {
    this.text = todoText;
    this.timestamp = new Date();
    this.id = new Date().toISOString();
  }
}
export default Todo;
