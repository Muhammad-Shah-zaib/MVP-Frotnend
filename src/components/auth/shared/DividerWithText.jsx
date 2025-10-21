export function DividerWithText({ text = "OR" }) {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
      <span className="flex-shrink mx-4 text-sm text-zinc-500 dark:text-zinc-400">
        {text}
      </span>
      <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
    </div>
  );
}
