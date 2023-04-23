import { LocalStorageMock, decks } from '@/test';
import Listing from './Listing';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AddDeckForm } from '@/modules/common';

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

  describe('Deck List manipulation', () => {
    // Mock dialog native methods to avoid unrecognized calls in jsdom
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    it('Adding a deck adds a row to the table', async () => {
      const user = userEvent.setup();

      renderListing();

      // DOM Elements
      const dialog = screen.getByRole('dialog', { hidden: true });
      const nameInput = dialog.querySelector(
        '[name="name"]'
      ) as HTMLInputElement;
      const formatSelect = dialog.querySelector(
        '[name="format"]'
      ) as HTMLSelectElement;
      const saveButton = dialog.querySelector(
        '[type="submit"]'
      ) as HTMLButtonElement;

      await user.click(nameInput);
      await user.keyboard('new test name');
      await user.click(formatSelect);
      await user.click(formatSelect.firstChild as HTMLOptionElement); // Standard format option
      await user.click(saveButton);

      expect(
        screen.getByRole('cell', { name: 'new test name' })
      ).toBeInTheDocument();
    });
  });
});
