"use client";

import { addTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoForm = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setText("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      mutation.mutate(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded border p-2"
        placeholder="새로운 투두를 입력하세요..."
      />
      <button
        type="submit"
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
