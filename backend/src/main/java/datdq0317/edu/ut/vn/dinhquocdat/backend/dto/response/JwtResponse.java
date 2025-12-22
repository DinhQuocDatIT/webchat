package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserResponse user;
}