import Chat from "../../../components/Chat/Chat";
import FriendRequestList from "../../../components/ConTacts/FriendRequestList/FriendRequestList";
import MyFriends from "../../../components/ConTacts/MyFriends/MyFriends";
import styles from "./ChatMain.module.css";
import { CONTACTS_TAB } from "../../../constants/contactsMenu";
import { useChat } from "../../../contexts/ChatContext";
function ChatMain() {
  const { leftTab, selectedId } = useChat();
  if (leftTab === "chat") {
    if (!selectedId || typeof selectedId === "string") {
      return (
        <div className={styles.wrapper}>
          <div>Chọn 1 cuộn trò chuyện</div>
        </div>
      );
    }
    return (
      <div className={styles.wrapper}>
        <Chat conversation={selectedId} />
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        {selectedId === CONTACTS_TAB.MY_FRIENDS && <MyFriends />}
        {selectedId === CONTACTS_TAB.GROUPS && <div>groupAndCommunityList</div>}
        {selectedId === CONTACTS_TAB.FRIEND_REQUESTS && <FriendRequestList />}
        {selectedId == CONTACTS_TAB.GROUP_INVITES && (
          <div>groupAndCommunityInviteList</div>
        )}
      </div>
    );
  }
}
export default ChatMain;
