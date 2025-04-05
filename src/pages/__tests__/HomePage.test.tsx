import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, LinkProps } from "react-router-dom";
import HomePage from "../HomePage";
import "@testing-library/jest-dom";

// Mock the react-router-dom Link component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ to, children, className }: LinkProps & { className?: string }) => (
      <a href={to.toString()} className={className}>
        {children}
      </a>
    ),
  };
});

describe("HomePage", () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
  };

  it("renders the correct number of total tiles", () => {
    renderHomePage();
    const allTiles = screen.getAllByTestId("card");
    expect(allTiles).toHaveLength(25); // TOTAL_TILES constant value
  });

  it("renders available subjects with correct content", () => {
    renderHomePage();

    // Test the GitHub Actions subject card
    const subjectTitle = screen.getByText("Pierwsze kroki GitHub Actions");
    expect(subjectTitle).toBeInTheDocument();

    const description = screen.getByText(
      "Poznaj podstawy automatyzacji przepływu pracy w GitHub z wykorzystaniem GitHub Actions",
    );
    expect(description).toBeInTheDocument();

    const startButton = screen.getByText("Start Learning");
    expect(startButton).toBeInTheDocument();
  });

  it("renders placeholder tiles for remaining slots", () => {
    renderHomePage();

    // Since we have 1 real subject and TOTAL_TILES is 25, we should have 24 placeholder tiles
    const placeholderDescriptions = screen.getAllByText(
      "Use Agentic AI to create new learning paths",
    );
    expect(placeholderDescriptions).toHaveLength(24);

    // Check if placeholder buttons are disabled
    const disabledButtons = screen.getAllByRole("button", {
      name: /Subject \d+/,
    });
    expect(disabledButtons).toHaveLength(24);
    disabledButtons.forEach((button) => {
      expect(button).toHaveAttribute("disabled");
    });
  });

  it("renders the grid with correct responsive classes", () => {
    const { container } = renderHomePage();

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
      "xl:grid-cols-5",
    );
  });

  it("renders subject title in the correct format", () => {
    renderHomePage();

    const titleElement = screen.getByText("Pierwsze kroki GitHub Actions");
    expect(titleElement).toHaveClass("text-neutral-900", "dark:text-neutral-100");
  });
});
