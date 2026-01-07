import styles from "./MessageList.module.css";
import avatarDefault from "../../../../assets/avatar-default.jpg";
import WebSocketService from "../../../../sockets/WebSocketService";
import { use, useEffect, useState } from "react";
import { getContentConversation } from "../../../../api/conversations";
import { AuthService } from "../../../../services/auth.service";
import Avatar from "../../../Avatar/Avatar";

function MessageList({ conversation }) {
  const currentUser = AuthService.getUser();
  const [contentConversation, setContentConversation] = useState([]);
  // gọi api khi mount
  useEffect(() => {
    const handleAPI = async () => {
      try {
        const res = await getContentConversation(conversation.id);
        setContentConversation(res);
      } catch (err) {
        console.log("Lỗi khi lấy nội dung cuộc trò chuyện");
      }
    };
    if (conversation?.id) {
      handleAPI();
    }
  }, [conversation?.id]);

  // dùng socket khi gửi tin nhắn
  useEffect(() => {
    const sub = WebSocketService.subscribe(
      `/topic/messages/${conversation.id}`,
      (newMessage) => setContentConversation((prev) => [...prev, newMessage])
    );
    return () => sub?.unsubscribe();
  }, [conversation?.id]);
  return (
    <div className={styles.wrapper}>
      {contentConversation.map((message) => {
        if (message.senderId === currentUser.id) {
          return (
            <div className={styles.sender} key={message.id}>
              <div className={styles.messageContent}>
                <p className={styles.content}>{message.content}</p>
                <p className={styles.time}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className={styles.receiver} key={message.id}>
               <Avatar userid ={message.senderId} isFormInfo={true}/>
              <div className={styles.messageContent}>
                <p className={styles.name}>{message.senderName}</p>
                <p className={styles.content}>{message.content}</p>
                <p className={styles.time}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
export default MessageList;
