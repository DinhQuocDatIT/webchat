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
public class FriendResponse {
    private  Integer id;
    private Integer senderId;
    private String senderName;
    private String senderUsername;
    private String avatar;
    private String username;
    private LocalDateTime createdAt;
    public  FriendResponse(Friend friend) {
        User user = friend.getUser();
        this.senderName = user.getFullName();
        this.username = user.getUsername();
        this.id = friend.getId();
        this.senderId = user.getId();
        this.avatar = user.getAvatar();
        createdAt = friend.getCreatedAt();
    }


}
