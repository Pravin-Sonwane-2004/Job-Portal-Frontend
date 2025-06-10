import React, { useEffect, useState } from 'react';
import { IconSend } from '@tabler/icons-react';
import { getSentMessages, getReceivedMessages, getConversation, sendMessageApi } from '../all services/getJfBackendService';
import { getUserIdFromJwt } from '../utils/jwtUtils';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user info from JWT
  const userId = getUserIdFromJwt();

  // Fetch conversations (users you have messaged or received from)
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    Promise.all([
      getSentMessages(userId),
      getReceivedMessages(userId)
    ])
      .then(([sentRes, receivedRes]) => {
        // Get unique user IDs from sent and received messages
        const users = new Set();
        sentRes.data.forEach(msg => users.add(msg.receiver.id));
        receivedRes.data.forEach(msg => users.add(msg.sender.id));
        setConversations(Array.from(users));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load conversations');
        setLoading(false);
      });
  }, [userId]);

  // Fetch messages in a conversation
  useEffect(() => {
    if (!selectedUser || !userId) return;
    setLoading(true);
    getConversation(userId, selectedUser)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load messages');
        setLoading(false);
      });
  }, [selectedUser, userId]);

  // Send a new message
  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser) return;
    sendMessageApi(userId, selectedUser, newMessage)
      .then(() => {
        setNewMessage('');
        // Refresh messages
        getConversation(userId, selectedUser).then(res => setMessages(res.data));
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-8">
        {/* Conversation List */}
        <div className="w-1/4 border-r pr-4">
          <h3 className="font-semibold mb-2">Conversations</h3>
          {loading ? <div>Loading...</div> : (
            <ul>
              {conversations.length === 0 && <li>No conversations yet.</li>}
              {conversations.map(uid => (
                <li key={uid}>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${selectedUser === uid ? 'bg-bright-sun-200' : 'hover:bg-masala-900'}`}
                    onClick={() => setSelectedUser(uid)}
                  >
                    User #{uid}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Message List */}
        <div className="flex-1">
          {selectedUser ? (
            <>
              <div className="mb-2 font-semibold">Conversation with User #{selectedUser}</div>
              <div className="h-64 overflow-y-auto border rounded p-2 bg-masala-900 mb-2">
                {messages.length === 0 ? <div>No messages yet.</div> : (
                  messages.map(msg => (
                    <div key={msg.id} className={`mb-2 ${msg.sender.id === userId ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block px-3 py-1 rounded ${msg.sender.id === userId ? 'bg-bright-sun-400 text-black' : 'bg-masala-700 text-white'}`}>
                        {msg.content}
                      </span>
                      <div className="text-xs text-gray-400">{new Date(msg.sentAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded px-2 py-1"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <button onClick={handleSend} className="bg-bright-sun-400 px-4 py-1 rounded text-black flex items-center gap-1 font-semibold">
                  <IconSend size={18} /> Send
                </button>
              </div>
            </>
          ) : (
            <div>Select a conversation to view messages.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
