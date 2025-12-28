import { useEffect, useState } from "react";
import ChatLayout from "../../layouts/ChatLayout/ChatLayout";
import WebSocketService from "../../sockets/WebSocketService";
import { AuthService } from "../../services/auth.service";

function Messages() {
  const [leftTab, setLeftTab] = useState("chat");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    WebSocketService.connect(
      () => {
        console.log("Kết nối với web socket");
        const currentUser = AuthService.getUser();
        if (currentUser) {
          WebSocketService.send("/app/user/connect", {
            username: currentUser.username,
            status: "ONLINE",
          });
        }
      },
      (error) => {
        console.log("Lỗi khi kết nối vưới websocket", error);
      }
    );
    return () => {
      WebSocketService.disconnect();
    };
  }, []);
  return (
    <ChatLayout
      leftTab={leftTab}
      setLeftTab={setLeftTab}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
    />
  );
}

export default Messages;
