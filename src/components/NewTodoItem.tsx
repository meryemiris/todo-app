export default function NewTodoItem() {
  return (
    <form>
      <label htmlFor="item">Add New Todo</label>
      <input type="text" id="item" name="item"></input>
      <button type="submit">Add</button>
    </form>
  );
}
