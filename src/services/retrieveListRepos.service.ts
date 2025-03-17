export type RetrieveListReposResponse = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  owner: { id: number };
}[];

export async function retrieveListRepos(params: {
  username: string;
}): Promise<RetrieveListReposResponse> {
  const res = await fetch(
    `https://api.github.com/users/${params.username}/repos`
  );
  return res.json();
}
