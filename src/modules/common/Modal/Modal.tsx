import endpoints from '@/config/endpoints';
import { deckListState } from '@/store/listing';
import { Deck, Format } from '@/types';
import { ChangeEvent, MutableRefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';

interface ModalProps {
  modalRef: MutableRefObject<null | HTMLDialogElement>;
}

export default function Modal({ modalRef }: ModalProps) {
  const [name, setName] = useState('');
  const [format, setFormat] = useState<Format>('Standard');
  const setDeckList = useSetRecoilState(deckListState);

  const { data } = useSWR<{ formats: Format[] }>(
    endpoints.formats,
    (key: string) => fetch(key).then((res) => res.json())
  );

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.currentTarget.value as Format);
  };

  const addDeck = () => {
    const deck: Deck = { name, format, id: crypto.randomUUID() };
    setDeckList((decks) => [...decks, deck]);
    setName('');
    setFormat('Standard');
  };

  const dom = (
    <dialog ref={modalRef}>
      <form method="dialog">
        <h2>Create a new Deck</h2>
        <label htmlFor="deckName">
          <input
            type="text"
            id="deckName"
            placeholder="deck's name"
            onChange={updateName}
            value={name}
          />
        </label>
        <label htmlFor="Format">
          <select
            name="deckFormat"
            id="deckFormat"
            onChange={updateFormat}
            value={format}
          >
            {data?.formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          value="cancel"
          onClick={() => modalRef.current?.close()}
        >
          Cancel
        </button>
        <button value="save" onClick={addDeck}>
          Save
        </button>
      </form>
    </dialog>
  );

  return createPortal(dom, document.body);
}
