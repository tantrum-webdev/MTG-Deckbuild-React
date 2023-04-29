import { storage } from '@/services';
import { Deck, Format } from '@/types';
import { atom, AtomEffect } from 'recoil';

const syncStorage: AtomEffect<Deck[]> = ({ setSelf, onSet }) => {
  setSelf(storage.index());

  onSet((newValue) => storage.store(newValue));
};

export const deckListState = atom<Deck[]>({
  key: 'DeckList',
  default: [],
  effects: [syncStorage],
});

export const nameFilterState = atom<string>({
  key: 'NameFilter',
  default: '',
});

export const formatFilterState = atom<Format | ''>({
  key: 'FormatFilter',
  default: '',
});
