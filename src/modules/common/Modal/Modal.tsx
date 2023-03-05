import { ChangeEvent, MutableRefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import endpoints from '@/config/endpoints';
import { fetcher } from '@/services';
import { deckListState } from '@/store/listing';
import { Deck, Format, IDLessDeck } from '@/types';

/**
 * TODO :
 * - Set the Modal content from the caller (passing the content as a child / component prop?)
 * - Basic styling
 * - Close modal on escape key and/or click outside ?
 */

interface ModalProps {
  modalRef: MutableRefObject<null | HTMLDialogElement>;
}

type FormUpdateFn = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;

const initialState: IDLessDeck = {
  name: '',
  format: 'Standard',
};

export default function Modal({ modalRef }: ModalProps) {
  const [form, setForm] = useState<IDLessDeck>(initialState);
  const setDeckList = useSetRecoilState(deckListState);

  const { data: formats } = useSWR<Format[]>(endpoints.formats, fetcher);

  const updateForm: FormUpdateFn = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const addDeck = () => {
    const deck: Deck = { ...form, id: crypto.randomUUID() };
    setDeckList((decks) => [...decks, deck]);
    resetForm();
  };

  const closeModal = () => {
    modalRef.current?.close();
    resetForm();
  };

  const dom = (
    <dialog ref={modalRef}>
      <form method="dialog">
        <h2>Create a new Deck</h2>
        <label htmlFor="deckName">
          <input
            type="text"
            id="deckName"
            name="name"
            placeholder="deck's name"
            onChange={updateForm}
            value={form.name}
          />
        </label>
        <label htmlFor="Format">
          <select
            name="format"
            id="deckFormat"
            onChange={updateForm}
            value={form.format}
          >
            {formats?.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
        <button type="button" value="cancel" onClick={closeModal}>
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
