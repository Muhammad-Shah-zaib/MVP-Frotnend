"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PrimaryButton({ className, children, ...props }) {
  return (
    <Button
      className={cn(
        " bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}