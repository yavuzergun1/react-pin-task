import React, { useState, useRef, useEffect } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { KeyCode } from "./KeyCodes.enum";
import { StyledContainer, StyledPinInput } from "./Pin.style";

const invalidCodes = [KeyCode.SLASH, KeyCode.PERIOD, KeyCode.COMMA];

interface Props {
  pinValues: (number | undefined)[];
  setPinValues: (values: (number | undefined)[]) => void;
  color?: string;

}

const Pin = ({ pinValues, setPinValues, color = "#000", size }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusPosition, setFocusPosition] = useState(0);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const setFocus = (id: number) => {
    const next = inputsRef.current[id];
    if (next) {
      next.focus();
      /* iOS bug */
      next.click();
    }
  };

  const removeValues = (position: number, value?: number) =>
    setPinValues([
      ...pinValues
        .slice(0, position)
        .concat(...[value, pinValues.slice(position + 1)]),
    ]);

  const onInputChange = (
    { nativeEvent: { code, key } }: React.KeyboardEvent<HTMLInputElement>,
    position: number
  ) => {
    const value = Number(key.trim());

    if (invalidCodes.some((invalidCode) => code === invalidCode)) {
      setPinValues([...pinValues]);
      return false;
    }

    switch (key) {
      case KeyCode.BACKSPACE:
        removeValues(position, undefined);
        setFocusPosition(position > 0 ? position - 1 : position);
        break;
      case KeyCode.TAB:
        setFocus(position);
        break;
      default: {
        if (Number.isNaN(value) || (value && (value < 0 || value > 9))) {
          setPinValues([...pinValues]);
          return false;
        }
        removeValues(position, value);
        setFocusPosition(position + 1);
        break;
      }
    }

    return true;
  };

  useEffect(() => {
    setFocus(focusPosition);
  }, [pinValues, focusPosition]);

  const NumberInput = ({ id }: { id: number }) => (
    <StyledPinInput
      type="number"
      value={pinValues[id]}
      ref={(el:any) => {
        if (el) inputsRef.current[id] = el;
      }}
      onKeyUp={(e:any) => onInputChange(e, id)}
      onChange={() => setFocusPosition(id)}
      onFocus={() => setFocusPosition(id)}
      autoComplete="chrome-off"
      inputMode="numeric"
      pattern="\d*"
      $hasValue={pinValues[id] !== undefined}
      $isVisible={isPasswordVisible}
      $color={color}
    />
  );

  return (
    <StyledContainer $size={size}>
      {[...Array(size)].map((_, index) => (
        <div key={index}>
          <NumberInput id={index} />
        </div>
      ))}
      <div>
        {isPasswordVisible ? (
          <EyeOutlined onClick={() => setIsPasswordVisible(false)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setIsPasswordVisible(true)} />
        )}
      </div>
    </StyledContainer>
  );
};

export default Pin;
