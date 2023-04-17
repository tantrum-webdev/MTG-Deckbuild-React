import { deckListState, filteredDeckListState } from '@/store/listing';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ActionButton } from '@/modules/common';
import classes from './Table.module.css';

export default function Table() {
  const filteredDecks = useRecoilValue(filteredDeckListState);
  const setDeckList = useSetRecoilState(deckListState);

  const removeDeck = (id: string) => {
    setDeckList((decks) => decks.filter((deck) => deck.id !== id));
  };

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
        {filteredDecks.map(({ id, name, format }) => (
          <tr key={id}>
            <td data-label="Name">{name}</td>
            <td data-label="Format">{format}</td>
            <td data-label="Actions">
              <ActionButton
                action={() => removeDeck(id)}
                textContent="Delete"
                value="save"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
