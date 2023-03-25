import { ChangeEvent } from 'react';

export type Format = 'Standard' | 'Limited' | 'Commander';

export interface Deck {
  id: string;
  name: string;
  format: Format;
}

export type IDLessDeck = Omit<Deck, 'id'>;

export type FormUpdateFn = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;
