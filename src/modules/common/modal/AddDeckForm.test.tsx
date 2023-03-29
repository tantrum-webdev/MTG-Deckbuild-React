import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { MutableRefObject, useEffect } from 'react';
import { deckListState } from '@/store/listing';
import AddDeckForm from './AddDeckForm';
import { formatList } from '@/services';
import { Deck } from '@/types';

// TODO : TYPE
const RecoilObserver = ({ node, onChange }: any) => {
  const value = useRecoilValue(node);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return null;
};

describe('AddDeckForm', () => {
  global.fetch = vi.fn();
  // TODO: Refacto implementation to move id generation to backend
  global.crypto.randomUUID = vi.fn(() => '123');

  const createFetchResponse = (data: unknown) => {
    return { json: () => new Promise((resolve) => resolve(data)) };
  };

  it('should update deck list state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    // TODO : TYPE
    fetch.mockResolvedValue(createFetchResponse(formatList));

    render(
      <RecoilRoot>
        <RecoilObserver node={deckListState} onChange={onChange} />
        <AddDeckForm modalRef={{ current: null } as MutableRefObject<null>} />
      </RecoilRoot>
    );

    // select and fill name input
    await user.click(screen.getByRole('textbox', { name: /name/i }));
    await user.keyboard('new deck');

    // select format
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /standard/i }));

    // submit
    await user.click(screen.getByRole('button', { name: /save/i }));

    const deckData: Deck = {
      format: 'Standard',
      id: '123',
      name: 'new deck',
    };

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith([deckData]);
  });
});
