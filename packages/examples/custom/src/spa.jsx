import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import reactLogo from "./assets/react.svg";
import { Counter } from "./atom/counter";
import { Ledger } from "./atom/ledger";
import viteLogo from "/vite.svg";

const Section = styled.div`
  > h1 {
    font-size: 1.5em;
    text-align: center;
    color: #bf4f74;
  }
  > * {
    display: block;
    margin: 0 auto;
  }
  .logo {
    width: 80px;
  }
`;
createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <Section>
      <h1>ADMIN SPA</h1>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <img src={reactLogo} className="logo" alt="React logo" />
    </Section>
    <Ledger />
    <Counter />
  </StrictMode>
);
