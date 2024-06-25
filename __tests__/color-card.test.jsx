import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ColorCard from "../app/colorCard";

describe("ColorCard", () => {
  it("App Router: Works with Client Components (React State)", () => {
    render(<ColorCard />);
  });
});