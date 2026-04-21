import { clsx } from "clsx";

interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

/** Vertical field stack: label → control → help/error. */
export function Field({ children, className }: FieldProps) {
  return <div className={clsx("flex flex-col gap-1.5", className)}>{children}</div>;
}

interface FieldLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function FieldLabel({ htmlFor, children, required, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-sm font-medium text-slate-700", className)}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

interface FieldErrorProps {
  id?: string;
  children?: React.ReactNode;
}

export function FieldError({ id, children }: FieldErrorProps) {
  if (!children) return null;
  return (
    <p id={id} className="text-xs text-red-600" role="alert">
      {children}
    </p>
  );
}

interface FieldHelpProps {
  id?: string;
  children: React.ReactNode;
}

export function FieldHelp({ id, children }: FieldHelpProps) {
  return (
    <p id={id} className="text-xs text-slate-500">
      {children}
    </p>
  );
}

/** Shared input styling — apply to <input>, <select>, <textarea>. */
export const fieldControlClass =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none disabled:bg-slate-50 disabled:text-slate-500 aria-invalid:border-red-500 aria-invalid:ring-red-200";

interface FormGridProps {
  cols?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const gridCols: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export function FormGrid({ cols = 2, children, className }: FormGridProps) {
  return (
    <div className={clsx("grid gap-4", gridCols[cols], className)}>
      {children}
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-4">
      <div className="mb-4">
        <h2 className="text-h3">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
