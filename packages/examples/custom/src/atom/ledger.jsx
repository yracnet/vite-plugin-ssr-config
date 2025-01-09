import { useEffect, useState } from "react";
import styled from "styled-components";
import viteLogo from "../../public/vite.svg";
import reactLogo from "../assets/react.svg";

const Section = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #4caf50, #2196f3);

  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  > .ledger-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;

    .logo {
      height: 40px;
      margin: 0 10px;
      transition: transform 0.2s;
    }

    @keyframes logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      a:nth-of-type(2) .logo {
        animation: logo-spin infinite 20s linear;
      }
    }

    .logo:hover {
      transform: scale(1.1);
    }

    .logo.vite {
      filter: drop-shadow(0 0 5px #fff);
    }

    .logo.react {
      filter: drop-shadow(0 0 5px #61dafb);
    }

    .ledger-text {
      text-align: center;
    }

    .ledger-text h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    .ledger-text h4 {
      font-size: 1rem;
      margin: 0;
      color: #e2e8f0;
    }
  }
`;

export const Ledger = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Section>
      <div className="ledger-content">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <div className="ledger-text">
          <h1>VITE + React SSR + CUSTOM</h1>
          <h4 suppressHydrationWarning={true}>TIME: {time}</h4>
        </div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </Section>
  );
};
