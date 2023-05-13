import { deckListState } from '@/store/listing';
import { Deck } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function DeckDetails() {
  const { id } = useParams();
  const decks = useRecoilValue(deckListState);
  const [deck, setDeck] = useState<Deck>();

  useEffect(() => {
    const result = decks.find((x) => x.id === id);

    if (!result) {
      throw new Error('No matching deck');
    }

    setDeck(result);
  }, [decks]);

  return (
    <ul>
      <li>Id: {deck?.id}</li>
      <li>Name: {deck?.name}</li>
      <li>Format: {deck?.format}</li>
    </ul>
  );
}
