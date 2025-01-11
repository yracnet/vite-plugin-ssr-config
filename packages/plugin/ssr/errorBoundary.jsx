import React, { Component, useState } from "react";

const parseError = (error, showModules) => {
  if (error === null) {
    return "";
  }
  if (error instanceof Error) {
    return {
      message: error.message,
      stack:
        error.stack
          ?.trim()
          .split("\n")
          .filter((line) =>
            showModules ? true : !line.includes("node_modules")
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
            showModules ? true : !line.includes("node_modules")
          ) || [],
    };
  }
  return error?.toString();
};

const ErrorPanel = ({ error, errorInfo }) => {
  const [showModules, setShowModules] = useState({
    errorStack: false,
    componentStack: false,
  });

  const showModulesToogle = (name) => {
    setShowModules((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const errorData = parseError(error, showModules.errorStack);
  const errorInfoData = parseError(errorInfo, showModules.componentStack);

  const cssStyles = `
  .ssrkBody {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    color: #333;
  }
  .ssrkContainer {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .ssrkError, .ssrkDetails {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  label {
    margin-right: 10px;
  }
  pre {
    background-color: #f7f7f7;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    overflow-x: auto;
    overflow-y: auto;
    max-height: 300px;
    max-width: 100%;
    line-height: 1.3em;
  }
  code {
    display: block;
  }
`;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error Occurred</title>
        <style>{cssStyles}</style>
      </head>
      <body className="ssrkBody">
        <div className="ssrkContainer">
          <div className="ssrkError">
            <h3>Trace Error:</h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showModules.errorStack}
                  onChange={() => showModulesToogle("errorStack")}
                />
                Show Node Modules in stack trace
              </label>
            </div>
            <code>
              <pre>{JSON.stringify(errorData, null, 2)}</pre>
            </code>
          </div>
          <div className="ssrkDetails">
            <h3>Trace Component:</h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showModules.componentStack}
                  onChange={() => showModulesToogle("componentStack")}
                />
                Show Node Modules in stack trace
              </label>
            </div>
            <code>
              <pre>{JSON.stringify(errorInfoData, null, 2)}</pre>
            </code>
          </div>
        </div>
      </body>
    </html>
  );
};

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    return this.state.hasError ? (
      <ErrorPanel error={this.state.error} errorInfo={this.state.errorInfo} />
    ) : (
      this.props.children
    );
  }
}
