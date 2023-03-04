import { deckListState } from '@/store/listing';
import { Deck, Format } from '@/types';
import React, { ChangeEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';

interface ModalProps {
  modalRef: React.MutableRefObject<null | HTMLDialogElement>;
}

export default function Modal({ modalRef }: ModalProps) {
  const [name, setName] = useState('');
  const [format, setFormat] = useState<Format>('Standard');
  const setDeckList = useSetRecoilState(deckListState);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.currentTarget.value as Format);
  };

  const addDeck = () => {
    setDeckList((decks) => [
      ...decks,
      { name, format, id: crypto.randomUUID() },
    ]);
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
          <select name="deckFormat" id="deckFormat" onChange={updateFormat}>
            <option value="Standard" selected>
              Standard
            </option>
            <option value="Limited">Limited</option>
            <option value="Commander">Commander</option>
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
