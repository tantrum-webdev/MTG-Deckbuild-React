import { ActionButton, Modal, Table, Filters } from '@/modules/common';
import { useRef } from 'react';
import { AddDeckForm } from '@/modules/common';

export default function Listing() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <section>
      <header>
        <ActionButton
          action={() => ref.current?.showModal()}
          textContent="Add new deck"
        />
      </header>
      <Filters />
      <Table />
      <Modal modalRef={ref}>
        <AddDeckForm modalRef={ref} />
      </Modal>
    </section>
  );
}
