import { LocalStorageMock, decks } from '@/test';
import Listing from './Listing';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';

const renderListing = () =>
  render(
    <RecoilRoot>
      <Listing />
    </RecoilRoot>
  );

describe('Deck Listing', () => {
  vi.stubGlobal('localStorage', new LocalStorageMock());

  afterEach(() => {
    localStorage.clear();
  });

  describe('Get Decks from storage', () => {
    it('Render empty table when there are no decks in storage', () => {
      renderListing();

      expect(screen.queryByRole('cell')).toBe(null);
    });

    it('Renders rows in table when there are existing decks', () => {
      localStorage.setItem('decks', JSON.stringify(decks));

      renderListing();

      // We add 1 since there is the header row that is automatically counter
      expect(screen.getAllByRole('row')).toHaveLength(decks.length + 1);
    });
  });
});
