package datdq0317.edu.ut.vn.dinhquocdat.backend.websocket;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.UserStatusMessage;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.UserStatus;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class WebSocketEventListener {

    private final Map<String, Set<String>> sessions = new ConcurrentHashMap<>();

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void onConnect(SessionConnectedEvent event) {
        StompHeaderAccessor acc = StompHeaderAccessor.wrap(event.getMessage());
        if (acc.getUser() == null) return;

        String username = acc.getUser().getName();
        String sessionId = acc.getSessionId();

        sessions.computeIfAbsent(username, k -> ConcurrentHashMap.newKeySet())
                .add(sessionId);

        if (sessions.get(username).size() == 1) {
            updateStatus(username, UserStatus.ONLINE);
        }
    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor acc = StompHeaderAccessor.wrap(event.getMessage());
        if (acc.getUser() == null) return;

        String username = acc.getUser().getName();
        String sessionId = acc.getSessionId();

        Set<String> userSessions = sessions.get(username);
        if (userSessions != null) {
            userSessions.remove(sessionId);
            if (userSessions.isEmpty()) {
                sessions.remove(username);
                updateStatus(username, UserStatus.OFFLINE);
            }
        }
    }

    private void updateStatus(String username, UserStatus status) {
        userRepository.findByUsername(username).ifPresent(user -> {
            user.setStatus(status);
            userRepository.save(user);

            messagingTemplate.convertAndSend(
                    "/topic/active",
                    new UserStatusMessage(username, status.name())
            );
        });
    }
}
