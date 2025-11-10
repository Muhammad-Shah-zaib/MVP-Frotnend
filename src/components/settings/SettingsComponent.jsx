import { ChevronRight, Settings, MoreHorizontal, KeyRound } from "lucide-react";
import React from "react";
import BackButton from "./BackButton";
import { getClient } from "@/lib/Supabase/server";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOutAction } from "@/actions/auth/signout";
import ProfileImage from "./ProfileImage";

const SettingsComponent = async () => {
  const supabase = await getClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
  }

  const { profile_image, full_name } = user?.user_metadata || {};

  return (
    <section id="settings-ctn" className="h-[90vh] w-full p-4 px-6 space-y-4">
      {/* header */}
      <div className="flex items-center gap-4 text-gray-700 ">
        <BackButton />
        <span className="text-3xl font-semibold">Settings</span>
      </div>

      {/* SEPARATOR */}
      <Separator />

      {/* ACCOUNT SETTINGS */}
      <section id="accounts-settings">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 my-4">
          <span>Account Settings</span>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/settings/edit-profile"
            className="w-full px-4 py-2 rounded-xl bg-white group hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between"
          >
            <ProfileImage
              profile_image={profile_image}
              full_name={full_name}
              email={user?.email}
            />
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </Link>
          <div className="w-full text-base px-4 py-2 rounded-xl bg-white group hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3">
              <KeyRound className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
              <span className="text-sm text-gray-800">Change Password</span>
            </div>
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-base px-4 py-2 rounded-xl bg-white group hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between">
            Subscription
            <span></span>
          </div>
        </div>
      </section>

      {/* SEPERATOR */}
      <Separator />

      {/* MORE */}
      <section id="more">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 my-4">
          <span>More</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-full text-base px-4 py-2 rounded-xl bg-white group hover:shadow-md transition-all cursor-pointer duration-300 flex items-center justify-between">
            About us
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-base px-4 py-2 rounded-xl bg-white group hover:shadow-md transition-all cursor-pointer duration-300 flex items-center justify-between">
            Privacy Policy
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-base px-4 py-2 rounded-xl bg-white hover:shadow-md transition-all cursor-pointer duration-300 flex items-center justify-between">
            Term and conditions
            <span></span>
          </div>
        </div>
      </section>

      <Separator />
      {/* Logout button */}
      <form action={signOutAction}>
        <Button type="submit" className="w-full">
          Logout
        </Button>
      </form>
    </section>
  );
};

export default SettingsComponent;
