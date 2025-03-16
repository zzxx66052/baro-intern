"use client";

import { deleteTodo, updateTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types/todoType";
import { useState } from "react";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { UpdateIcon } from "@/components/icons/UpdateIcon";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newContents, setNewContents] = useState(todo.contents);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async () => {
      await updateTodo(todo.id, { isCompleted: !isCompleted });
    },
    onMutate: async () => {
      setIsCompleted((prev) => !prev);
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      return { previousTodos: queryClient.getQueryData(["todos"]) };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateTodo(todo.id, { title: newTitle, contents: newContents }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false);
    },
  });

  return (
    <li className="flex flex-col gap-2 border p-3 rounded">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleMutation.mutate()}
        className="mr-2 w-5 h-5 cursor-pointer accent-green-500"
      />

      {isEditing ? (
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
            onClick={() => updateMutation.mutate()}
            className="mt-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          >
            저장
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              onClick={() => toggleMutation.mutate()}
              className={`cursor-pointer ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500"
              >
                <UpdateIcon />
              </button>
              <button
                onClick={() => deleteMutation.mutate()}
                className="text-red-500"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">{todo.contents}</p>
        </>
      )}
    </li>
  );
};

export default TodoItem;
