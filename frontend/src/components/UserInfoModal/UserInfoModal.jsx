import styles from "./UserInfoModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import avatarDefaule from "../../assets/avatar-default.jpg";
import { addFriend, getFriendStatus, unFriend } from "../../api/friends";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth.service";
function UserInfoModal({ user, onClick }) {
  const [status, setStatus] = useState(null);
  const currentUser = AuthService.getUser();
  useEffect(() => {
    fetchStatus();
  }, [user.id]);
  const fetchStatus = async () => {
    try {
      const res = await getFriendStatus(user.id);
      setStatus(res);
    } catch (err) {
      console.log("Lối khi lấy trạng thái người dùng ", err);
    }
  };
  // handle gửi lời mời
  const handleAddFriend = async () => {
    try {
      await addFriend(user.id);
      setStatus({ status: "PENDING", direction: "OUTGOING", canSend: false });
    } catch (err) {
      console.log("Lỗi khi gửi lời kết bạn");
    }
  };
  // handle hủy lời mời hoặc hủy kết bạn
  const handleCancel = async () => {
    try {
      await unFriend(user.id);
      setStatus({ status: "NONE", direction: "NONE", canSend: true });
    } catch (err) {
      console.log("Lỗi", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfor}>
        <div className={styles.header}>
          <p>Thông tin tài khoản</p>
          <button onClick={onClick}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={styles.avatarAndFullName}>
          <div className={styles.avatar}>
            <img src={avatarDefaule} alt="Ảnh đại diện" />
          </div>
          <div className={styles.fullName}>
            <p className={styles.name}>{user.fullName}</p>
            <p className={styles.title}>
              Chém gió cực đỉnh, tin nhắn là phải trả lời ngay!
            </p>
          </div>
        </div>
        {user.id !== currentUser.id && (
          <div className={styles.action}>
            {status?.canSend && (
              <button onClick={handleAddFriend} className={styles.buttonLeft}>
                Kết bạn
              </button>
            )}
            {status?.status === "PENDING" &&
              status?.direction === "OUTGOING" && (
                <button  onClick={handleCancel} className={styles.buttonLeft}>
                  Hủy gửi lời mời
                </button>
              )}
            {status?.status === "ACCEPTED" && (
              <button className={styles.buttonLeft}>Gọi điện</button>
            )}
            <button className={styles.message}>Nhắn tin</button>
          </div>
        )}

        <div className={styles.information}>
          <div className={styles.headerInfor}>Thông tin cá nhân</div>
          <div className={styles.phone}>
            <p>Số điện thoại</p>
            {user.username}
          </div>
          <div className={styles.email}>
            <p>Email</p>
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfoModal;
