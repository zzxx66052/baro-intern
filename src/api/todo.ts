const API_URL = "http://localhost:3000/todos";

export const fetchTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTodo = async (contents: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, completed: false }),
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const toggleTodo = async (id: string, completed: boolean) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
};
