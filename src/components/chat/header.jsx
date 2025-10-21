import { History } from "lucide-react";
import MenuButton from "@/shared/buttons/MenuButton";

function ChatHeader() {
  return (
    <div className="flex justify-between w-full px-4 py-2">
      <MenuButton />
      <History className="w-8 h-8 text-primary" />
    </div>
  )
}

export default ChatHeader