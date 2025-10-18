import { User2 } from "lucide-react"
import { PrimaryTextInput } from "./PrimaryTextInput"

export function FullnameInput({ ...props }) {
  return (
    <PrimaryTextInput
      type="text"
      icon={<User2 className="h-4 w-4 text-zinc-500" />}
      placeholder="Full Name"
      autoComplete="name"
      {...props}
    />
  )
}