import styles from "./UserInfoModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-regular-svg-icons";
import avatarDefaule from "../../assets/avatar-default.jpg";
import { addFriend, getFriendStatus, unFriend } from "../../api/friends";
import { useEffect, useRef, useState } from "react";
import { AuthService } from "../../services/auth.service";
import { useChatActions } from "../../contexts/useChatActions";
import { changeAvatar } from "../../api/user";

function UserInfoModal({ user, onClick }) {
  const { startChatWithUser } = useChatActions();
  const [status, setStatus] = useState(null);
  const currentUser = AuthService.getUser();

  const URL_IMG = import.meta.env.VITE_API_URL_IMG + user.avatar;
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
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate nhanh
    if (!file.type.startsWith("image/")) {
      alert("Chỉ được chọn ảnh");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ảnh tối đa 5MB");
      e.target.value = "";
      return;
    }

    try {
      await changeAvatar(file);
      alert("Đổi avatar thành công");
    } catch (err) {
      console.error("Đổi avatar thất bại");
      console.error(err);
      alert("Đổi avatar thất bại");
    } finally {
      e.target.value = "";
    }
  };

  // thay đổi ảnh đại diện

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
            <img src={URL_IMG} alt="Ảnh đại diện" />
            {user.id === currentUser.id && (
              <>
                <button onClick={handleClick}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChangeAvatar}
                />
              </>
            )}
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
                <button onClick={handleCancel} className={styles.buttonLeft}>
                  Hủy gửi lời mời
                </button>
              )}
            {status?.status === "ACCEPTED" && (
              <button className={styles.buttonLeft}>Gọi điện</button>
            )}
            <button
              className={styles.message}
              onClick={() => startChatWithUser(user.id)}
            >
              Nhắn tin
            </button>
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
