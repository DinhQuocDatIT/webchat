import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import styles from "./OutgoingFriendRequests.module.css";
import { useEffect, useState } from "react";
import { getFriendOutgoing, unFriend } from "../../../../api/friends";
import Avatar from "../../../Avatar/Avatar";
import { formatDateTime } from "../../../../utils/formatDateTime";
function OutgoingFriendRequests() {
  const [friendReceivers, setFriendReceivers] = useState([]);
  const [loadingCancelId, setLoadingCancelId] = useState(null);
  useEffect(() => {
    const handleOutgoing = async () => {
      try {
        const res = await getFriendOutgoing();
        setFriendReceivers(res || []);
      } catch (error) {
        console.log("Lỗi khi lấy danh sách gửi lời mời", error);
      }
    };
    handleOutgoing();
  }, []);
  const handleCancel = async (receiverId, requestId) => {
    try {
      setLoadingCancelId(requestId);
      await unFriend(receiverId);
      setFriendReceivers((prev) =>
        prev.filter((item) => item.id !== requestId)
      );
    } catch (error) {
      console.log("Lỗi khi thu hồi lời mời kết bạn");
    } finally {
      setLoadingCancelId(null);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        Lời mời đã gửi ({friendReceivers.length})
      </div>
      <div className={styles.content}>
        {friendReceivers.length === 0 && <p>Bạn chưa gửi lời mời nào </p>}
        {friendReceivers.map((request) => {
          return (
            <div className={styles.item} key={request.id}>
              <div className={styles.itemHeader}>
                <Avatar userid={request.receiverId} />
                <div className={styles.infor}>
                  <p className={styles.name}>{request.receiverName}</p>
                  <p className={styles.time}>{formatDateTime(request.createdAt)}</p>
                </div>
                <button className={styles.message}>
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </div>
              <div className={styles.itemAction}>
                <button
                  disabled={loadingCancelId === request.id}
                  className={styles.cancelInvitation}
                  onClick={() => handleCancel(request.receiverId, request.id)}
                >
                  {loadingCancelId === request.id
                    ? "Đang xử lý..."
                    : "Thu hồi lời mời"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default OutgoingFriendRequests;
