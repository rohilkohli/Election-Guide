import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { ELI18Provider } from "../contexts/ELI18Context";

// Mock the next/navigation hooks
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders the brand logo and title", () => {
    render(
      <ELI18Provider>
        <Navbar />
      </ELI18Provider>
    );
    expect(screen.getByText("ElectionPath")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(
      <ELI18Provider>
        <Navbar />
      </ELI18Provider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Journey")).toBeInTheDocument();
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Learn")).toBeInTheDocument();
  });

  it("toggles ELI18 mode when the desktop button is clicked", () => {
    render(
      <ELI18Provider>
        <Navbar />
      </ELI18Provider>
    );

    const toggleButton = screen.getByRole("button", { name: /Toggle Explain Like I'm 18 mode/i });
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles the mobile menu visibility when the hamburger button is clicked", () => {
    render(
      <ELI18Provider>
        <Navbar />
      </ELI18Provider>
    );

    const hamburgerButton = screen.getByRole("button", { name: /Open navigation menu/i });
    expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");

    // The mobile menu container has an id of "mobile-menu".
    // When menuOpen is false, it shouldn't be in the document.
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(hamburgerButton);

    expect(hamburgerButton).toHaveAttribute("aria-expanded", "true");
    expect(hamburgerButton).toHaveAttribute("aria-label", "Close navigation menu");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });
});
