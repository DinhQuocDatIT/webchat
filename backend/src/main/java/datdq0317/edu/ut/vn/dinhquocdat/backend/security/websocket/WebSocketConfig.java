package datdq0317.edu.ut.vn.dinhquocdat.backend.security.websocket;

//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//@Configuration // đây là 1 lớp cấu hình của spring
//@EnableWebSocketMessageBroker// Cho phép xử lý tin nhắn Websocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

//    @Override// đăng ký 1 websocket endpoint để máy khách sử dụng để kê nối với máy chủ
//    public void registerStompEndpoints (StompEndpointRegistry registry) {
//    registry.addEndpoint("/ws").withSockJS();
//    }
//    @Override
//    public void configureMessageBroker (MessageBrokerRegistry registry) {
//        // lọc các đích đến được xử lý bới các phương thức được chú tích băng @MessageMapping
//        registry.setApplicationDestinationPrefixes("/app");
//
//        // dùng để đưa tin nhắn đến các máy khách đã đăng ký thông qua mô hình pub-sub
//        registry.enableSimpleBroker("/topic");
//    }
}
