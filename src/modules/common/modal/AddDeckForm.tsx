import endpoints from '@/config/endpoints';
import { fetcher } from '@/services';
import { deckListState } from '@/store/listing';
import { Deck, Format, FormUpdateFn, IDLessDeck } from '@/types';
import { MutableRefObject, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';

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
  return (
    <form method="dialog">
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
          {formats?.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </label>
      <div>
        <button type="button" value="cancel" onClick={closeModal}>
          Cancel
        </button>
        <button value="save" onClick={addDeck}>
          Save
        </button>
      </div>
    </form>
  );
}
