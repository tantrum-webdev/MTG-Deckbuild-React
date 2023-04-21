import { selector } from 'recoil';
import { deckListState, nameFilterState, formatFilterState } from './atom';
import { Deck } from '@/types';
import { isEmpty } from '@/helpers';

const isMatchingName = (deck: Deck, name: RegExp): boolean =>
  !!deck.name.match(name);

const isMatchingFormat = (deck: Deck, format: string): boolean =>
  isEmpty(format) || deck.format === format;

export const filteredDeckListState = selector({
  key: 'FilteredDeckList',
  get: ({ get }) => {
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
