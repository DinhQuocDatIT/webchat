import styles from "./FriendList.module.css";
import { useEffect, useState, useCallback } from "react";
import { getConversations } from "../../api/conversations";
import Conversation from "./Conversation/Conversation";
function FriendList() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const handleGetConversation = async () => {
      try {
        const res = await getConversations();
        setConversations(res);
      } catch (err) {
        console.log("Lỗi khi lấy danh sách cuộc trò chuyện", err);
      }
    };
    handleGetConversation();
  }, []);
  return (
    <div className={styles.wrapper}>
      {conversations.map((conversation) => (
        <div key={conversation.id} className={styles.item}>
          <Conversation conversation={conversation} />
        </div>
      ))}
    </div>
  );
}

export default FriendList;
