import { storage } from '@/services';
import { Deck } from '@/types';
import { atom, AtomEffect } from 'recoil';

const syncStorage: AtomEffect<Deck[]> = ({ setSelf, onSet }) => {
  setSelf(storage.index());

  onSet((newValue) => storage.store(newValue));
};

export const deckListState = atom({
  key: 'DeckList',
  default: [] as Deck[],
  effects: [syncStorage],
});

export const nameFilterState = atom({
  key: 'NameFilter',
  default: '',
});
