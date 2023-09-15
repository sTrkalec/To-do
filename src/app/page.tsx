"use client";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Form from "@/components/Form";
import InputText from "@/components/InputText";
import Todos from "@/components/Todos";
import { useTodo } from "@/context/todoContext";
import { useEffect, useState } from "react";

function Home() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const {
    clearAll,
    doneTask,
    handleAddTask,
    handleInputChange,
    removeTask,
    task,
    todos,
  } = useTodo();

  if (!render) {
    return null;
  }

  return (
    <>
      <Card>
        <Container>
          <h1 className="text-center font-bold text-2xl">
            Gerenciador de tarefas
          </h1>
          <Form handleSubmit={handleAddTask}>
            <InputText value={task} onChange={handleInputChange} />
            <button
              disabled={!task}
              type="submit"
              className="border rounded-md border-zinc-800 p-2 w-20"
            >
              Postar
            </button>
          </Form>
          <Todos
            clearAll={clearAll}
            doneTask={doneTask}
            removeTask={removeTask}
            todos={todos}
          />
        </Container>
      </Card>
    </>
  );
}

export default Home;
