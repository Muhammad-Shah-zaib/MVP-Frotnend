export default function Loading() {
  return (
    <div className="sm:min-w-[400px] max-w-[400px] w-full p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-8">
      <div className="space-y-2 text-center">
        <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-5 bg-zinc-100 dark:bg-zinc-850 rounded-md animate-pulse mx-12" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-24" />
          <div className="h-10 bg-zinc-100 dark:bg-zinc-850 rounded-md animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-32" />
          <div className="h-10 bg-zinc-100 dark:bg-zinc-850 rounded-md animate-pulse" />
        </div>
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
