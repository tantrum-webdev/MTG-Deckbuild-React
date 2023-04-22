import { LocalStorageMock, decks } from '@/test';
import Listing from './Listing';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';

describe('Deck Listing', () => {
  vi.stubGlobal('localStorage', new LocalStorageMock());

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Get Decks from storage', () => {
    it('Render empty table when there are no decks in storage', () => {
      render(
        <RecoilRoot>
          <Listing />
        </RecoilRoot>
      );

      expect(screen.queryByRole('cell')).toBe(null);
    });

    it('Renders rows in table when there are existing decks', () => {
      localStorage.setItem('decks', JSON.stringify(decks));

      render(
        <RecoilRoot>
          <Listing />
        </RecoilRoot>
      );

      // We add 1 since there is the header row that is automatically counter
      expect(screen.getAllByRole('row')).toHaveLength(decks.length + 1);
    });
  });
});
