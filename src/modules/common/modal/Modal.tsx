import { MutableRefObject, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  modalRef: MutableRefObject<null | HTMLDialogElement>;
  children: ReactNode;
}

export default function Modal({ modalRef, children }: ModalProps) {
  return createPortal(
    <dialog ref={modalRef} className={classes.modal}>
      {children}
    </dialog>,
    document.body
  );
}
