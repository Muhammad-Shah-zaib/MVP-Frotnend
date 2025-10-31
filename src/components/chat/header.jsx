import { History } from "lucide-react";
import MenuButton from "@/shared/buttons/MenuButton";

function ChatHeader() {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <MenuButton/>
      <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-200 hover:scale-95 transition-all duration-200">
        <History className="w-7 h-7 text-gray-500" />
      </button>
    </div>
  );
}

export default ChatHeader;
