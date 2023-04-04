import React, { useState } from "react";

import "./styles.css";
import Pin from "./Pin";
import { InputNumber } from "antd";

export default function App() {
  const [pinValues, setPinValues] = useState<(number | undefined)[]>([]);
  const [length, setLength] = useState(10);

  const handleChange = (value: number) => {
    setLength(value);
  };
  return (
    <div className="App">
      <div>
        <Pin pinValues={pinValues} setPinValues={setPinValues} size={length} />
      </div>
      <div>
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          onChange={(e:any) => handleChange(e)}
        />
      </div>
    </div>
  );
}
