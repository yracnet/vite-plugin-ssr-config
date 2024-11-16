import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import "../assets/root.css";
import viteLogo from "/vite.svg";

export const Ledger = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="ledger">
      <div className="ledger-content">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <div className="ledger-text">
          <h1>VITE + React SSR + BASIC</h1>
          <h4 suppressHydrationWarning={true}>TIME: {time}</h4>
        </div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
};
