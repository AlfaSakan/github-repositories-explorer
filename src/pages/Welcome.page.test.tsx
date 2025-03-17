import { describe, expect, it, vi } from "vitest";
import * as listUsersService from "../services/retrieveListUsers.service";
import * as listReposService from "../services/retrieveListRepos.service";
import { fireEvent, render, screen } from "@testing-library/react";
import { Welcome } from "./Welcome.page";

vi.spyOn(listUsersService, "retrieveListUsers").mockResolvedValue({
  incomplete_results: true,
  items: [
    {
      id: 1,
      login: "user 1",
      repos_url: "http://localhost:8080/",
    },
  ],
  total_count: 5,
});

vi.spyOn(listReposService, "retrieveListRepos").mockResolvedValue([
  {
    description: "description",
    id: 12,
    name: "name",
    owner: { id: 22 },
    stargazers_count: 12,
  },
]);

describe("Welcome", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Welcome />);

    fireEvent.input(screen.getByRole("textbox"));
    fireEvent.click(screen.getByText("Search"));

    expect(container).toMatchSnapshot();
  });
});
