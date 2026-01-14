package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationResponse {
    private Long id;
    private Set<UserResponse> participants;
    private LocalDateTime lastMessageAt;
    private String lastMessage;
    public ConversationResponse(Conversation conversation) {
        this.id = conversation.getId();
        setParticipants(conversation.getParticipants());
        this.lastMessageAt = conversation.getLastMessageAt();
        this.lastMessage = conversation.getLastMessage();
    }

    public void setParticipants(Set<User> users) {
        Set<UserResponse> participants = new HashSet<>();
        for (User user : users) {
            participants.add(new UserResponse(user));
        }
        this.participants = participants;
    }
}



