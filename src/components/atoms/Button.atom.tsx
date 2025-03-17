import { LoaderCircleIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: VoidFunction;
  type?: "button" | "submit" | "reset";
} & PropsWithChildren;

export default function Button({
  disabled,
  loading,
  children,
  type,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className="h-10 w-full bg-blue-500 text-white disabled:bg-neutral-400"
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <LoaderCircleIcon className="animate-spin inline" />
      ) : (
        children
      )}
    </button>
  );
}
