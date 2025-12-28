import { AuthService } from "../../services/auth.service";
import styles from "./Chat.module.css";
import ChatInfoPanel from "./ChatInfoPanel/ChatInfoPanel";
import ChatHeader from "./ChatWindow/ChatHeader/ChatHeader";
import ChatWindow from "./ChatWindow/ChatWindow";
function Chat({ conversation }) {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.ChatWindow}>
        <ChatWindow conversation={conversation}/>
      </div>
      <div className={styles.ChatInfoPanel}>
        <ChatInfoPanel />
      </div>
    </div>
  );
}
export default Chat;
