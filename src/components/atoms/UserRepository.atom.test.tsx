import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import UserRepository from "./UserRepository.atom";

describe("UserRepository", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <UserRepository
        user={{
          id: 1,
          login: "login",
          repos_url: "",
          repositories: [
            {
              description: "description",
              id: 2,
              name: "name",
              stargazers_count: 111,
            },
          ],
          show: true,
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should invoke click function", async () => {
    const mockFn = vi.fn();
    render(
      <UserRepository
        onToggle={mockFn}
        user={{
          id: 1,
          login: "login 1",
          repos_url: "",
          repositories: [
            {
              description: "description",
              id: 2,
              name: "name",
              stargazers_count: 111,
            },
          ],
          show: true,
        }}
      />
    );
    fireEvent.click(screen.getByText("login 1"));
    expect(mockFn).toHaveBeenCalled();
  });
});
