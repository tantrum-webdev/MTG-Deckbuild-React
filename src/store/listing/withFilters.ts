import { selector } from 'recoil';
import { deckListState, nameFilterState } from './atom';

export const filteredDeckListState = selector({
  key: 'FilteredDeckList',
  get: ({ get }) => {
    const deckNameFilter = get(nameFilterState);
    const deckList = get(deckListState);

    if (deckNameFilter === '') return deckList;

    return deckList.filter((deck) =>
      deck.name.match(new RegExp(deckNameFilter, 'i'))
    );
  },
});
