export type RetrieveListUsersResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: { id: number; login: string; repos_url: string }[];
};

export async function retrieveListUsers(params: {
  username: string;
  perPage: number;
}): Promise<RetrieveListUsersResponse> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${params.username}&per_page=${params.perPage}`
  );
  return res.json();
}
