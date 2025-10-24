import { ChevronRight } from "lucide-react";
import React from "react";
import BackButton from "./BackButton";
import { getClient } from "@/lib/Supabase/server";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOutAction } from "@/actions/auth/signout";

const SettingsComponent = async () => {
  const supabase = await getClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user);
  if (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <section id="settings-ctn" className="h-full w-full p-4 space-y-4">
      {/* header */}
      <div className="flex items-center gap-4 text-gray-700 ">
        <BackButton />
        <span className="text-3xl font-semibold">Settings</span>
      </div>

      {/* CONTENT */}
      <div className="text-2xl font-bold text-gray-800">
        {user.user_metadata.full_name ? (
          <span>{user.user_metadata.full_name}</span>
        ) : (
          <span>{user.email}</span>
        )}
      </div>

      {/* SEPARATOR */}
      <Separator />

      {/* ACCOUNT SETTINGS */}
      <section id="accounts-settings">
        <div className="text-2xl text-gray-500 my-4">Account Settings</div>

        <div className="flex flex-col gap-4">
          <Link href="/settings/edit-profile" className="w-full text-lg p-2 rounded-lg group hover:bg-gray-200 transition-all duration-300 cursor-pointer flex items-center justify-between">
            Edit Profile
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </Link>
          <div className="w-full text-lg p-2 rounded-lg group hover:bg-gray-200 transition-all duration-300 cursor-pointer flex items-center justify-between">
            Account Details
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-lg p-2 rounded-lg group hover:bg-gray-200 transition-all duration-300 cursor-pointer flex items-center justify-between">
            Subscription
            <span></span>
          </div>
        </div>
      </section>

      {/* SEPERATOR */}
      <Separator />

      {/* MORE */}
      <section id="more">
        <div className="text-2xl text-gray-500 my-4">More</div>

        <div className="flex flex-col gap-4">
          <div className="w-full text-lg py-2 px-1 rounded-lg group hover:bg-gray-200 transition-all cursor-pointer duration-300 flex items-center justify-between">
            About us
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-lg py-2 px-1 rounded-lg group hover:bg-gray-200 transition-all cursor-pointer duration-300 flex items-center justify-between">
            Privacy Policy
            <span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300" />
            </span>
          </div>
          <div className="w-full text-lg py-2 px-1 rounded-lg hover:bg-gray-200 transition-all cursor-pointer duration-300 flex items-center justify-between">
            Term and conditions
            <span></span>
          </div>
        </div>
      </section>

      <Separator />
      {/* Logout button */}
      <form action={signOutAction}>
        <Button type="submit" className="w-full">Logout</Button>
      </form>
    </section>
  );
};

export default SettingsComponent;
