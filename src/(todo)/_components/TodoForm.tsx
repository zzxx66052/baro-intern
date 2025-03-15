"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const handleAddTodo = () => {};

  return (
    <form onSubmit={handleAddTodo} className="flex flex-col">
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
};

export default TodoForm;
