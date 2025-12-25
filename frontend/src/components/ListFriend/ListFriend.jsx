import styles from "./ListFriend.module.css";
import avatardefault from "../../assets/avatar-default.jpg";
import { useEffect, useState, useCallback } from "react";
import { getFriend } from "../../api/friends";
import webSocketService from "../../sockets/WebSocketService";
import { AuthService } from "../../services/auth.service";
function ListFriend() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  // Hàm cập nhật status của bạn bè
  const updateFriendStatus = useCallback((username, status) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.username === username ? { ...friend, status } : friend
      )
    );
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getFriend();
        setFriends(res);
      } catch (err) {
        console.log("Lỗi lấy danh sách bạn bè", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // Kết nối WebSocket và lắng nghe cập nhật status
  useEffect(() => {
    // Kết nối WebSocket
    webSocketService.connect(
      () => {
        console.log("WebSocket connected for status updates");

        // Gửi thông tin user online khi kết nối thành công
        const currentUser = AuthService.getUser();
        if (currentUser) {
          webSocketService.send("/app/user/connect", {
            username: currentUser.username,
            status: "ONLINE",
          });
        }

        // Lắng nghe cập nhật status từ server
        webSocketService.subscribe("/topic/active", (data) => {
          console.log("Received status update:", data);
          updateFriendStatus(data.username, data.status);
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    // Cleanup khi component unmount
    return () => {
      webSocketService.disconnect();
    };
  }, [updateFriendStatus]);

  if (loading) return <p>Đang tải danh sách bạn bè...</p>;

  return (
    <div className={styles.wrapper}>
      {friends.map((friend) => (
        <button key={friend.id} className={styles.item}>
          <img
            src={friend.avatar || avatardefault}
            alt={friend.fullName}
            className={styles.avatar}
          />
          <div className={styles.infroItem}>
            <p className={styles.name}>{friend.fullName}</p>
            {/* Hiển thị status với icon hoặc badge */}
            <div className={styles.statusContainer}>
              <span
                className={`${styles.statusDot} ${
                  friend.status === "ONLINE" ? styles.online : styles.offline
                }`}
              />
              <p
                className={`${styles.statusText} ${
                  friend.status === "ONLINE"
                    ? styles.onlineText
                    : styles.offlineText
                }`}
              >
                {friend.status === "ONLINE" ? "Đang hoạt động" : "Ngoại tuyến"}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ListFriend;
