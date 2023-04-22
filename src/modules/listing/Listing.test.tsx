import { LocalStorageMock } from '@/test';

describe('Deck Listing', () => {
  let mockStorage: LocalStorageMock;

  beforeEach(() => {
    mockStorage = new LocalStorageMock();
  });

  describe('Get Decks from storage', () => {
    it('Init with an empty array', () => {
      console.log(mockStorage);
    });
  });
});
