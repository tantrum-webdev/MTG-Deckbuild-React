import { LocalStorageMock, decks } from '@/test';
import Listing from './Listing';
import { RecoilRoot } from 'recoil';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

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

    it('Deleting a deck removes a row from the table', async () => {
      const user = userEvent.setup();
      localStorage.setItem('decks', JSON.stringify(decks));

      renderListing();

      const currentListLength = screen.getAllByRole('row').length;

      // Click on the delete button of deck 2
      await user.click(screen.getAllByRole('button', { name: 'Delete' })[1]);

      expect(screen.getAllByRole('row')).toHaveLength(currentListLength - 1);
      expect(
        screen.queryByRole('cell', { name: 'deck 2' })
      ).not.toBeInTheDocument();
    });

    describe('Searching a name in the list of decks', () => {
      it('Displays the list of matches', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck 1');

        /* 
          waitFor used to take into account the debounced value of the input
          before applying it to the state that will filter the list of result 
        */
        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(3));
      });

      it('Table is empty if there is no match', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('no matching result');

        await waitFor(() =>
          expect(screen.queryByRole('cell')).not.toBeInTheDocument()
        );
      });
    });

    describe('Filtering the list by format', () => {
      it('Displays the matching results', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.selectOptions(screen.getByRole('combobox'), ['Commander']);

        expect(screen.getAllByRole('row')).toHaveLength(4);
      });

      it('Displays an empty table if there is no deck with this format', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.selectOptions(screen.getByRole('combobox'), ['Limited']);

        expect(screen.getAllByRole('row')).toHaveLength(1);
      });
    });

    describe('Combined search and filter', () => {
      it('Displays the list of matches', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.selectOptions(screen.getByRole('combobox'), ['Standard']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck 1');

        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(2));
      });

      it('Displays an empty table if no match for formats', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.selectOptions(screen.getByRole('combobox'), ['Limited']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck');

        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
      });

      it('Displays an empty table if no match for search', async () => {
        const user = userEvent.setup();
        localStorage.setItem('decks', JSON.stringify(decks));

        renderListing();

        await user.selectOptions(screen.getByRole('combobox'), ['Standard']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('no matching result');

        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
      });
    });
  });
});
