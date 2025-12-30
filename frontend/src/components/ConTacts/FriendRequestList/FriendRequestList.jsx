import HeaderConTacts from "../HeaderConTacts/HeaderConTacts";
import styles from "./FriendRequestList.module.css";
import IncomingFriendRequests from "./IncomingFriendRequests/IncomingFriendRequests";
import OutgoingFriendRequests from "./OutgoingFriendRequests/OutgoingFriendRequests";
function FriendRequestList() {
  return (
    <div className={styles.wrapper}>
      <HeaderConTacts title={"Lời mời kết bạn"} />
      <div className={styles.content}>
        <div className={styles.incoming}>
          <IncomingFriendRequests />
        </div>
        <div className={styles.outgoing}>
          <OutgoingFriendRequests />
        </div>
      </div>
    </div>
  );
}
export default FriendRequestList;
