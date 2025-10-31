import ChatComponent from "@/components/chat/ChatComponent";
import ChatHeader from "@/components/chat/header";

async function ChatPage() {
  return (
    <div className="w-full h-full px-2">
      <div className="max-w-[400px] w-full">
        <ChatHeader />
      </div>

      <div className="h-[80vh] w-full overflow-hidden">
        <ChatComponent />
      </div>
    </div>
  );
}

export default ChatPage;
