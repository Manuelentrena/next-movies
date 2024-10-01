/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

it("App Router: Works with Server Components", () => {
  render(<Page />);
  expect(screen.getByRole("heading")).toHaveTextContent("App Router");
});
