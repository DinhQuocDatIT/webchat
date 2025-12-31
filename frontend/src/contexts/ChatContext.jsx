import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);
export function ChatProvider({ children }) {
  const [leftTab, setLeftTab] = useState("chat");
  const [selectedId, setSelectedId] = useState(null);
  return (
    <ChatContext.Provider
      value={{
        leftTab,
        setLeftTab,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
export function useChat() {
  return useContext(ChatContext);
}
