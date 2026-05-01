import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onConfirm, onCancel, message, ref }) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        dialogRef.current.showModal();
      },

      close: () => {
        dialogRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef} onCancel={onCancel}>
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <button
          className="btn btn-ghost"
          type="button"
          autoFocus
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
        >
          Delete
        </button>
      </div>
    </dialog>,
    document.getElementById("modal-root"),
  );
}
