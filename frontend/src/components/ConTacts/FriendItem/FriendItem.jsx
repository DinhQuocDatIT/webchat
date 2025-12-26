import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./FriendItem.module.css";
import avatardefault from "../../../assets/avatar-default.jpg";

function FriendItem({ friend }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.friendInfor}>
        <img
          src={friend.avatar || avatardefault}
          alt={friend.fullName}
          className={styles.avatar}
        />
        <div className={styles.infor}>
          <p className={styles.fullName}>{friend.fullName}</p>
          <p className={styles.phone}>{friend.username}</p>
        </div>
      </div>

      <div className={styles.action}>
        <FontAwesomeIcon icon={faEllipsisVertical} className={styles.icon}/>
      </div>
    </div>
  );
}
export default FriendItem;
