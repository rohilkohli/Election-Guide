import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ELI18Provider, useELI18 } from "../contexts/ELI18Context";

const TestComponent = () => {
  const { eli18Mode, toggleEli18Mode } = useELI18();
  return (
    <div>
      <span data-testid="mode-indicator">{eli18Mode ? "ON" : "OFF"}</span>
      <button onClick={toggleEli18Mode}>Toggle Mode</button>
    </div>
  );
};

describe("ELI18Context", () => {
  it("should initialize with eli18Mode as false", () => {
    render(
      <ELI18Provider>
        <TestComponent />
      </ELI18Provider>
    );
    expect(screen.getByTestId("mode-indicator")).toHaveTextContent("OFF");
  });

  it("should toggle eli18Mode when toggleEli18Mode is called", () => {
    render(
      <ELI18Provider>
        <TestComponent />
      </ELI18Provider>
    );
    const button = screen.getByText("Toggle Mode");
    
    fireEvent.click(button);
    expect(screen.getByTestId("mode-indicator")).toHaveTextContent("ON");
    
    fireEvent.click(button);
    expect(screen.getByTestId("mode-indicator")).toHaveTextContent("OFF");
  });
});
