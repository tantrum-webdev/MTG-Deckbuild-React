import { ActionButton, Modal, Table } from '@/modules/common';
import { useRef } from 'react';
import { AddDeckForm } from '@/modules/common';
import classes from './Listing.module.css';
import NameFilter from './NameFilter';
import FormatFilter from './FormatFilter';

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
      <div className={classes.filters}>
        <NameFilter />
        <FormatFilter />
      </div>
      <Table />
      <Modal modalRef={ref}>
        <AddDeckForm modalRef={ref} />
      </Modal>
    </section>
  );
}
