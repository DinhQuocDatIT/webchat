import AddFriend from "../../../components/AddFriend/AddFriend";
import ContactsSidebar from "../../../components/ContactsSidebar/ContactsSidebar";
import FriendList from "../../../components/FriendList/FriendList";
import { useChat } from "../../../contexts/ChatContext";

import styles from "./ConversationSidebar.module.css";

function ConversationSidebar() {
  const { leftTab } = useChat();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AddFriend />
      </div>

      <div className={styles.content}>
        {leftTab === "chat" && <FriendList />}

        {leftTab === "contacts" && <ContactsSidebar />}
      </div>
    </div>
  );
}

export default ConversationSidebar;
