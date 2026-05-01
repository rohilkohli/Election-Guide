import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Suppress console.error during tests to avoid noise in the test output
// since we expect errors to be thrown and caught.
const originalConsoleError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

const ProblematicComponent = () => {
  throw new Error("Test error!");
  return <div>This will not render.</div>;
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Hello World</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child-component")).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });

  it("renders the default fallback UI when a child throws an error", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/An unexpected error occurred/i)).toBeInTheDocument();
  });

  it("renders a custom fallback if provided", () => {
    const CustomFallback = <div data-testid="custom-fallback">Custom Error View</div>;

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("allows the user to retry (reset the error state)", () => {
    // We need a component that throws only on the first render
    let shouldThrow = true;
    const ConditionalThrower = () => {
      if (shouldThrow) {
        throw new Error("First render fails");
      }
      return <div>Success!</div>;
    };

    render(
      <ErrorBoundary>
        <ConditionalThrower />
      </ErrorBoundary>
    );

    // Initial render throws, fallback should be visible
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Now change the condition so the next render succeeds
    shouldThrow = false;

    // Click the retry button
    const retryButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(retryButton);

    // The error boundary should reset and render the successful component
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });
});
