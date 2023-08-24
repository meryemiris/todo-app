export default function NewTodo() {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const todoData = data.get("item") as string;
    console.log(todoData);

    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="item">New Todo</label>
      <input type="text" id="item" name="item"></input>
      <button type="submit">Add</button>
    </form>
  );
}
