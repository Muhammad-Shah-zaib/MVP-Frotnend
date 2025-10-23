import ChatHeader from "@/components/chat/header";
import TextChatComponent from "@/components/text-chat/TextChatComponent";

async function ChatPage() {
  return (
    <div className="w-full h-full px-2">
      <div className="max-w-[400px] w-full">
        <ChatHeader />
      </div>

      <div className="h-[90vh] w-full overflow-hidden">
        <TextChatComponent />
      </div>
    </div>
  );
}

export default ChatPage;
