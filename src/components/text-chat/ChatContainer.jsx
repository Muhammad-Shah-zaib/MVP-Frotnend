import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import SendQuery from './SendQuery';

const ChatContainer = () => {
  // OpenAI-compatible message structure
const messages = [
  {
    role: "assistant",
    content: "Hello there! 👋 I'm your AI art assistant. What would you like to explore today — art history, techniques, or famous artists?"
  },
  {
    role: "user",
    content: "Can you tell me about the Renaissance period?"
  },
  {
    role: "assistant",
    content: "The **Renaissance** was a cultural movement that began in Italy during the 14th century and spread across Europe through the 17th century. It represented a *rebirth* of art, science, and humanism, inspired by the study of classical Greek and Roman culture.\n\n**Key characteristics:**\n- Emphasis on humanism and individual potential\n- Realistic perspective and anatomy in art\n- Revived interest in classical architecture and philosophy\n- Major advances in science, printing, and exploration"
  },
  {
    role: "user",
    content: "Who were some of the most famous Renaissance artists?"
  },
  {
    role: "assistant",
    content: "Some of the most renowned Renaissance artists include:\n\n1. **Leonardo da Vinci** – *Mona Lisa*, *The Last Supper*\n2. **Michelangelo** – *David*, Sistine Chapel ceiling\n3. **Raphael** – *The School of Athens*\n4. **Sandro Botticelli** – *The Birth of Venus*\n5. **Donatello** – *David* (bronze sculpture)\n6. **Titian** – Venetian master known for vivid color and expressive brushwork"
  },
  {
    role: "user",
    content: "How do I analyze a painting?"
  },
  {
    role: "assistant",
    content: "Here's a structured approach to analyzing a painting:\n\n1. **First Impression** – What feeling or idea strikes you immediately?\n2. **Subject Matter** – What is shown? People, objects, symbols, landscape?\n3. **Composition** – How are elements arranged? Symmetry? Balance?\n4. **Color & Light** – Warm vs. cool tones? Highlights and shadows?\n5. **Brushwork** – Smooth, rough, or expressive textures?\n6. **Context** – When and why was it made? What was happening culturally?\n7. **Artist's Intent** – What message or emotion might the artist convey?\n\nTake your time to observe — the more you look, the more you’ll discover. 🎨"
  }
];

  const renderMessage = (message, index) => {
    if (message.role === 'user') {
      return <UserMessage key={index} content={message.content} />;
    } else if (message.role === 'assistant') {
      return <AssistantMessage key={index} content={message.content} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full relative " style={{overflow: "auto"}}>
      <div className="flex-1 space-y-2">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>

      <div className='fixed bottom-0 left-0 w-full bg-white shadow-[0_-10px_20px_rgba(255,255,255,0.8)]'>
          <SendQuery />
      </div>
    </div>
  );
};

export default ChatContainer;