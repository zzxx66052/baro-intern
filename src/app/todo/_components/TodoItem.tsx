import { deleteTodo, toggleTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types/todoType";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => toggleTodo(todo.id, !todo.isCompleted),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <li className="flex items-center justify-between border p-2 rounded">
      <span
        onClick={() => toggleMutation.mutate()}
        className={`cursor-pointer ${
          todo.isCompleted ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteMutation.mutate()}
        className="text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
