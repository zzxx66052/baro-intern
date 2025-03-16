"use client";

import { useRouter } from "next/navigation";

const TodoHome = () => {
  const router = useRouter();
  return (
    <h1
      onClick={() => router.push("/")}
      className="mb-4 text-2xl font-bold text-center"
    >
      📝 To Do List
    </h1>
  );
};

export default TodoHome;
