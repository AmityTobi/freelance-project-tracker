import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export interface ModalHandle {
  show: () => void;
  close: () => void;
}

export interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  ref: React.Ref<ModalHandle>;
}

export default function Modal({
  onConfirm,
  onCancel,
  message,
  ref,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    show() {
      dialogRef.current?.showModal();
    },

    close() {
      dialogRef.current?.close();
    },
  }));

  return createPortal(
    <dialog ref={dialogRef} onCancel={onCancel}>
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <button
          className="btn btn-ghost"
          type="button"
          autoFocus
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onConfirm();
          }}
        >
          Delete
        </button>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
