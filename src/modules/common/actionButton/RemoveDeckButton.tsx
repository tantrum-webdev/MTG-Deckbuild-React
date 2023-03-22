import { useSetRecoilState } from 'recoil';
import { deckListState } from '@/store/listing';
import ActionButton from './ActionButton';

interface RemoveDeckProps {
  id: string;
}

export default function RemoveDeckButton({ id }: RemoveDeckProps) {
  const setDeckList = useSetRecoilState(deckListState);

  const removeDeck = () => {
    setDeckList((decks) => decks.filter((deck) => deck.id !== id));
  };

  return <ActionButton action={removeDeck} textContent="Delete" value="save" />;
}
