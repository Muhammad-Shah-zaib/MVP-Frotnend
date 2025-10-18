"use client"

import { Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function PasswordInput({ label, className, ...props }) {
  const [show, setShow] = useState(false)

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
        <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
          <Lock className="h-4 w-4" />
        </span>

        <Input
          placeholder="Password"
          {...props}
          type={show ? "text" : "password"}
          className={cn(
            "w-full rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 pl-10 pr-10",
            className
          )}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}