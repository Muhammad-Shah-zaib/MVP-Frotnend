import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function PrimaryTextInput({
  icon,
  label,
  className,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
            {icon}
          </span>
        )}
        <Input
          {...props}
          className={cn(
            "w-full rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400",
            icon ? "pl-10" : "",
            className
          )}
        />
      </div>
    </div>
  )
}