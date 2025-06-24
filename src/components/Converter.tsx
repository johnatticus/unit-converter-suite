import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { convertUnit, units, type UnitCategory } from "@/utils/conversion";

const Converter = () => {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState<string>("meters");
  const [toUnit, setToUnit] = useState<string>("feet");
  const [inputValue, setInputValue] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const unitOptions = Object.keys(units[category]);

  const handleConvert = () => {
    try {
      const converted = convertUnit(category, fromUnit, toUnit, inputValue);
      setResult(converted);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
  };

  return (
    <Card className="shadow-md">
  <CardHeader>
    <CardTitle className="text-xl text-center">Unit Converter</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* Category Selector */}
    <div className="space-y-2">
      <Label>Category</Label>
      <Select
        value={category}
        onValueChange={(val) => {
          const newCat = val as UnitCategory;
          setCategory(newCat);
          const defaults = Object.keys(units[newCat]);
          setFromUnit(defaults[0]);
          setToUnit(defaults[1] || defaults[0]);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(units).map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* From/To Selectors */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>From</Label>
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {unitOptions.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {units[category][unit].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>To</Label>
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {unitOptions.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {units[category][unit].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Input */}
    <div className="space-y-2">
      <Label>Value</Label>
      <Input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(parseFloat(e.target.value))}
      />
    </div>

    {/* Convert Button */}
    <div>
      <Button className="w-full" onClick={handleConvert}>
        Convert
      </Button>
    </div>

    {/* Result */}
    {result !== null && (
      <div className="text-center font-semibold text-lg pt-2">
        {inputValue} {units[category][fromUnit].symbol} ={" "}
        {result.toFixed(4)} {units[category][toUnit].symbol}
      </div>
    )}
  </CardContent>
</Card>

  );
};

export default Converter;