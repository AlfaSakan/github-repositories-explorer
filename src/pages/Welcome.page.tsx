import { LoaderCircleIcon } from "lucide-react";
import { useCallback, useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { User } from "../models/user.model";
import Button from "../components/atoms/Button.atom";
import UserRepository from "../components/atoms/UserRepository.atom";
import { retrieveListUsers } from "../services/retrieveListUsers.service";
import { retrieveListRepos } from "../services/retrieveListRepos.service";

export function Welcome() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setFetched(true);
        setLoading(true);
        const res = await retrieveListUsers({ username: search, perPage: 5 });

        const tempUsers: User[] = [];
        res.items.forEach((item) => {
          tempUsers.push({
            id: item.id,
            login: item.login,
            repos_url: item.repos_url,
            repositories: [],
            show: false,
          });
        });

        const repositoriesPromises = tempUsers.map((item) =>
          retrieveListRepos({ username: item.login })
        );

        const results = await Promise.all(repositoriesPromises);
        results.forEach((item) => {
          if (!item.length) return;
          const foundUserIndex = tempUsers.findIndex(
            (user) => user.id === item[0].owner.id
          );
          if (foundUserIndex < 0) return;
          tempUsers[foundUserIndex].repositories = item;
        });

        setUsers(tempUsers);
      } catch (error) {
        toast.error("Failed retrieve list users");
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  const handleToggleUser = useCallback((user: User) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.login !== user.login
          ? { ...item, show: false }
          : { ...item, show: !item.show }
      )
    );
  }, []);

  return (
    <main className="min-h-screen p-5 flex flex-col">
      <form onSubmit={handleSearchUser}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Username"
          className="border border-neutral-400 px-3 bg-neutral-200 w-full h-10 mb-3"
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <Button type="submit" disabled={!search.length} loading={loading}>
          Search
        </Button>
      </form>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircleIcon className="animate-spin" size={32} />
        </div>
      ) : (
        <div>
          {fetched && (
            <p className="my-4 text-neutral-500">Show users for "{search}"</p>
          )}
          {users.map((u) => (
            <UserRepository
              key={u.id}
              user={u}
              onToggle={() => handleToggleUser(u)}
            />
          ))}
        </div>
      )}
      <ToastContainer />
    </main>
  );
}
