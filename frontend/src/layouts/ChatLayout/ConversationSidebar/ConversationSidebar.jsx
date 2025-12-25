import AddFriend from "../../../components/AddFriend/AddFriend";
import ContactsSidebar from "../../../components/ContactsSidebar/ContactsSidebar";
import ListFriend from "../../../components/ListFriend/ListFriend";
import styles from "./ConversationSidebar.module.css";

function ConversationSidebar({ leftTab, setSelectedId }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AddFriend />
      </div>

      <div className={styles.content}>
        {leftTab === "chat" && (
          <ListFriend/>
        )}

        {leftTab === "contacts" && (
          <ContactsSidebar setSelectedId={setSelectedId}/>
        )}
      </div>
    </div>
  );
}

export default ConversationSidebar;
