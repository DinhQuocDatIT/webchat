package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    Integer senderId;
    Long conversationId;
    String content;
}
