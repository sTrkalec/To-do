"use client";

interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({ onChange, value }: IInputTextProps) {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex justify-center"></div>
      <input
        value={value}
        onChange={onChange}
        className="border border-zinc-800 p-2 rounded-md outline-none"
        type="text"
      />
    </div>
  );
}
