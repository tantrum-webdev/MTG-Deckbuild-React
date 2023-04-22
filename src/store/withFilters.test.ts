import { snapshot_UNSTABLE } from 'recoil';
import { describe, it } from 'vitest';
import {
  deckListState,
  filteredDeckListState,
  formatFilterState,
  nameFilterState,
} from './listing';
import { decks } from '@/test';

describe('withFilters selectors', () => {
  describe('Search term only', () => {
    it('Returns the same list if search is empty', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(nameFilterState, '');
      });

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(decks.length);
      expect(result).toStrictEqual(decks);
    });

    it('Returns an empty array if search has no match', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(nameFilterState, 'no name matches this');
      });

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });

    it('Updates the result list based on search term', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(nameFilterState, 'deck 1');
      });

      const expectedResult = [
        { id: '1', name: 'Deck 1', format: 'Standard' },
        { id: '10', name: 'Deck 10', format: 'Commander' },
      ];

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(expectedResult.length);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('Format filter only', () => {
    it('Returns the same list if no filter is given', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(formatFilterState, '');
      });

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(decks.length);
      expect(result).toStrictEqual(decks);
    });

    it('Returns an empty array if no item matches the filter', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(formatFilterState, 'Limited');
      });

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });

    it('Updates the result list based on filter term', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(formatFilterState, 'Standard');
      });

      const expectedResult = [
        { id: '1', name: 'Deck 1', format: 'Standard' },
        { id: '2', name: 'Deck 2', format: 'Standard' },
        { id: '4', name: 'Deck 4', format: 'Standard' },
        { id: '5', name: 'Deck 5', format: 'Standard' },
        { id: '6', name: 'Deck 6', format: 'Standard' },
        { id: '8', name: 'Deck 8', format: 'Standard' },
        { id: '9', name: 'Deck 9', format: 'Standard' },
      ];

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(expectedResult.length);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('Both search and filter', () => {
    it('Returns an empty array if no item matches every predicate', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(nameFilterState, 'deck 123');
        set(formatFilterState, 'Standard');
      });

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });

    it('Updates the result list with matches for every predicate', () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(deckListState, decks);
        set(nameFilterState, 'deck 1');
        set(formatFilterState, 'Standard');
      });

      const expectedResult = [{ id: '1', name: 'Deck 1', format: 'Standard' }];

      const result = snapshot.getLoadable(filteredDeckListState).contents;

      expect(result).toHaveLength(expectedResult.length);
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
