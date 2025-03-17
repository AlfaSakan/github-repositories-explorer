import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button.atom";

describe("Button", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Button loading={false} />);
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when loading", () => {
    const { container } = render(<Button loading />);
    expect(container).toMatchSnapshot();
  });

  it("should invoke click function", async () => {
    const mockFn = vi.fn();
    render(<Button onClick={mockFn}>Button</Button>);
    fireEvent.click(screen.getByText("Button"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("should not invoke click function", async () => {
    const mockFn = vi.fn();
    render(
      <Button disabled onClick={mockFn}>
        Button 1
      </Button>
    );
    fireEvent.click(screen.getByText("Button 1"));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
