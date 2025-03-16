import { updateTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types/todoType";

const TodoEditForm = ({
  newTitle,
  newContents,
  setNewTitle,
  setNewContents,
  todo,
  onCancel,
}: {
  newTitle: string;
  newContents: string;
  setNewTitle: (title: string) => void;
  setNewContents: (contents: string) => void;
  todo: Todo;
  onCancel: () => void;
}) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<Todo>) => {
      return updateTodo(todo.id, updatedData);
    },
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((t) => (t.id === todo.id ? { ...t, ...updatedData } : t))
      );

      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onCancel();
    },
  });

  return (
    <>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="rounded border p-1"
      />
      <textarea
        value={newContents}
        onChange={(e) => setNewContents(e.target.value)}
        className="rounded border p-1"
      />
      <button
        onClick={() =>
          updateMutation.mutate({ title: newTitle, contents: newContents })
        }
        className="mt-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
      >
        저장
      </button>
    </>
  );
};

export default TodoEditForm;
