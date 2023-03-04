import { ActionButton, Table } from '@/modules/common';

export default function Listing() {
  return (
    <section>
      <header>
        <ActionButton action={() => console.log('clicked')} />
      </header>
      <Table />
    </section>
  );
}
