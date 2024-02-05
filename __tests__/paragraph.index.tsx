import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Paragraph from "../components/HomePage/Paragraph";

describe("Home", () => {
  it("renders the main paragraph", () => {
    render(<Paragraph />);

    const mainParagraph = screen.getByText(
      "Ivan Smiths - Frontend UI/UX Developer - 3 years of experience. Seeking the limit. Currently at",
    );

    expect(mainParagraph).toBeInTheDocument();
  });
});
