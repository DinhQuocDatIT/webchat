import Chat from "../../../components/Chat/Chat";
import FriendRequestList from "../../../components/ConTacts/FriendRequestList/FriendRequestList";
import MyFriends from "../../../components/ConTacts/MyFriends/MyFriends";
import styles from "./ChatMain.module.css";
function ChatMain({ leftTab, selectedId, setSelectedId }) {
  if (leftTab === "chat") {
    if (!selectedId ||typeof selectedId === "string") {
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
        {selectedId === "myFriends" && <MyFriends />}
        {selectedId == "groupAndCommunityList" && (
          <div>groupAndCommunityList</div>
        )}
        {selectedId == "friendRequestList" && <FriendRequestList/>}
        {selectedId == "groupAndCommunityInviteList" && (
          <div>groupAndCommunityInviteList</div>
        )}
      </div>
    );
  }
}
export default ChatMain;
