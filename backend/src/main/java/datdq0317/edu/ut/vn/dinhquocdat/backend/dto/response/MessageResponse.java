package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    Long id;
    Integer senderId;
    String avatar;
    Long conversationId;
    String senderName;
    String content;
    LocalDateTime createdAt;

    public MessageResponse(Message message) {
        this.id = message.getId();
        this.senderId = message.getSender().getId();
        this.avatar = message.getSender().getAvatar();
        this.senderName = message.getSender().getFullName();
        this.conversationId = message.getConversation().getId();
        this.createdAt = message.getCreatedAt();
        this.content = message.getContent();
    }
}
