"use client";

import { useCallback, useState } from "react";
import { ConfirmDialog } from "./Dialog";

interface ConfirmOptions {
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
}

interface ConfirmState extends ConfirmOptions {
  open: boolean;
  resolve: ((value: boolean) => void) | null;
}

const CLOSED: ConfirmState = {
  open: false,
  resolve: null,
  description: "",
};

/**
 * Promise-based confirmation dialog — a styled, accessible drop-in for
 * `window.confirm`. Usage:
 *
 *   const { confirm, confirmDialog } = useConfirm();
 *   // render {confirmDialog} somewhere in the tree
 *   if (!(await confirm({ description: "Delete this?" }))) return;
 */
export function useConfirm() {
  const [state, setState] = useState<ConfirmState>(CLOSED);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setState({ ...options, open: true, resolve });
    });
  }, []);

  const close = useCallback(
    (result: boolean) => {
      state.resolve?.(result);
      setState(CLOSED);
    },
    [state]
  );

  const confirmDialog = (
    <ConfirmDialog
      open={state.open}
      onCancel={() => close(false)}
      onConfirm={() => close(true)}
      title={state.title}
      description={state.description}
      confirmLabel={state.confirmLabel}
      cancelLabel={state.cancelLabel}
      tone={state.tone}
    />
  );

  return { confirm, confirmDialog };
}
