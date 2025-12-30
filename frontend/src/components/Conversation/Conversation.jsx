import styles from "./Conversation.module.css";
import avatardefault from "../../assets/avatar-default.jpg";
import { AuthService } from "../../services/auth.service";
function Conversation({ conversation, setSelectedId }) {
  const currentUser = AuthService.getUser();
  const friend = conversation.participants.find((p) => p.id !== currentUser.id);
  const handleSubmit = () => {
    setSelectedId(conversation);
  };
  return (
    <button className={styles.wrapper} onClick={handleSubmit}>
      <img
        src={friend.avatar || avatardefault}
        alt={friend.fullName}
        className={styles.avatar}
      />
      <div className={styles.infroItem}>
        <p className={styles.name}>{friend.fullName}</p>
        {new Date(conversation.lastMessageAt).toLocaleTimeString()}
      </div>
    </button>
  );
}
export default Conversation;
