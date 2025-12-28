import Chat from "../../../components/Chat/Chat";
import MyFriends from "../../../components/ConTacts/MyFriends/MyFriends";
import styles from "./ChatMain.module.css";
function ChatMain({ leftTab, selectedId }) {
  if (leftTab === "chat") {
    if (!selectedId ||selectedId ===null) {
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
        {selectedId == "friendRequestList" && <div>friendRequestList</div>}
        {selectedId == "groupAndCommunityInviteList" && (
          <div>groupAndCommunityInviteList</div>
        )}
      </div>
    );
  }
}
export default ChatMain;
