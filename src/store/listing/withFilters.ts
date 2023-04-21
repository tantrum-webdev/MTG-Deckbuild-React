import { selector } from 'recoil';
import { deckListState, nameFilterState, formatFilterState } from './atom';
import { Deck } from '@/types';
import { isEmpty } from '@/helpers';

export const filteredDeckListState = selector({
  key: 'FilteredDeckList',
  get: ({ get }) => {
    const isMatchingName = (deck: Deck, name: RegExp) => deck.name.match(name);
    const isMatchingFormat = (deck: Deck, format: string) =>
      isEmpty(format) || deck.format === format;

    const deckList = get(deckListState);
    const deckNameFilter = get(nameFilterState);
    const deckFormatFilter = get(formatFilterState);

    if (isEmpty(deckNameFilter) && isEmpty(deckFormatFilter)) return deckList;

    const nameRegExp = new RegExp(deckNameFilter, 'i');

    return deckList.filter(
      (deck) =>
        isMatchingName(deck, nameRegExp) &&
        isMatchingFormat(deck, deckFormatFilter)
    );
  },
});
