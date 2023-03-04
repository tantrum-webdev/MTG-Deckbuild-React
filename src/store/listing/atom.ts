import { storage } from '@/services';
import { Deck } from '@/types';
import { atom, AtomEffect } from 'recoil';

const syncStorage: AtomEffect<Deck[]> = ({ setSelf, onSet }) => {
  setSelf(storage.index());

  onSet((newValue, _, isReset) => {
    isReset ? storage.clear() : storage.store(newValue);
  });
};

export const deckListState = atom({
  key: 'DeckList',
  default: [] as Deck[],
  effects: [syncStorage],
});
