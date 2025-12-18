package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequest {
    private Integer senderId;
    private Integer receiverId;
}
