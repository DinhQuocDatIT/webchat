import styles from "./Conversation.module.css";
import { AuthService } from "../../../services/auth.service";
import { useChat } from "../../../contexts/ChatContext";
import Avatar from "../../Avatar/Avatar";
import { useEffect, useState } from "react";
import WebSocketService from "../../../sockets/WebSocketService";
function Conversation({ conversation }) {
  const { setSelectedId } = useChat();
  const [lastMessage, setLastMessage] = useState(conversation.lastMessage);
  const [lastMessageAt, setlastMessageAt] = useState(
    conversation.lastMessageAt
  );
  const currentUser = AuthService.getUser();
  const friend = conversation.participants.find((p) => p.id !== currentUser.id);
  const handleSubmit = () => {
    setSelectedId(conversation);
  };
  useEffect(() => {
    const sub = WebSocketService.subscribe(
      `/topic/messages/${conversation.id}`,
      (data) => {
        setLastMessage(data.content);
        setlastMessageAt(data.createdAt);
      }
    );
    return () => sub?.unsubscribe();
  }, [conversation?.id]);

  return (
    <button className={styles.wrapper} onClick={handleSubmit}>
      <Avatar userid={friend.id} />
      <div className={styles.infroItem}>
        <div className={styles.topRow}>
          <p className={styles.name}>{friend.fullName}</p>
          <p className={styles.time}>
            {new Date(lastMessageAt).toLocaleTimeString()}
          </p>
        </div>
        <p className={styles.lastMessage}>{lastMessage}</p>
      </div>
    </button>
  );
}
export default Conversation;
