import { useState } from "react";
import ChatLayout from "../../layouts/ChatLayout/ChatLayout";

function Messages() {
  const [leftTab, setLeftTab] = useState("chat");
  const [selectedId, setSelectedId] = useState(null);

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
