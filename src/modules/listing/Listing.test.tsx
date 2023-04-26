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

const setDecks = () => localStorage.setItem('decks', JSON.stringify(decks));

describe('Deck Listing', () => {
  const user = userEvent.setup();

  beforeAll(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());

    // Mock dialog native methods to avoid unrecognized calls in jsdom
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Get Decks from storage', () => {
    it('Render empty table when there are no decks in storage', () => {
      renderListing();

      expect(screen.queryByRole('cell')).toBe(null);
    });

    it('Renders rows in table when there are existing decks', () => {
      setDecks();
      renderListing();

      expect(screen.getAllByRole('cell', { name: /deck/i })).toHaveLength(
        decks.length
      );
    });
  });

  describe('Deck List manipulation', () => {
    it('Adding a deck adds a row to the table and storage', async () => {
      renderListing();

      /* 
        DOM Elements, using a querySelector on the dialog node since the dialog implementation in JSDom 
        is currently lacking. This also avoid nodes collision since the filters share the same element type and name
      */
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
      await user.selectOptions(formatSelect, ['Standard']);
      await user.click(saveButton);

      expect(
        screen.getByRole('cell', { name: 'new test name' })
      ).toBeInTheDocument();

      // Verify the synchronization of state with localStorage
      const storage = localStorage.getItem('decks');
      expect(storage).not.toBeNull();

      const parsedStorage = JSON.parse(storage as string);
      expect(parsedStorage[0].name).toBe('new test name');
      expect(parsedStorage).toHaveLength(1);
    });

    it('Deleting a deck removes a row from the table and storage', async () => {
      setDecks();
      renderListing();

      const currentListLength = screen.getAllByRole('cell', {
        name: /deck/i,
      }).length;

      await user.click(screen.getAllByRole('button', { name: 'Delete' })[1]);

      expect(screen.getAllByRole('cell', { name: /deck/i })).toHaveLength(
        currentListLength - 1
      );
      expect(
        screen.queryByRole('cell', { name: 'deck 2' })
      ).not.toBeInTheDocument();

      // Verify the synchronization of state with localStorage
      const storage = JSON.parse(localStorage.getItem('decks') as string);
      expect(storage).toHaveLength(decks.length - 1);
    });

    describe('Name filter in the list of decks', () => {
      beforeEach(() => {
        setDecks();
        renderListing();
      });

      it('Displays the list of matches', async () => {
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck 1');

        // waitFor to account for debounced value
        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(3));
      });

      it('Table is empty if there is no match', async () => {
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('no matching result');

        // waitFor to account for debounced value
        await waitFor(() =>
          expect(screen.queryByRole('cell')).not.toBeInTheDocument()
        );
      });
    });

    describe('Filtering the list by format', () => {
      beforeEach(() => {
        setDecks();
        renderListing();
      });

      it('Displays the matching results', async () => {
        await user.selectOptions(screen.getByRole('combobox'), ['Commander']);

        expect(screen.getAllByRole('row')).toHaveLength(4);
      });

      it('Displays an empty table if there is no deck with this format', async () => {
        await user.selectOptions(screen.getByRole('combobox'), ['Limited']);

        expect(screen.getAllByRole('row')).toHaveLength(1);
      });
    });

    describe('Combined name and format filter', () => {
      beforeEach(() => {
        setDecks();
        renderListing();
      });

      it('Displays the list of matches', async () => {
        await user.selectOptions(screen.getByRole('combobox'), ['Standard']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck 1');

        // waitFor to account for debounced value
        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(2));
      });

      it('Displays an empty table if no match for formats', async () => {
        await user.selectOptions(screen.getByRole('combobox'), ['Limited']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('deck');

        // waitFor to account for debounced value
        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
      });

      it('Displays an empty table if no match for name filter', async () => {
        await user.selectOptions(screen.getByRole('combobox'), ['Standard']);
        await user.click(screen.getByRole('textbox', { name: 'Name:' }));
        await user.keyboard('no matching result');

        // waitFor to account for debounced value
        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
      });
    });
  });
});
