import { History } from "lucide-react";
import MenuButton from "@/shared/buttons/MenuButton";

function ChatHeader() {
  return (
    <div className="flex items-center justify-between w-full px-2 py-4">
      <MenuButton />
      {/* ArtSensei */}
      <h1 className="text-3xl text-primary">ArtSensei</h1>

      <div className="w-10 h-10"></div>
      {/* <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8ecf2] text-[#666] cursor-pointer transition-all duration-200 hover:text-gray-700 hover:scale-95 active:shadow-[inset_0.125rem_0.125rem_0.25rem_rgba(163,177,198,0.6),inset_-0.125rem_-0.125rem_0.25rem_rgba(255,255,255,0.8)]"
        style={{
          boxShadow:
            "0.1875rem 0.1875rem 0.375rem rgba(163, 177, 198, 0.6), -0.1875rem -0.1875rem 0.375rem rgba(255, 255, 255, 0.8)",
        }}
      >
        <History className="w-5 h-5" />
      </button> */}
    </div>
  );
}

export default ChatHeader;
