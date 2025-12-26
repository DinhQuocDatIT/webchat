import { useEffect, useState } from "react";
import ListFriend from "../../ListFriend/ListFriend";
import HeaderConTacts from "../HeaderConTacts/HeaderConTacts";
import styles from "./MyFriends.module.css";
import { getFriend } from "../../../api/friends";
import FriendItem from "../FriendItem/FriendItem.jsx";

function MyFriends() {
  const [myfriend, setMyFriends] = useState([]);

  useEffect(() => {
    const handleGetMyFriends = async () => {
      try {
        const res = await getFriend();
        setMyFriends(res);
      } catch (err) {
        console.log("Lỗi khi lấy danh sách bạn bè", err);
      }
    };
    handleGetMyFriends();
  }, []);

  return (
    <div className={styles.wrapper}>
      <HeaderConTacts title="Danh sách bạn bè" />
      <div className={styles.content}>
        {myfriend.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}

export default MyFriends;
