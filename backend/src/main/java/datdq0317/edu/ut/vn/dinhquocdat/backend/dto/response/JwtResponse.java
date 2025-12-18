package datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String fullName;
    private String type = "Bearer";
    private Integer id;
    private String email;
    private String username;
    private String role;

    public JwtResponse(Integer id,String fullName, String token, String email, String username, String role) {
        this.id = id;
        this.fullName = fullName;
        this.token = token;
        this.email = email;
        this.username = username;
        this.role =role;
    }
}