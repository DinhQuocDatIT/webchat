import { useEffect, useState } from "react";
import avatardefault from "../../../../assets/avatar-default.jpg";
import styles from "./ChatHeader.module.css";
import WebSocketService from "../../../../sockets/WebSocketService";
import Avatar from "../../../Avatar/Avatar";

function ChatHeader({ friend }) {
  const [statusFriend, setStatusFriend] = useState(friend.status);

  // luôn sync khi friend object thay đổi
  useEffect(() => {
    setStatusFriend(friend.status);
  }, [friend]);

  useEffect(() => {
    const sub = WebSocketService.subscribe(
      `/topic/active/${friend.username}`,
      (data) => setStatusFriend(data.status)
    );

    return () => sub?.unsubscribe();
  }, [friend.username]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.friendInfor}>
        <Avatar userid={friend.id} isFormInfo={true} />
        <div className={styles.infor}>
          <p className={styles.name}>{friend.fullName}</p>
          {statusFriend === "ONLINE" ? (
            <p className={styles.online}>Đang hoạt động</p>
          ) : (
            <p className={styles.offline}>Ngoại tuyến</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
