package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailFriendRequest {
    private Integer id;
    private String username;
    private String fullName;

    public DetailFriendRequest(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.fullName = user.getFullName();
    }
}
