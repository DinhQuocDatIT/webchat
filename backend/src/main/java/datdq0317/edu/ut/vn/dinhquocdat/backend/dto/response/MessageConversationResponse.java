package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MessageConversationResponse {
    Long id;
    Integer senderId;
    String senderName;
    String content;
    LocalDateTime createdAt;

   public MessageConversationResponse(Message message) {
       this.id = message.getId();
       this.senderId = message.getSender().getId();
       this.content = message.getContent();
       this.createdAt = message.getCreatedAt();

   }
}
