import { AudioWaveform, Text, History, UserPen } from "lucide-react";

export const mainNavigationItems = [
  { icon: AudioWaveform, label: "Voice Chat", href: "/chat" },
  { icon: Text, label: "Text Chat", href: "/text-chat" },
  { icon: History, label: "History", href: "/chat-history" },
];

export const settingsSubItems = [
  { icon: UserPen, label: "Edit Profile", href: "/settings/edit-profile" },
];
