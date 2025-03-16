"use client";

import { deleteTodo, updateTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types/todoType";
import { useState } from "react";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { UpdateIcon } from "@/components/icons/UpdateIcon";
import TodoCheckbox from "./TodoCheckbox";
import TodoActions from "./TodoActions";
import TodoEditForm from "./TodoEditForm";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newContents, setNewContents] = useState(todo.contents);

  const queryClient = useQueryClient();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  const toggleMutation = useMutation({
    mutationFn: async (updatedTodo: Partial<Todo>) => {
      await updateTodo(todo.id, updatedTodo);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((t) =>
          t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <li className="flex flex-col gap-2 border p-3 rounded">
      <TodoCheckbox
        isCompleted={todo.isCompleted}
        onToggle={() =>
          toggleMutation.mutate({ isCompleted: !todo.isCompleted })
        }
      />

      {isEditing ? (
        <TodoEditForm
          newTitle={newTitle}
          newContents={newContents}
          setNewTitle={setNewTitle}
          setNewContents={setNewContents}
          todo={todo}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              className={`${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">
                {formatDate(todo.createdAt)}
              </span>

              <TodoActions
                onEdit={() => setIsEditing(true)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">{todo.contents}</p>
        </>
      )}
    </li>
  );
};

export default TodoItem;
