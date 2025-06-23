export type UnitCategory = 'length' | 'weight' | 'temperature' | 'time' | 'volume' | 'custom';

export interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}
