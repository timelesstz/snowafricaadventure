"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackFormAbandonment } from "@/lib/analytics";

interface UseFormAbandonmentParams {
  formName: string;
  formId?: string;
  isSubmitted: boolean;
  getCurrentStep?: () => number | undefined;
}

export function useFormAbandonment({
  formName,
  formId,
  isSubmitted,
  getCurrentStep,
}: UseFormAbandonmentParams) {
  const hasStarted = useRef(false);
  const lastField = useRef<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement | null>(null);

  const markStarted = useCallback(() => {
    hasStarted.current = true;
  }, []);

  const fireAbandonment = useCallback(() => {
    if (!hasStarted.current || isSubmitted) return;

    trackFormAbandonment({
      formName,
      lastField: lastField.current,
      stepNumber: getCurrentStep?.(),
      formId,
    });
  }, [formName, formId, isSubmitted, getCurrentStep]);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
        hasStarted.current = true;
        lastField.current = (target as HTMLInputElement).name || (target as HTMLInputElement).id || target.tagName.toLowerCase();
      }
    };

    const handleBeforeUnload = () => {
      fireAbandonment();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        fireAbandonment();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fireAbandonment]);

  return { formRef, markStarted };
}
