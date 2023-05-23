import { isEmpty, isNil } from '@/helpers';

describe('helpers', () => {
  describe('isEmpty method', () => {
    it('Return false when value is a string with one character or more', () => {
      expect(isEmpty('t')).toBe(false);
    });

    it('Return true when value is an empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('Return false when value is an array with at least one element', () => {
      expect(isEmpty(['test'])).toBe(false);
    });

    it('Return true when value is an empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('Return false when value is an object with at least one property', () => {
      expect(isEmpty({ test: 'test' })).toBe(false);
    });

    it('Return true when value is an empty object', () => {
      expect(isEmpty({})).toBe(true);
    });
  });

  describe('isNil method', () => {
    it('Returns true if value is null', () => {
      expect(isNil(null)).toBe(true);
    });

    it('Returns true if value is undefined', () => {
      expect(isNil(undefined)).toBe(true);
    });

    it('Returns false if value is empty array', () => {
      expect(isNil([])).toBe(false);
    });

    it('Returns false if value is empty object', () => {
      expect(isNil({})).toBe(false);
    });

    it('Returns false if value is empty string', () => {
      expect(isNil('')).toBe(false);
    });

    it('Returns false if value is 0', () => {
      expect(isNil(0)).toBe(false);
    });
  });
});
