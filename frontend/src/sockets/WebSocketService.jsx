// WebSocketService.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AuthService } from "../services/auth.service";

class WebSocketService {
  client = null;

  connect(onConnect) {
    this.client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
      onConnect,
    });

    this.client.activate();
  }

  subscribe(topic, callback) {
    if (!this.client || !this.client.connected) return;
    return this.client.subscribe(topic, (msg) =>
      callback(JSON.parse(msg.body))
    );
  }

  send(destination, body) {
    if (!this.client || !this.client.connected) return;

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  disconnect() {
    if (this.client) this.client.deactivate();
  }
}

export default new WebSocketService();
