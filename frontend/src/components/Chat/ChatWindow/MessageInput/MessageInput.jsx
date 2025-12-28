import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputerMouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./MessageInput.module.css";
import { sendMessgae } from "../../../../api/messages";
import { useState } from "react";
import { AuthService } from "../../../../services/auth.service";
function MessageInput({ conversationId }) {
  const currentUser = AuthService.getUser();
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      const res = await sendMessgae({
        senderId: currentUser.id,
        conversationId: conversationId,
        content: content,
      });

      console.log("Message sent:", res);
      setContent(""); // clear input
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.action}> </div>
      <div className={styles.contentInput}>
        <input
          type="text"
          placeholder="Nhập nội dung..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faComputerMouse} />
        </button>
      </div>
    </div>
  );
}
export default MessageInput;
