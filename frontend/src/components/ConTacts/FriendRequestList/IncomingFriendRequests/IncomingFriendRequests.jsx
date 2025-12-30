import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import styles from "./IncomingFriendRequests.module.css";
import { useEffect, useState } from "react";
import {
  acceptFriend,
  getFriendIncoming,
  unFriend,
} from "../../../../api/friends";
import Avatar from "../../../Avatar/Avatar.jsx";
import { formatDateTime } from "../../../../utils/formatDateTime.jsx";

function IncomingFriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingAddId, setLoadingAddId] = useState(null);
  const [loadingCancelId, setLoadingCancelId] = useState(null);

  // Lấy danh sách lời mời
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const res = await getFriendIncoming();
        setFriendRequests(res || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu kết bạn", error);
      }
    };

    fetchFriendRequests();
  }, []);

  // Chấp nhận kết bạn
  const handleAddFriend = async (senderId, requestId) => {
    try {
      setLoadingAddId(requestId);
      await acceptFriend(senderId);
      setFriendRequests((prev) => prev.filter((item) => item.id !== requestId));
    } catch (error) {
      console.error("Lỗi khi kết bạn", error);
    } finally {
      setLoadingAddId(null);
    }
  };

  // Từ chối lời mời
  const handleCancel = async (senderId, requestId) => {
    try {
      setLoadingCancelId(requestId);
      await unFriend(senderId);
      setFriendRequests((prev) => prev.filter((item) => item.id !== requestId));
    } catch (error) {
      console.error("Lỗi khi hủy lời mời", error);
    } finally {
      setLoadingCancelId(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        Lời mời đã nhận ({friendRequests.length})
      </div>

      <div className={styles.content}>
        {friendRequests.length === 0 && (
          <p className={styles.empty}>Không có lời mời nào</p>
        )}

        {friendRequests.map((request) => (
          <div className={styles.item} key={request.id}>
            <div className={styles.itemHeader}>
              <Avatar userid={request.senderId} />

              <div className={styles.infor}>
                <p className={styles.name}>{request.senderName}</p>
                <p className={styles.time}>
                  {formatDateTime(request.createdAt)}
                </p>
              </div>

              <button className={styles.message}>
                <FontAwesomeIcon icon={faCommentDots} />
              </button>
            </div>

            <div className={styles.itemTitle}>
              Xin chào mình là {request.senderName}, kết bạn với mình nhé
            </div>

            <div className={styles.itemAction}>
              <button
                className={styles.disagree}
                disabled={loadingCancelId === request.id}
                onClick={() => handleCancel(request.senderId, request.id)}
              >
                {loadingCancelId === request.id ? "Đang xử lý..." : "Từ chối"}
              </button>

              <button
                className={styles.agree}
                disabled={loadingAddId === request.id}
                onClick={() => handleAddFriend(request.senderId, request.id)}
              >
                {loadingAddId === request.id ? "Đang xử lý..." : "Đồng ý"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomingFriendRequests;
