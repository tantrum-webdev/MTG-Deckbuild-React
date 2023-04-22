import { deckListState } from '@/store/listing';
import { Deck, FormUpdateFn, IDLessDeck } from '@/types';
import { MouseEventHandler, MutableRefObject, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ActionButton } from '@/modules/common';
import classes from './AddDeckForm.module.css';
import { formatList } from '@/config';

const initialState: IDLessDeck = {
  name: '',
  format: 'Standard',
};

interface FormProps {
  modalRef: MutableRefObject<null | HTMLDialogElement>;
}

export default function AddDeckForm({ modalRef }: FormProps) {
  const [form, setForm] = useState<IDLessDeck>(initialState);
  const setDeckList = useSetRecoilState(deckListState);

  const updateForm: FormUpdateFn = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const addDeck: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const deck: Deck = { ...form, id: crypto.randomUUID() };
    setDeckList((decks) => [...decks, deck]);
    resetForm();
    modalRef.current?.close();
  };

  const closeModal = () => {
    modalRef.current?.close();
    resetForm();
  };
  return (
    <form method="dialog" className={classes.form} name="addDeckForm">
      <h2>Create a new Deck</h2>
      <label htmlFor="deckName">
        <span>Name:</span>
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
        <span>Format:</span>
        <select
          name="format"
          id="deckFormat"
          onChange={updateForm}
          value={form.format}
        >
          {formatList?.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </label>
      <div>
        <ActionButton action={closeModal} textContent="Cancel" />
        <ActionButton
          action={addDeck}
          textContent="Save"
          value="save"
          type="submit"
        />
      </div>
    </form>
  );
}
