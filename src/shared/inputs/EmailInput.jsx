import { Mail } from "lucide-react"
import { PrimaryTextInput } from "./PrimaryTextInput"

export function EmailInput({ ...props }) {
  return (
    <PrimaryTextInput
      type="text"
      icon={<Mail className="h-4 w-4 text-zinc-500" />}
      placeholder="Email"
      autoComplete="email"
      {...props}
    />
  )
}