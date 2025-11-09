import ChatComponent from "@/components/chat/ChatComponent";
import ChatHeader from "@/components/chat/header";

async function ChatPage() {
  return (
     <div className="w-full h-full px-2 flex flex-col overflow-hidden">
      <div className="max-w-[400px] w-full flex-shrink-0">
        <ChatHeader />
      </div>

      <div className="flex-1 w-full overflow-hidden">
        <ChatComponent />
      </div>
    </div>
  );
}

export default ChatPage;
