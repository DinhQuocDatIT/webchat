import styles from "./ChatLayout.module.css";
import ChatMain from "./ChatMain/ChatMain";
import ConversationSidebar from "./ConversationSidebar/ConversationSidebar";
import SideNavigation from "./SideNavigation/SideNavigation";

function ChatLayout({ leftTab, setLeftTab, selectedId, setSelectedId,selectedIdMain,setSelectedIdMain }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideNavigation}>
        <SideNavigation
          leftTab={leftTab}
          setLeftTab={setLeftTab}
        />
      </div>

      <div className={styles.conversationSidebar}>
        <ConversationSidebar
          leftTab={leftTab}
          setSelectedId={setSelectedId}
        />
      </div>

      <div className={styles.chatMain}>
        <ChatMain
          leftTab={leftTab}
          selectedId={selectedId}
        />
      </div>
    </div>
  );
}


export default ChatLayout;
