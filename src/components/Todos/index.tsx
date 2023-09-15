"use client";

import { ArrowCounterClockwise, CheckFat, Trash } from "@phosphor-icons/react";

interface ITodoArrayProps {
  id: string;
  title: string;
  isDone: boolean;
}

interface ITodoProps {
  todos: ITodoArrayProps[];
  doneTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearAll: () => void;
}

export default function Todos({
  todos,
  clearAll,
  doneTask,
  removeTask,
}: ITodoProps) {
  return (
    <div className="flex flex-col gap-2 w-full flex-grow">
      {todos.map((todo, index) => (
        <div
          className={`flex items-center justify-between p-2 -z-0 rounded-lg ${
            index % 2 === 0 ? "bg-slate-300/20 " : "bg-slate-400/20"
          }`}
          key={todo.id}
        >
          <div className="flex gap-2 items-center z-20">
            <h1
              className={`font-bold text-2xl text-zinc-700 ${
                todo.isDone ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => doneTask(todo.id)}
              type="button"
              className="flex justify-center p-1 w-20"
            >
              {todo.isDone ? (
                <ArrowCounterClockwise
                  size={28}
                  weight="duotone"
                  className="text-zinc-600"
                />
              ) : (
                <CheckFat
                  size={28}
                  weight="duotone"
                  className="text-zinc-600"
                />
              )}
            </button>

            <button
              onClick={() => removeTask(todo.id)}
              type="button"
              className="flex justify-center p-1 w-20"
            >
              <Trash size={28} className="text-red-600" />
            </button>
          </div>
        </div>
      ))}

      {todos.length === 0 && (
        <div className="flex flex-grow justify-center items-center">
          <h1 className="font-bold text-2xl text-zinc-700">
            Nenhuma tarefa adicionada
          </h1>
        </div>
      )}

      {todos.length > 0 && (
        <div className="flex flex-grow  justify-center items-end">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-zinc-700">
              {todos.length} tarefa{todos.length > 1 ? "s" : ""} adicionada
              {todos.length > 1 ? "s" : ""}
            </h1>

            <button
              onClick={clearAll}
              className="outline-none border rounded-md border-zinc-800 p-1 "
            >
              Limpar tudo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
