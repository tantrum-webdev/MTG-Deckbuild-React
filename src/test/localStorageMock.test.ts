import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageMock } from './mocks/localStorage';

describe('LocalStorageMock', () => {
  let mockStorage: LocalStorageMock;

  beforeEach(() => {
    mockStorage = new LocalStorageMock();
  });

  describe('setItem method', () => {
    it('Add a new item to storage', () => {
      mockStorage.setItem('test', 'coucou');

      expect(mockStorage.items.has('test')).toBe(true);
      expect(mockStorage.items.get('test')).toBe('coucou');
    });

    it('Adding a new item to existing key overwrites old value', () => {
      mockStorage.items.set('existingItem', 'oldValue');

      mockStorage.setItem('existingItem', 'newValue');
      expect(mockStorage.items.get('existingItem')).toBe('newValue');
    });
  });

  describe('getItem method', () => {
    it('Retrieve one item from storage', () => {
      mockStorage.items.set('test', 'item');

      expect(mockStorage.getItem('test')).toBe('item');
    });

    it('Returns null if key does not exist', () => {
      expect(mockStorage.getItem('test')).toBe(null);
    });
  });

  it('removeItem: Remove one item from storage', () => {
    mockStorage.items.set('test', 'item');

    mockStorage.removeItem('test');
    expect(mockStorage.items.has('test')).toBe(false);
  });

  it('clear: Clean the storage', () => {
    mockStorage.items.set('test', 'item');
    mockStorage.items.set('test2', 'item2');

    mockStorage.clear();
    expect(mockStorage.items.size).toBe(0);
  });

  it('length: returns the number of items in storage', () => {
    mockStorage.items.set('firstItem', 'values');
    mockStorage.items.set('secondItem', 'otherValues');

    expect(mockStorage.length).toBe(2);
  });
});
