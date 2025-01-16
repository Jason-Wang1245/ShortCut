import React, { forwardRef, useRef, useImperativeHandle } from "react";

export type ModalHandles = {
  open: () => void;
  close: () => void;
};

export const Modal = forwardRef(({ children, open, onClose }: { children: React.ReactNode; open?: boolean; onClose?: Function }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current!.showModal();
    },
    close: () => {
      dialogRef.current!.close();
    },
  }));

  function handleClose() {
    dialogRef.current!.close();
    if (onClose != undefined) onClose();
  }

  return (
    <dialog ref={dialogRef} className="modal h-full w-full" open={open}>
      <div className="h-full w-full">
        <button onClick={handleClose} className="close-btn block">
          <i className="bi bi-x text-2xl ml-1" />
        </button>
        <div className="w-full px-4 pb-4">{children}</div>
      </div>
    </dialog>
  );
});

export default Modal;
