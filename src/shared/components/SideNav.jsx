"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, ChevronDown, X, LogOut, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavStore } from "@/store";
import ProfileImage from "./ProfileImage";
import { mainNavigationItems, settingsSubItems } from "@/store/navStore/navigationItems";

const SideNav = ({ user }) => {
  const { profile_image, full_name, email } = user.user_metadata || {};
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isOpen, closeNavBar } = useNavStore();

  return (
    <div className="">
      <div
        className={`fixed w-screen h-screen z-[100] bg-black/30 top-0 left-0 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeNavBar}
      />
      
      <div
        className={`fixed z-[1000] top-0 left-0 w-[280px] h-full bg-[#e8ecf2] shadow-xl shadow-black flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button className="p-2 hover:bg-white/60 rounded-lg transition-all duration-200" onClick={closeNavBar}>
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <ProfileImage profile_image={profile_image} full_name={full_name} email={email} />

        <div className="px-4">
          <Separator className="bg-gray-300" />
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h4 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main
              </h4>
              <div className="flex flex-col space-y-1">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeNavBar}
                    className="flex items-center gap-4 px-4 py-3 text-gray-700 rounded-lg hover:bg-white/60 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Settings
              </h4>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center w-full">
                  <Link
                    href="/settings"
                    onClick={closeNavBar}
                    className="flex items-center gap-4 px-4 py-3 text-gray-700 rounded-lg hover:bg-white/60 transition-all duration-200 flex-1"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="p-2 ml-2 rounded-lg hover:bg-white/60 transition-all duration-200"
                    type="button"
                    aria-label="Expand settings sub-items"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300`}
                      style={{ transform: settingsOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)' }}
                    />
                  </button>
                </div>

                <div
                  className={`ml-6 flex flex-col space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    settingsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {settingsSubItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeNavBar}
                      className="flex items-center gap-4 px-4 py-3 text-gray-600 rounded-lg hover:bg-white/60 transition-all duration-200"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-6">
            <Link
              href="/help"
              onClick={closeNavBar}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-white/60 transition-all duration-200"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Help</span>
            </Link>
            <button
              onClick={() => {
                closeNavBar();
              }}
              className="flex items-center gap-3 px-4 py-3 text-red-400 rounded-lg hover:bg-white/60 transition-all duration-200"
              type="button"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;