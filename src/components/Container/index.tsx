"use client";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[600px] rounded-lg flex-col gap-5 bg-slate-200 p-5 max-h-[90vh]  min-h-[600px] overflow-y-auto">
      {children}
    </div>
  );
}
