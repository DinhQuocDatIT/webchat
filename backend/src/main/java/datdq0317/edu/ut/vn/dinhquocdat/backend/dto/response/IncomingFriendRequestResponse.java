package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomingFriendRequestResponse {
    private Integer id;
    private Integer senderId;
    private String senderName;
    private String senderUsername;
    private String avatar;
    private LocalDateTime createdAt;

    public IncomingFriendRequestResponse(Friend friend) {
        User sender = friend.getUser();
        this.id = friend.getId();
        this.senderId = sender.getId();
        this.senderName = sender.getFullName();
        this.senderUsername = sender.getUsername();
        this.avatar = sender.getAvatar();
        this.createdAt = friend.getCreatedAt();
    }
}
