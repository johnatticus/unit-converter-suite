export type UnitCategory = 'length' | 'weight' | 'temperature';

export type Unit = {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export const units: Record<UnitCategory, Record<string, Unit>> = {
  length: {
    meters: {
      name: 'Meters',
      symbol: 'm',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    feet: {
      name: 'Feet',
      symbol: 'ft',
      toBase: (val) => val * 0.3048,
      fromBase: (val) => val / 0.3048,
    },
    inches: {
      name: 'Inches',
      symbol: 'in',
      toBase: (val) => val * 0.0254,
      fromBase: (val) => val / 0.0254,
    },
  },
  weight: {
    kilograms: {
      name: 'Kilograms',
      symbol: 'kg',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    pounds: {
      name: 'Pounds',
      symbol: 'lb',
      toBase: (val) => val * 0.453592,
      fromBase: (val) => val / 0.453592,
    },
  },
  temperature: {
    celsius: {
      name: 'Celsius',
      symbol: '°C',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    fahrenheit: {
      name: 'Fahrenheit',
      symbol: '°F',
      toBase: (val) => (val - 32) * (5 / 9),
      fromBase: (val) => val * (9 / 5) + 32,
    },
    kelvin: {
      name: 'Kelvin',
      symbol: 'K',
      toBase: (val) => val - 273.15,
      fromBase: (val) => val + 273.15,
    },
  },
};

export function convertUnit(
  category: UnitCategory,
  from: string,
  to: string,
  value: number
): number {
  const fromUnit = units[category][from];
  const toUnit = units[category][to];

  if (!fromUnit || !toUnit) throw new Error('Invalid unit selection');

  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
}
