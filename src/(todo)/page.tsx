import TodoForm from "./_components/TodoForm";
import TodoList from "./_components/TodoList";

const page = () => {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-center">📝 To-Do List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default page;
