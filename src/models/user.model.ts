export type User = {
  id: number;
  login: string;
  repos_url: string;
  show: boolean;
  repositories: {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
  }[];
};
