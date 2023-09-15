"use client";
import { ReactNode } from "react";

interface IFormProps {
  children: ReactNode;
  handleSubmit?: () => void;
}

export default function Form({ children, handleSubmit }: IFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (handleSubmit) {
          handleSubmit();
        }
      }}
      className="flex justify-center gap-5 items-end"
    >
      {children}
    </form>
  );
}
