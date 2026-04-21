interface DataToolbarProps {
  /** Form method="GET" with filter inputs as children. */
  children: React.ReactNode;
}

export function DataToolbar({ children }: DataToolbarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-4">
      <form method="GET" className="flex flex-wrap gap-3 items-center">
        {children}
      </form>
    </div>
  );
}
