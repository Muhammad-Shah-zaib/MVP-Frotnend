"use client";

import { Menu } from "lucide-react";
import { useNavStore } from "@/store";

function MenuButton() {
  const { openNavBar } = useNavStore();

  return (
    <button
      onClick={openNavBar}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8ecf2] text-[#666] cursor-pointer transition-all duration-200 hover:text-gray-700 hover:scale-95 active:shadow-[inset_0.125rem_0.125rem_0.25rem_rgba(163,177,198,0.6),inset_-0.125rem_-0.125rem_0.25rem_rgba(255,255,255,0.8)]"
      style={{
        boxShadow:
          "0.1875rem 0.1875rem 0.375rem rgba(163, 177, 198, 0.6), -0.1875rem -0.1875rem 0.375rem rgba(255, 255, 255, 0.8)",
      }}
      aria-label="Open navigation menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

export default MenuButton;
