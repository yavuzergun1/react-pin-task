import styled from "styled-components";

interface StyledPinInputProps {
  $hasValue: boolean;
  $isVisible: boolean;
  $color?: string;
}

export const StyledPinInput = styled.input<StyledPinInputProps>`
  height: 30px;
  width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  -webkit-text-security: ${(props: any) =>
    props.$isVisible ? "none" : "disc"};

  background: ${(props: any) => (props.$hasValue ? props.$color : "white")};
  color: ${(props: any) => (props.$hasValue ? "white" : "black")};
  border-radius: 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* &[type="number"] {
    -moz-appearance: textfield;
  } */

  :focus {
    outline: none;
  }
`;

export const StyledContainer = styled.div<{ $size: number }>`
  display: grid;
  box-sizing: border-box;
  width: 80%;

  grid-template-columns: ${(props: any) => `repeat(${props.$size}, 1fr) 5%`};
  grid-template-rows: 1fr;
  grid-column-gap: 4%;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
