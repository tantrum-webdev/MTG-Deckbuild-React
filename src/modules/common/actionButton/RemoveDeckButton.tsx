import { useSetRecoilState } from 'recoil';
import { deckListState } from '@/store/listing';
import { IDOnlyDeck } from '@/types';
import ActionButton from './ActionButton';

export default function RemoveDeckButton({ id }: IDOnlyDeck) {
  const setDeckList = useSetRecoilState(deckListState);

  const removeDeck = () => {
    setDeckList((decks) => decks.filter((deck) => deck.id !== id));
  };

  return <ActionButton action={removeDeck} textContent="Delete" value="save" />;
}
