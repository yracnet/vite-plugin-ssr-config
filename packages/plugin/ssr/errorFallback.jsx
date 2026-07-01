import { useState } from "react";

const cssStyles = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .box {
      margin-bottom: 20px;
    }
    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    pre {
      background-color: #f7f7f7;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
      max-height: 300px;
    }
    label {
      display: block;
      margin-bottom: 8px;
    }
    button {
      margin: 10px 0;
      padding: 6px 12px;
      cursor: pointer;
    }
  `;

const parseError = (error, showModules) => {
  if (!error) return "";
  if (error instanceof Error) {
    return {
      message: error.message,
      stack:
        error.stack
          ?.trim()
          .split("\n")
          .filter((line) =>
            showModules ? true : !line.includes("node_modules"),
          ) || [],
    };
  }
  if (typeof error === "object") {
    return {
      ...error,
      componentStack:
        error.componentStack
          ?.trim()
          .split("\n")
          .filter((line) =>
            showModules ? true : !line.includes("node_modules"),
          ) || [],
    };
  }
  return String(error);
};

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [showModules, setShowModules] = useState({
    errorStack: false,
    componentStack: false,
  });

  const toggle = (name) => {
    setShowModules((p) => ({ ...p, [name]: !p[name] }));
  };

  const errorData = parseError(error, showModules.errorStack);
  const errorInfoData = parseError(
    error?.componentStack,
    showModules.componentStack,
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error Occurred</title>
        <style>{cssStyles}</style>
      </head>

      <body>
        <div className="container">
          <h2>⚠️ Something went wrong</h2>

          <button onClick={resetErrorBoundary}>Retry</button>

          <div className="box">
            <h3>Error trace</h3>

            <label>
              <input
                type="checkbox"
                checked={showModules.errorStack}
                onChange={() => toggle("errorStack")}
              />
              Show node_modules
            </label>

            <pre>{JSON.stringify(errorData, null, 2)}</pre>
          </div>

          <div className="box">
            <h3>Component trace</h3>

            <label>
              <input
                type="checkbox"
                checked={showModules.componentStack}
                onChange={() => toggle("componentStack")}
              />
              Show node_modules
            </label>

            <pre>{JSON.stringify(errorInfoData, null, 2)}</pre>
          </div>
        </div>
      </body>
    </html>
  );
};
