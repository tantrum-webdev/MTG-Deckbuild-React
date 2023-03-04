import { ActionButton, Modal, Table } from '@/modules/common';
import { useRef } from 'react';

export default function Listing() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <section>
      <header>
        <ActionButton action={() => ref.current?.show()} />
      </header>
      <Table />
      <Modal modalRef={ref} />
    </section>
  );
}