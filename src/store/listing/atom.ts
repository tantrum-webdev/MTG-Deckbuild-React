import { Deck } from '@/types';
import { atom } from 'recoil';

export const deckListState = atom({
  key: 'DeckList',
  default: [] as Deck[],
});
