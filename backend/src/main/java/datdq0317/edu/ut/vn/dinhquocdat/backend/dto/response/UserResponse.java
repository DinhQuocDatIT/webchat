package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private String avatar;
    private String status;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.role = user.getRole().name();
        this.avatar = user.getAvatar();
        this.status =user.getStatus().name();
    }
    public UserResponse(UserDetailsImpl user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.role = user.getRole().name();
        this.avatar = user.getAvatar();
       this.status =user.getStatus().toString();

    }


}
