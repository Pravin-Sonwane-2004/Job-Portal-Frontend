import React, { useEffect, useState } from 'react';
import { IconSend } from '@tabler/icons-react';

import PageWrapper from '../components/PageWrapper';
import {
  getConversation,
  getReceivedMessages,
  getSentMessages,
  sendMessageApi,
} from '../services/jobPortalApi';
import { getUserIdFromJwt } from '../utils/jwtUtils';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = getUserIdFromJwt();

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);

    Promise.all([getSentMessages(userId), getReceivedMessages(userId)])
      .then(([sentResponse, receivedResponse]) => {
        const userIds = new Set();

        sentResponse.data.forEach((message) => userIds.add(message.receiver.id));
        receivedResponse.data.forEach((message) => userIds.add(message.sender.id));

        setConversations(Array.from(userIds));
      })
      .catch(() => {
        setError('Failed to load conversations.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!selectedUser || !userId) {
      return;
    }

    setLoading(true);
    getConversation(userId, selectedUser)
      .then((response) => {
        setMessages(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setError('Failed to load messages.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedUser, userId]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser) {
      return;
    }

    sendMessageApi(userId, selectedUser, newMessage)
      .then(() => {
        setNewMessage('');
        return getConversation(userId, selectedUser);
      })
      .then((response) => {
        setMessages(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setError('Failed to send the message.');
      });
  };

  return (
    <PageWrapper>
      <section className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Messages
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Read conversations and reply without extra UI chrome.
          </p>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Conversations
            </h2>

            {loading ? (
              <div className="text-sm text-slate-600 dark:text-slate-400">Loading...</div>
            ) : conversations.length === 0 ? (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                No conversations yet.
              </div>
            ) : (
              <ul className="space-y-2">
                {conversations.map((uid) => (
                  <li key={uid}>
                    <button
                      type="button"
                      className={`w-full rounded-2xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                        selectedUser === uid
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => setSelectedUser(uid)}
                    >
                      User #{uid}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {selectedUser ? (
              <>
                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Conversation with User #{selectedUser}
                </h2>

                <div className="mb-4 h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  {messages.length === 0 ? (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      No messages yet.
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-3 ${
                          message.sender.id === userId ? 'text-right' : 'text-left'
                        }`}
                      >
                        <span
                          className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                            message.sender.id === userId
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100'
                          }`}
                        >
                          {message.content}
                        </span>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {new Date(message.sentAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSend();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                  >
                    <IconSend size={18} />
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Select a conversation to view messages.
              </div>
            )}
          </section>
        </div>
      </section>
    </PageWrapper>
  );
};

export default MessagesPage;
