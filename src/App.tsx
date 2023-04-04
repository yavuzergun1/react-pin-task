import React, { useState } from "react";

import "./styles.css";
import Pin from "./Pin";
import { InputNumber } from "antd";
import { InputContainer } from "./Pin.style";

export default function App() {
  const [pinValues, setPinValues] = useState<(number | undefined)[]>([]);
  const [length, setLength] = useState(10);


  if (pinValues.length == length) {
   alert("pin is full please refresh the page")
  }

  const handleChange = (value: number) => {
    setLength(value);
  };
  return (
    <div className="App">
      <Pin pinValues={pinValues} setPinValues={setPinValues} size={length} />
      <InputContainer>
        <InputNumber
          min={1}
          max={10}
          defaultValue={10}
          onChange={(e: any) => handleChange(e)}
        />
      </InputContainer>
    </div>
  );
}
