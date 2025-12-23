package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendStatusResponse {
    private String status;     // NONE | PENDING | ACCEPTED | REJECTED
    private String direction;  // NONE | OUTGOING | INCOMING
    private boolean canSend;
}
