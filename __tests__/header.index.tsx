import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../app/components/Header";

describe("ImageComponent", () => {
  it("renders the image with the correct src and alt attributes", () => {
    render(<Header />); // Render your component
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", "/images/IVANSMITHS.svg");
    expect(imgElement).toHaveAttribute("alt", "ivan smiths");
  });
});
