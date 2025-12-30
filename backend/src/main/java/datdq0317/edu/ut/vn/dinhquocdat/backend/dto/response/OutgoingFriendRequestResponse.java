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
public class OutgoingFriendRequestResponse {
    private Integer id;
    private Integer receiverId;
    private String receiverName;
    private String receiverUsername;
    private String avatar;
    private LocalDateTime createdAt;

    public OutgoingFriendRequestResponse(Friend friend) {
        User receiver = friend.getFriend();
        this.id = friend.getId();
        this.receiverId = receiver.getId();
        this.receiverName = receiver.getFullName();
        this.receiverUsername = receiver.getUsername();
        this.avatar = receiver.getAvatar();
        this.createdAt = friend.getCreatedAt();
    }
}
