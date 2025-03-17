import { ChevronDownIcon, StarIcon } from "lucide-react";
import type { User } from "~/models/user.model";

type Props = {
  onToggle?: VoidFunction;
  user: User;
};

export default function UserRepository({ onToggle, user }: Props) {
  return (
    <div className="mb-3">
      <button
        className="h-10 flex px-3 items-center w-full justify-between bg-neutral-100"
        onClick={onToggle}
      >
        <p>{user.login}</p>
        <ChevronDownIcon />
      </button>
      {user.show && (
        <div className="space-y-3 mt-3 ml-3">
          {user.repositories.map((repo) => (
            <div key={repo.id} className="bg-neutral-400 px-2 py-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{repo.name}</p>
                <div className="flex items-center">
                  {repo.stargazers_count}
                  <StarIcon size={16} className="inline fill-black" />
                </div>
              </div>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
