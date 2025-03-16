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
  // const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

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
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() =>
          toggleMutation.mutate({ isCompleted: !todo.isCompleted })
        }
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
            onClick={() =>
              updateMutation.mutate(
                { title: newTitle, contents: newContents },
                {
                  onSuccess: () => setIsEditing(false),
                }
              )
            }
            className="mt-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          >
            저장
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              className={`cursor-pointer ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
            <div className="flex gap-2">
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
