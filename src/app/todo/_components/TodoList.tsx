"use client";

import { fetchTodos } from "@/api/todo";
import { useQuery } from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import type { Todo } from "@/types/todoType";
import Spinner from "./Spinner";

const TodoList = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-center">오류 발생</p>;

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
