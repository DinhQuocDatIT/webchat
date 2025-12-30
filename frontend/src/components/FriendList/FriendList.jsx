import styles from "./FriendList.module.css";
import avatardefault from "../../assets/avatar-default.jpg";
import { useEffect, useState, useCallback } from "react";
import { getFriend } from "../../api/friends";
import webSocketService from "../../sockets/WebSocketService";
import { AuthService } from "../../services/auth.service";
import { getConversations } from "../../api/conversations";
import Conversation from "../Conversation/Conversation";
function FriendList({setSelectedId}) {
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
          <Conversation conversation={conversation} setSelectedId={setSelectedId}/>
        </div>
      ))}
    </div>
  );
}

export default FriendList;
