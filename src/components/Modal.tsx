import { FunctionComponent, ReactNode, RefObject, useRef } from 'react';

export function useModal() {
  const ref = useRef<HTMLDialogElement | null>(null);

  function open() {
    if (!ref.current) {
      return;
    }
    ref.current.showModal();
  }

  function close() {
    if (!ref.current) {
      return;
    }
    ref.current.close();
  }

  return { ref, open, close };
}

export const Modal: FunctionComponent<{
  modalRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
}> = ({ modalRef, children }) => {
  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};
