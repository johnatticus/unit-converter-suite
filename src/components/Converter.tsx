import { useState } from 'react';
import { convertUnit, units } from '../utils/conversion';
import type { UnitCategory } from '../utils/conversion';
import { Button } from "@/components/ui/button"

const Converter = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');
  const [inputValue, setInputValue] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    try {
      const converted = convertUnit(category, fromUnit, toUnit, inputValue);
      setResult(converted);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
  };

  const unitOptions = Object.keys(units[category]);

  return (
    <div>
      <h2>Unit Converter</h2>

      <label>Category:</label>
      <select value={category} onChange={(e) => {
        const newCategory = e.target.value as UnitCategory;
        setCategory(newCategory);
        const defaultUnits = Object.keys(units[newCategory]);
        setFromUnit(defaultUnits[0]);
        setToUnit(defaultUnits[1] || defaultUnits[0]);
      }}>
        {Object.keys(units).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
        />
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>{units[category][unit].name}</option>
          ))}
        </select>

        <span> ➡ </span>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>{units[category][unit].name}</option>
          ))}
        </select>
      </div>

      <Button onClick={handleConvert} style={{ marginTop: '1rem' }}>Convert</Button>

      {result !== null && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Result:</strong> {result.toFixed(4)} {units[category][toUnit].symbol}
        </div>
      )}
    </div>
  );
};

export default Converter;
