import { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  width: 200px;
  margin: 0 auto;
  background: black;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    font-size: 50px;
  }

  > button {
    width: 50px;
    height: 80px;
    background-color: #333;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }
  }

  > h1 {
    margin: 0;
    width: 50px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <Section>
      <button onClick={() => setCount((p) => p - 1)}>-</button>
      <h1>{count}</h1>
      <button onClick={() => setCount((p) => p + 1)}>+</button>
    </Section>
  );
};
