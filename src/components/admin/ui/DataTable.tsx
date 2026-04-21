import { clsx } from "clsx";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  rowClassName?: (row: T) => string | undefined;
}

const alignClass: Record<"left" | "right" | "center", string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-6 py-3 text-sm font-medium text-slate-600",
                  alignClass[col.align ?? "left"],
                  col.className
                )}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              className={clsx("hover:bg-slate-50", rowClassName?.(row))}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={clsx(
                    "px-6 py-4",
                    alignClass[col.align ?? "left"],
                    col.cellClassName
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
