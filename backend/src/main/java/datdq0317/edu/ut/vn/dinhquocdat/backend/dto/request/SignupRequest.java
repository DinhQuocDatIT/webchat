package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class SignupRequest {
    private String fullName;
    private String username;
    private String password;
    private String email;
}
