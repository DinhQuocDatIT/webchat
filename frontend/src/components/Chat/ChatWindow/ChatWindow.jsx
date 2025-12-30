import ChatHeader from "./ChatHeader/ChatHeader";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import styles from "./ChatWindow.module.css";
import { AuthService } from "../../../services/auth.service";
function ChatWindow({ conversation }) {
  const currentUser = AuthService.getUser();
  const friend = conversation.participants.find((p) => p.id !== currentUser.id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatheader}>
        <ChatHeader friend={friend} />
      </div>
      <div className={styles.messageList} >
        <MessageList  conversation={conversation}/>
      </div>
      <div className={styles.messageInput}>
        <MessageInput conversationId={conversation.id} />
      </div>
    </div>
  );
}
export default ChatWindow;
