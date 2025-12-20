import AddFriend from "../../../components/AddFriend/AddFriend";
import ContactsSidebar from "../../../components/ContactsSidebar/ContactsSidebar";
import styles from "./ConversationSidebar.module.css";

function ConversationSidebar({ leftTab, setSelectedId }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AddFriend />
      </div>

      <div className={styles.content}>
        {leftTab === "chat" && (
          <div>1232131</div>
        )}

        {leftTab === "contacts" && (
          <ContactsSidebar onSelect={setSelectedId} />
        )}
      </div>
    </div>
  );
}

export default ConversationSidebar;
