import { selector } from 'recoil';
import { nameFilterState } from '../nameFilter';
import { formatFilterState } from '../formatFilter';
import { deckListState } from './atom';
import { Deck } from '@/types';

export const filteredDeckListState = selector({
  key: 'FilteredDeckList',
  get: ({ get }) => {
    const isMatchingName = (deck: Deck, name: RegExp) => deck.name.match(name);
    const isMatchingFormat = (deck: Deck, format: string) =>
      !format || deck.format === format;

    const deckList = get(deckListState);
    const deckNameFilter = get(nameFilterState);
    const deckFormatFilter = get(formatFilterState);

    if (deckNameFilter === '' && deckFormatFilter === '') return deckList;

    const nameRegExp = new RegExp(deckNameFilter, 'i');

    return deckList.filter(
      (deck) =>
        isMatchingName(deck, nameRegExp) &&
        isMatchingFormat(deck, deckFormatFilter)
    );
  },
});
