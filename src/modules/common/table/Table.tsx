import { deckListState } from '@/store/listing';
import { useRecoilValue } from 'recoil';
import classes from './Table.module.css';

export default function Table() {
  const decks = useRecoilValue(deckListState);

  return (
    <table className={classes.table}>
      <caption>My Decks</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Format</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {decks.map(({ id, name, format }) => (
          <tr key={id}>
            <td data-label="Name">{name}</td>
            <td data-label="Format">{format}</td>
            <td data-label="Actions">
              <button>Export</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
