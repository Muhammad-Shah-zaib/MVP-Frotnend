import { Separator } from "@/components/ui/separator";
import ChatHistorySkeleton from "@/components/chat-history/ChatHistorySkeleton";
import MenuButton from "@/shared/buttons/MenuButton";

export default function Loading() {
  return (
    <section id="chat-history-ctn" className="h-[90vh] w-full p-4 px-6 space-y-4">
      <div className="flex items-center gap-4 text-gray-700">
        <MenuButton />
        <span className="text-3xl font-semibold">Chat History</span>
      </div>

      <Separator />

      <ChatHistorySkeleton />
    </section>
  );
}
