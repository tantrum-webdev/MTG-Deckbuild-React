import { LocalStorageMock } from '@/test';
import { storage } from './storage';
import { Deck } from '@/types';

describe('Storage interface', () => {
  beforeAll(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Index method', () => {
    it('Returns an empty array if storage is empty', () => {
      expect(storage.index()).toStrictEqual(null);
    });

    it('Returns an array of decks if storage is not empty', () => {
      const decks = [{ id: 'item 1' }, { id: 'item 2' }];
      localStorage.setItem('decks', JSON.stringify(decks));

      expect(storage.index()).toStrictEqual(decks);
    });
  });

  describe('GetOne method', () => {
    it('Returns deck if it exists in storage', () => {
      const deck: Deck = {
        id: 'item',
        name: 'My custom deck',
        format: 'Standard',
      };
      const otherDeck: Deck = {
        id: 'other',
        name: 'Imported deck',
        format: 'Standard',
      };
      localStorage.setItem('decks', JSON.stringify([deck, otherDeck]));

      expect(storage.getOne('item')).toStrictEqual(deck);
    });

    it('Returns null if deck does not exist', () => {
      expect(storage.getOne('item')).toBe(null);
    });
  });

  describe('Store method', () => {
    it('Updates the storage with a new array', () => {
      const initialDecks: Deck[] = [
        { id: '1', format: 'Limited', name: 'deck one' },
      ];
      storage.store(initialDecks);
      let storedDecks = JSON.parse(localStorage.getItem('decks') as string);
      expect(storedDecks.length).toBe(1);

      const updatedDecks: Deck[] = [
        { id: '1', format: 'Limited', name: 'deck one' },
        { id: '2', format: 'Standard', name: 'deck two' },
      ];
      storage.store(updatedDecks);
      storedDecks = JSON.parse(localStorage.getItem('decks') as string);
      expect(storedDecks).toStrictEqual(updatedDecks);
    });
  });

  describe('Update method', () => {
    it('Returns null if previous deck is not found in storage', () => {
      expect(
        storage.update({
          id: 'new deck',
          format: 'Commander',
          name: 'new deck',
        })
      ).toBe(null);
      expect(localStorage.getItem('decks')).toBe(null);
    });

    it('Replaces an existing entry in the storage with updated values', () => {
      const deck: Deck = { id: 'item', name: 'old deck', format: 'Limited' };
      const updatedDeck: Deck = {
        id: 'item',
        name: 'new deck',
        format: 'Standard',
      };
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
