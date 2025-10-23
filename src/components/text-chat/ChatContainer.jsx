import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import SendQuery from './SendQuery';

const ChatContainer = () => {
  // OpenAI-compatible message structure
  const messages = [
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?'
    },
    {
      role: 'user',
      content: 'Can you help me with some questions about art?'
    },
    {
      role: 'assistant',
      content: 'Of course! I\'d be happy to help you with any art-related questions. Whether you\'re interested in art history, techniques, famous artists, or art analysis, I\'m here to assist you. What would you like to know?'
    },
    {
      role: 'user',
      content: 'What can you tell me about the Renaissance period?'
    },
    {
      role: 'assistant',
      content: 'The Renaissance was a cultural movement that spanned roughly from the 14th to the 17th century, beginning in Italy in the Late Middle Ages. It marked a period of "rebirth" in art, architecture, politics, science, and literature. Key characteristics include humanism, perspective in painting, and classical influences from Greek and Roman culture.'
    },
    {
      role: 'user',
      content: 'Who were some of the most famous Renaissance artists?'
    },
    {
      role: 'assistant',
      content: 'Some of the most renowned Renaissance artists include:\n\n• Leonardo da Vinci - Known for the Mona Lisa and The Last Supper\n• Michelangelo - Famous for the Sistine Chapel ceiling and David sculpture\n• Raphael - Master of harmony and grace in paintings like School of Athens\n• Sandro Botticelli - Creator of The Birth of Venus\n• Donatello - Pioneer of Renaissance sculpture\n• Titian - Venetian master of color and brushwork'
    },
    {
      role: 'user',
      content: 'Can you explain the technique of chiaroscuro?'
    },
    {
      role: 'assistant',
      content: 'Chiaroscuro is an art technique that uses strong contrasts between light and dark to create dramatic, three-dimensional effects. The term comes from Italian words "chiaro" (light) and "scuro" (dark). This technique was perfected during the Renaissance and Baroque periods by artists like Caravaggio, Rembrandt, and Georges de La Tour. It helps create mood, emphasize form, and guide the viewer\'s attention to focal points in the composition.'
    },
    {
      role: 'user',
      content: 'What about modern art movements?'
    },
    {
      role: 'assistant',
      content: 'Modern art encompasses many revolutionary movements from the late 19th to mid-20th century:\n\n• Impressionism - Focus on light and color (Monet, Renoir)\n• Post-Impressionism - Emotional and symbolic content (Van Gogh, Cézanne)\n• Cubism - Geometric abstraction (Picasso, Braque)\n• Surrealism - Dreams and subconscious (Dalí, Magritte)\n• Abstract Expressionism - Pure emotion and gesture (Pollock, Rothko)\n• Pop Art - Popular culture themes (Warhol, Lichtenstein)\n\nEach movement challenged traditional artistic conventions and explored new ways of seeing and representing reality.'
    },
    {
      role: 'user',
      content: 'How do I analyze a painting?'
    },
    {
      role: 'assistant',
      content: 'Here\'s a systematic approach to analyzing a painting:\n\n1. **First Impression** - Note your immediate emotional response\n2. **Subject Matter** - What is depicted? People, landscapes, objects?\n3. **Composition** - How are elements arranged? Rule of thirds, symmetry?\n4. **Color** - What palette is used? Warm/cool colors? Symbolic meanings?\n5. **Light and Shadow** - How does lighting affect mood and form?\n6. **Brushwork** - Smooth or textured? Visible or hidden brushstrokes?\n7. **Historical Context** - When was it made? What was happening then?\n8. **Artist\'s Intent** - What message or feeling was the artist conveying?\n\nTake your time with each element and consider how they work together to create the overall impact.'
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