import MyFriends from "../../../components/ConTacts/MyFriends/MyFriends";
import styles from "./ChatMain.module.css";
function ChatMain({ leftTab, selectedId }) {
  if (leftTab === "chat") {
    return <div className={styles.wrapper}>123123</div>;
  } else {
    return (
      <div className={styles.wrapper}>
        {selectedId === "myFriends" && <MyFriends/>}
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
