"use client";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen  items-center justify-center bg-slate-400">
      {children}
    </div>
  );
}
