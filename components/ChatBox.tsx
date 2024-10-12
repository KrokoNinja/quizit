'use client';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import Message from './Message';

type Message = {
  message: string;
  user: string;
};

interface ChatBoxProps {
  username: string;
  roomId?: string;
}

const ChatBox = ({ username, roomId }: ChatBoxProps) => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState<Message>({
    message: '',
    user: '',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      setSocketId(socket.id);
    });
    socket.on('receiveMessage', (data: { message: string; user: string }) => {
      setReceivedMessage(data);
    });

    socket.emit('joinRoom', { roomId: `${roomId}` });
  });

  useEffect(() => {
    setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('sendMessage', {
      message,
      user: username,
      roomId: `${roomId}`,
    });
    setMessages((prev) => [...prev, { message, user: username }]);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Send message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <div className="overflow-y-scroll">
        Your messages
        {messages.map((data, i) => {
          if (data.message != '' && data.user != '') {
            return (
              <Message
                key={i}
                message={data.message}
                username={data.user}
                currentUser={username}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatBox;
