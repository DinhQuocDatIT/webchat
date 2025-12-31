import styles from "./UserResultItem.module.css";
import avatardefault from "../../../assets/avatar-default.jpg";
import { useEffect, useState } from "react";
import {
  addFriend,
  acceptFriend,
  rejectFriend,
  unFriend,
  getFriendStatus,
} from "../../../api/friends";

function UserResultItem({ user }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, [user.id]);

  const fetchStatus = async () => {
    const res = await getFriendStatus(user.id);
    setStatus(res);
  };

  // Gửi lời mời
  const handleAddFriend = async () => {
    try {
      setLoading(true);
      await addFriend(user.id);

      // hoặc gọi lại fetchStatus()
      setStatus({
        status: "PENDING",
        direction: "OUTGOING",
        canSend: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Hủy lời mời / hủy kết bạn
  const handleCancel = async () => {
    try {
      setLoading(true);
      await unFriend(user.id);

      setStatus({
        status: "NONE",
        direction: "NONE",
        canSend: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Chấp nhận
  const handleAccept = async () => {
    try {
      setLoading(true);
      await acceptFriend(user.id);

      setStatus({
        status: "ACCEPTED",
        direction: "NONE",
        canSend: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // ❗ FIX LỖI Ở ĐÂY
  // Từ chối → reset hoàn toàn trạng thái
  const handleReject = async () => {
    try {
      setLoading(true);
      await rejectFriend(user.id);

      setStatus({
        status: "NONE",
        direction: "NONE",
        canSend: true,
      });
      // hoặc: await fetchStatus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={user.avatar || avatardefault} alt={user.fullName} />

      <div className={styles.information}>
        <p className={styles.fullName}>{user.fullName}</p>
        <p className={styles.username}>{user.username}</p>
      </div>

      <div className={styles.action}>
        {/* Chưa có quan hệ */}
        {status?.canSend && (
          <button disabled={loading} onClick={handleAddFriend}>
            {loading ? "Đang gửi..." : "Kết bạn"}
          </button>
        )}

        {/* Mình đã gửi */}
        {status?.status === "PENDING" && status?.direction === "OUTGOING" && (
          <button disabled={loading} onClick={handleCancel}>
            Hủy gửi lời mời
          </button>
        )}

        {/* Người ta gửi cho mình */}
        {status?.status === "PENDING" && status?.direction === "INCOMING" && (
          <>
            <button disabled={loading} onClick={handleAccept}>
              Chấp nhận
            </button>
            <button disabled={loading} onClick={handleReject}>
              Từ chối
            </button>
          </>
        )}

        {/* Đã là bạn */}
        {status?.status === "ACCEPTED" && (
          <button disabled={loading} onClick={handleCancel}>
            Hủy kết bạn
          </button>
        )}
      </div>
    </div>
  );
}

export default UserResultItem;
