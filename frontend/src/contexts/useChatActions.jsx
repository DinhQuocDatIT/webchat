import { getConversationsById } from "../api/conversations";
import { useChat } from "./ChatContext";

export function useChatActions() {
  const { setLeftTab, setSelectedId } = useChat();

  const startChatWithUser = async (userId) => {
    try {
      const conversation = await getConversationsById(userId);
      if (!conversation) return;
      setLeftTab("chat");
      setSelectedId(conversation);
    } catch (error) {
      console.log("Lỗi khi mở cuộc trò chuyện", error);
    }
  };

  return { startChatWithUser };
}
