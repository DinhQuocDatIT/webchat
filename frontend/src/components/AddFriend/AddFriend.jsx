import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useState } from "react";

import styles from "./AddFriend.module.css";
function AddFriend() {
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);
  const handleAddFriend = () => {
    setShowFormAddFriend((prev) => !prev);
  };
  const modal = showFormAddFriend
    ? createPortal(
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Form tìm kiếm bạn bè ở đây</p>
            <button onClick={handleAddFriend}>Đóng</button>
          </div>
        </div>,
        document.body
      )
    : null;
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Tìm kiếm bạn bè"
        className={styles.findFriend}
      />

      <button className={styles.wrapperButton} onClick={handleAddFriend}>
        <FontAwesomeIcon icon={faUserPlus} className={styles.add} />
      </button>
      <button className={styles.wrapperButton}>
        <FontAwesomeIcon icon={faUserGroup} className={styles.add} />
      </button>
      {modal}
    </div>
  );
}
export default AddFriend;
