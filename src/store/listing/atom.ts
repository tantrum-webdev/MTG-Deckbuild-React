import { storage } from '@/services';
import { Deck } from '@/types';
import { atom, AtomEffect } from 'recoil';

/**
 * TODO:
 * - Check documentation to eventually clean it up / comment here to provide more info
 */
const syncStorage: AtomEffect<Deck[]> = ({ setSelf, onSet }) => {
  setSelf(storage.index());

  onSet((newValue) => storage.store(newValue));
};

export const deckListState = atom({
  key: 'DeckList',
  default: [] as Deck[],
  effects: [syncStorage],
});
