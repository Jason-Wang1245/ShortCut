import React, { forwardRef, useRef, useImperativeHandle, useEffect } from "react";

export type ModalHandles = {
  open: () => void;
  close: () => void;
};

export const Modal = forwardRef(
  ({ children, heading, open, onClose }: { children: React.ReactNode; heading: string; open?: boolean; onClose?: Function }, ref) => {
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
    }

    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "c" || event.key === "C") handleClose();
      }

      const dialogElement = dialogRef.current;
      dialogElement?.addEventListener("keydown", handleKeyDown);
      return () => {
        dialogElement?.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <dialog ref={dialogRef} className="w-full" open={open}>
        <div className="h-full w-full">
          <div className="flex gap-1">
            <button onClick={handleClose} className="ml-1">
              <i className="bi bi-x text-2xl font-bold" />
            </button>
            <h1 className="text-base font-semibold mt-[0.2rem]">{heading}</h1>
          </div>
          <div className="w-full px-4 pb-4">{children}</div>
        </div>
      </dialog>
    );
  }
);

export default Modal;
