import React, { forwardRef, useRef, useImperativeHandle } from "react";

export type ModalHandles = {
  open: () => void;
  close: () => void;
};

// ForwardRef allows the parent to control the modal using a ref
export const Modal = forwardRef(({ children }: { children: React.ReactNode }, ref) => {
  // Reference to the dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Expose open and close methods to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current!.showModal();
    },
    close: () => {
      dialogRef.current!.close();
    },
  }));

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-content">
        <button onClick={() => dialogRef.current!.close()} className="close-btn">
          X
        </button>
        {children}
      </div>
    </dialog>
  );
});

export default Modal;
