import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageMock } from '@/test';
import { storage } from './storage';

describe('Storage interface', () => {
  beforeAll(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Index method', () => {
    it('Returns an empty array if storage is empty', () => {
      expect(storage.index()).toStrictEqual([]);
    });

    it('Returns an array of decks if storage is not empty', () => {
      const decks = [{ id: 'item 1' }, { id: 'item 2' }];
      localStorage.setItem('decks', JSON.stringify(decks));

      expect(storage.index()).toStrictEqual(decks);
    });
  });

  describe('GetOne method', () => {
    it('Returns deck if it exists in storage', () => {
      const deck = { id: 'item', name: 'My custom deck' };
      const otherDeck = { id: 'other', mame: 'Imported deck' };
      localStorage.setItem('decks', JSON.stringify([deck, otherDeck]));

      expect(storage.getOne('item')).toStrictEqual(deck);
    });

    it('Returns null if deck does not exist', () => {
      expect(storage.getOne('item')).toBe(null);
    });
  });

  describe('Store method', () => {
    it('Add a new deck to the storage', () => {
      storage.store({ id: 'first item' });
      storage.store({ id: 'second item' });

      const decks = JSON.parse(localStorage.getItem('decks') as string);
      expect(decks.length).toBe(2);
    });
  });

  describe('Update method', () => {
    it('Returns null if previous deck is not found in storage', () => {
      expect(storage.update({ id: 'new deck' })).toBe(null);
      expect(localStorage.getItem('decks')).toBe(null);
    });

    it('Replaces an existing entry in the storage with updated values', () => {
      const deck = { id: 'item', name: 'old deck' };
      const updatedDeck = { id: 'item', name: 'new deck' };
      localStorage.setItem('decks', JSON.stringify([deck]));

      expect(storage.update(updatedDeck)).toStrictEqual(updatedDeck);

      const [retrievedDeck] = JSON.parse(
        localStorage.getItem('decks') as string
      );
      expect(retrievedDeck).toStrictEqual(updatedDeck);
    });
  });

  describe('DeleteOne method', () => {
    it('Removes a deck from storage', () => {
      localStorage.setItem(
        'decks',
        JSON.stringify([{ id: 'new Item' }, { id: 'remove Item' }])
      );

      storage.deleteOne('remove Item');
      const retrievedStorage = JSON.parse(
        localStorage.getItem('decks') as string
      );

      expect(retrievedStorage).toStrictEqual([{ id: 'new Item' }]);
    });

    it('Trying to remove a deck from empty storage does nothing', () => {
      storage.deleteOne('does not exist');

      const receivedStorage = JSON.parse(
        localStorage.getItem('decks') as string
      );
      expect(receivedStorage).toStrictEqual([]);
    });

    it('Trying to remove a deck that does not exist does nothing', () => {
      const deck = { id: 'keep' };
      localStorage.setItem('decks', JSON.stringify([deck]));

      storage.deleteOne('badItem');

      const receivedStorage = JSON.parse(
        localStorage.getItem('decks') as string
      );
      expect(receivedStorage).toStrictEqual([deck]);
    });
  });

  describe('Clear method', () => {
    it('Wipes the storage', () => {
      localStorage.setItem('decks', JSON.stringify([{ id: 'first item' }]));

      storage.clear();
      expect(localStorage.length).toBe(0);
    });
  });
});
