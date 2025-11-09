"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user/userStore";

export default function UserInitializer({ user }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
