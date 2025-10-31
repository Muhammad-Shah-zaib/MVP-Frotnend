"use client";

import { useState } from "react";
import { Menu, History, Settings, Phone, ChartBar, Text } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

function MenuButton() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: ChartBar, label: "Voice Chat", href: "/chat" },
    { icon: Text, label: "Text Chat", href: "/text-chat" },
    { icon: History, label: "History", href: "/history" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Phone, label: "Contact", href: "/contact" },
  ];

  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8ecf2] text-[#666] cursor-pointer transition-all duration-200 hover:text-gray-700 hover:scale-95 active:shadow-[inset_0.125rem_0.125rem_0.25rem_rgba(163,177,198,0.6),inset_-0.125rem_-0.125rem_0.25rem_rgba(255,255,255,0.8)]"
          style={{
            boxShadow:
              "0.1875rem 0.1875rem 0.375rem rgba(163, 177, 198, 0.6), -0.1875rem -0.1875rem 0.375rem rgba(255, 255, 255, 0.8)",
          }}
        >
          <Menu className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleMenuClick}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
}

export default MenuButton;
