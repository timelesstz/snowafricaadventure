"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle } from "lucide-react";

export type FormShellState = { error: string | null };

export type FormShellAction = (
  prevState: FormShellState,
  formData: FormData
) => Promise<FormShellState>;

interface FormShellProps {
  action: FormShellAction;
  children: React.ReactNode;
  className?: string;
  unsavedGuard?: boolean;
}

const initialState: FormShellState = { error: null };

function UnsavedChangesGuard() {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [dirty, setDirty] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    const form = markerRef.current?.closest("form");
    if (!form) return;

    const onChange = () => setDirty(true);
    form.addEventListener("input", onChange);
    form.addEventListener("change", onChange);
    return () => {
      form.removeEventListener("input", onChange);
      form.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!dirty || pending) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, pending]);

  return <span ref={markerRef} className="hidden" aria-hidden="true" />;
}

export default function FormShell({
  action,
  children,
  className,
  unsavedGuard = true,
}: FormShellProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className={className}>
      {unsavedGuard && <UnsavedChangesGuard />}
      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Save failed</p>
            <p className="text-sm text-red-700 mt-0.5">{state.error}</p>
          </div>
        </div>
      )}
      {children}
    </form>
  );
}
