import { useState } from "react";

interface ChatProps {
  player: string;
}

export const Chat = ({ player }: ChatProps) => {
  const [chatMessages, setChatMessages] = useState<{ player: string, message: string }[]>([{ player: 'System', message: 'Welcome to the game!' }]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    setChatMessages(prevMessages => [...prevMessages, { player, message: chatInput }]);
    setChatInput('');
  };

  return (
    <div>
      <h2>Game chat:</h2>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            overflow: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {chatMessages.map((msg, index) => (
            <div key={index}>
              <span style={{ fontWeight: 'bold' }}>{msg.player}: </span>
              <span
                style={{
                  background: '#6d6666ff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
              >
                {msg.message}
              </span>
            </div>
          ))}
        </div>
        <div style={{ width: '100%' }}>
          <input
            placeholder="Type your message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />
          <button onClick={handleSendChat}>Send</button>
        </div>
      </div>
    </div>
  );
};
