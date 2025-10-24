import React, { useContext, useEffect, useState, useRef } from "react";
import useAuth from "../Hooks/useAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { SocketContext } from "../Provider/SocketProvider";
import { useLocation } from "react-router";
import NoDataFound from "./NoDataFound";

const Chat = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { socket, onlineUsers } = useContext(SocketContext);
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [emailSearchLoading, setEmailSearchLoading] = useState(false);
  const [conversationSearchQuery, setConversationSearchQuery] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // 🔹 Fetch Users & Conversations
  useEffect(() => {
    if (user?.email) {
      fetchUsers();
      fetchConversations();

      // Check if we need to start chat with a specific user (from article)
      if (location.state?.chatWithEmail) {
        startChatWithEmail(location.state.chatWithEmail);
      }
    }
  }, [user, location.state]);

  // 🔹 Socket Listeners
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (message) => {
        setMessages((prev) => [...prev, message]);
        // 🔹 Update lastMessageTime to reorder conversation
        updateConversationTime(message.conversationId);
      });

      socket.on("message_sent", (message) => {
        setMessages((prev) => [...prev, message]);
        updateConversationTime(message.conversationId);
      });

      socket.on("user_typing", (data) => {
        if (selectedUser && data.sender === selectedUser.email) setIsTyping(true);
      });

      socket.on("user_stop_typing", (data) => {
        if (selectedUser && data.sender === selectedUser.email) setIsTyping(false);
      });

      return () => {
        socket.off("receive_message");
        socket.off("message_sent");
        socket.off("user_typing");
        socket.off("user_stop_typing");
      };
    }
  }, [socket, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await axiosSecure.get("/conversations");
      // 🔹 Sort by latest message time
      const sorted = res.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setConversations(sorted);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const updateConversationTime = (conversationId) => {
    setConversations((prev) =>
      prev
        .map((conv) =>
          conv._id === conversationId
            ? { ...conv, updatedAt: new Date().toISOString() }
            : conv
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
  };

  const handleUserSelect = async (chatUser) => {
    setSelectedUser(chatUser);

    let conversation = conversations.find(
      (conv) =>
        conv.participants.includes(chatUser.email) &&
        conv.participants.includes(user.email)
    );

    if (!conversation) {
      try {
        const res = await axiosSecure.post("/conversations", {
          participants: [user.email, chatUser.email],
        });
        conversation = res.data;
        setConversations((prev) =>
          [...prev, conversation].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
      } catch (error) {
        console.error("Error creating conversation:", error);
        return;
      }
    }

    setCurrentConversation(conversation);
    fetchMessages(conversation._id);
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await axiosSecure.get(`/messages/${conversationId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const startChatWithEmail = async (email) => {
    try {
      // Find user by email
      let targetUser = users.find(u => u.email === email);
      
      if (!targetUser) {
        // Fetch user details from backend
        const response = await axiosSecure.get(`/user/${email}`);
        targetUser = response.data;
        // Add to users list if not already there
        if (targetUser && !users.find(u => u.email === email)) {
          setUsers(prev => [...prev, targetUser]);
        }
      }
      
      if (targetUser) {
        handleUserSelect(targetUser);
      }
    } catch (error) {
      console.error('Error starting chat with email:', error);
      alert('User not found!');
    }
  };

  const handleEmailSearch = async () => {
    if (!emailInput.trim()) return;
    
    setEmailSearchLoading(true);
    try {
      await startChatWithEmail(emailInput.trim());
      setEmailInput('');
    } catch (error) {
      console.error('Error searching user:', error);
    } finally {
      setEmailSearchLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !currentConversation) return;

    socket.emit("send_message", {
      conversationId: currentConversation._id,
      sender: user.email,
      receiver: selectedUser.email,
      message: newMessage,
      senderName: user.displayName || "Anonymous",
      senderPhoto: user.photoURL || "",
    });

    setNewMessage("");
    handleStopTyping();
  };

  const handleTyping = () => {
    if (!socket || !selectedUser) return;

    socket.emit("typing", {
      sender: user.email,
      receiver: selectedUser.email,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 3000);
  };

  const handleStopTyping = () => {
    if (!socket || !selectedUser) return;
    socket.emit("stop_typing", {
      sender: user.email,
      receiver: selectedUser.email,
    });
  };

  const isUserOnline = (email) => onlineUsers.includes(email);

  const getUserFromConversation = (conv) => {
    return users.find((u) => u.email !== user.email && conv.participants.includes(u.email));
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) => {
    const chatUser = getUserFromConversation(conv);
    if (!chatUser) return false;
    
    const searchLower = conversationSearchQuery.toLowerCase();
    const displayName = (chatUser.displayName || chatUser.email).toLowerCase();
    const email = chatUser.email.toLowerCase();
    
    return displayName.includes(searchLower) || email.includes(searchLower);
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="h-[calc(100vh-200px)] flex bg-base-200 rounded-lg shadow-2xl overflow-hidden">
      {/* 🔹 Conversations List */}
      <div className="w-full md:w-1/3 bg-base-100 border-r border-base-300 overflow-y-auto">
        <div className="p-4 border-b border-base-300 bg-base-200 sticky top-0 z-10">
          <h3 className="text-xl font-bold">💬 Chats</h3>
          <p className="text-sm text-gray-500 mb-3">{onlineUsers.length} online</p>
          
          {/* Add New Chat by Email */}
          <div className="mb-3">
            <label className="text-xs font-semibold text-base-content/70 mb-1 block">Start New Chat</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailSearch()}
                placeholder="Enter email to chat..."
                className="input input-bordered input-sm flex-1"
              />
              <button
                onClick={handleEmailSearch}
                disabled={emailSearchLoading}
                className="btn btn-sm btn-primary"
              >
                {emailSearchLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Add'}
              </button>
            </div>
          </div>

          {/* Search Existing Conversations */}
          {conversations.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-base-content/70 mb-1 block">Search Conversations</label>
              <div className="relative">
                <input
                  type="text"
                  value={conversationSearchQuery}
                  onChange={(e) => setConversationSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="input input-bordered input-sm w-full pl-9"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/40" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {conversationSearchQuery && (
                  <button
                    onClick={() => setConversationSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {conversations.length === 0 ? (
          <div className="p-4">
            <NoDataFound 
              message="No Conversations Yet" 
              description="Add a user by email above to start chatting!"
            />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4">
            <NoDataFound 
              message="No Results Found" 
              description={`No conversations match "${conversationSearchQuery}"`}
            />
          </div>
        ) : (
          <div className="divide-y divide-base-300">
            {filteredConversations.map((conv) => {
              const chatUser = getUserFromConversation(conv);
              if (!chatUser) return null;
              return (
                <div
                  key={conv._id}
                  onClick={() => handleUserSelect(chatUser)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-base-200 ${
                    selectedUser?.email === chatUser.email ? "bg-base-200 border-l-4 border-primary" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`avatar ${
                        isUserOnline(chatUser.email)
                          ? "ring ring-success ring-offset-base-100 ring-offset-2"
                          : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full">
                        {chatUser.photoURL ? (
                          <img src={chatUser.photoURL} alt={chatUser.displayName} />
                        ) : (
                          <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full rounded-full text-lg">
                            {chatUser.displayName?.[0] || chatUser.email[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {chatUser.displayName || chatUser.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {chatUser.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isUserOnline(chatUser.email) ? "🟢 Online" : "⚪ Offline"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🔹 Chat Window */}
      <div className="flex-1 flex flex-col bg-base-100">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-base-300 bg-base-200 flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  {selectedUser.photoURL ? (
                    <img src={selectedUser.photoURL} alt={selectedUser.displayName} />
                  ) : (
                    <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full rounded-full text-lg">
                      {selectedUser.displayName?.[0] || selectedUser.email[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold">{selectedUser.displayName || selectedUser.email}</p>
                <p className="text-xs text-gray-500">
                  {isUserOnline(selectedUser.email) ? "🟢 Online" : "⚪ Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-base-100 to-base-200">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat ${msg.sender === user.email ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {msg.senderPhoto ? (
                        <img src={msg.senderPhoto} alt={msg.senderName} />
                      ) : (
                        <div className="bg-primary text-primary-content w-10 h-10 flex items-center justify-center rounded-full">
                          {msg.senderName?.[0] || "A"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="chat-header text-sm mb-1">
                    {msg.senderName}
                    <time className="text-xs opacity-50 ml-2">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || new Date().toLocaleTimeString()} 
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.sender === user.email ? "chat-bubble-primary" : "bg-base-300"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat chat-start">
                  <div className="chat-bubble bg-base-300">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-base-200 border-t border-base-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Type your message..."
                  className="input input-bordered flex-1 rounded-full"
                />
                <button type="submit" className="btn btn-primary rounded-full px-5">
                  ➤
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mb-4 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
