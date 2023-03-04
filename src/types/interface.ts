export type Format = 'Limited' | 'Standard' | 'Commander';

export interface Deck {
  id: string;
  name: string;
  format: Format;
}
