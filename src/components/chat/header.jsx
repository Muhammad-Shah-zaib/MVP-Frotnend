import { History } from "lucide-react";
import MenuButton from "@/shared/buttons/MenuButton";

function ChatHeader() {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <MenuButton />
      <History className="w-8 h-8 text-primary" />
    </div>
  );
}

export default ChatHeader;
