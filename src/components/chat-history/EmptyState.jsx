import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <MessageCircle className="w-16 h-16 text-gray-400" />
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          No chat history yet
        </h3>
        <p className="text-sm text-gray-600">
          Start a conversation to see your chat sessions here
        </p>
      </div>
      <Link href="/chat">
        <Button className="mt-2">Start New Chat</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
