import { useState } from "react";
import styles from "./SearchFriendForm.module.css";
import { getUserByUsername } from "../../api/user";
import avatardefault from "../../assets/avatar-default.jpg";
import UserResultItem from "./UserResultItem/UserResultItem";
function SearchFriendForm({ onClick }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setErrorMessage("Vui lòng nhập số điện thoại");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setUser(null);

      const res = await getUserByUsername(phone);
      setUser(res);
    } catch (err) {
      setUser(null);
      setErrorMessage("Không tìm thấy người dùng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.header}>Thêm bạn</div>

      <div className={styles.content}>
        <div className={styles.inputPhone}>
          <div className={styles.country}>
            <p>VN</p>
          </div>
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.result}>
          {loading && <p>Đang tìm...</p>}
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          {user && (
            <div className={styles.searchResult}>
              <p className={styles.searchTitle}>Kết quả tìm kiếm </p>

              <UserResultItem user={user} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.search}>
          Tìm kiếm
        </button>
        <button type="button" onClick={onClick}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default SearchFriendForm;
