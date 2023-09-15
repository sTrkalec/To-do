"use client";

import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ITodoProps {
  id: string;
  title: string;
  isDone: boolean;
}

interface ITodoContext {
  task: string;
  todos: ITodoProps[];
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
  removeTask: (id: string) => void;
  doneTask: (id: string) => void;
  clearAll: () => void;
}

const defaultContextValue: ITodoContext = {
  task: "",
  todos: [],
  handleInputChange: () => {},
  handleAddTask: () => {},
  removeTask: (id: string) => {},
  doneTask: (id: string) => {},
  clearAll: () => {},
};

const TodoContext = createContext<ITodoContext>(defaultContextValue);

export const useTodo = () => {
  return useContext(TodoContext);
};

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<ITodoProps[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    }
    return [];
  });

  const [taskIdCounter, setTaskIdCounter] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      return (
        Number(localStorage.getItem("taskIdCounter")) ||
        (savedTodos.length
          ? Math.max(...savedTodos.map((todo: ITodoProps) => Number(todo.id))) +
            1
          : 1)
      );
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("taskIdCounter", String(taskIdCounter));
    }
  }, [taskIdCounter, todos]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    setTodos((prevTodos) => [
      {
        id: String(taskIdCounter),
        title: task,
        isDone: false,
      },
      ...prevTodos,
    ]);
    setTaskIdCounter(taskIdCounter + 1);
    setTask("");
  };

  const removeTask = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const doneTask = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  const value: ITodoContext = {
    task,
    todos,
    handleInputChange,
    handleAddTask,
    removeTask,
    doneTask,
    clearAll,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoProvider;
