package datdq0317.edu.ut.vn.dinhquocdat.backend.security;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Role;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import lombok.Data;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
@Data
public class UserDetailsImpl implements UserDetails {
    private Integer id;
    private String fullName;
    private String username;
    private String email;
    private String password;

    private Role role;
    private String avatar;
    private String status;
    public UserDetailsImpl() {
    }

    public UserDetailsImpl(User user) {
       this.id = user.getId();
       this.fullName = user.getFullName();
       this.username = user.getUsername();
       this.email = user.getEmail();
       this.password = user.getPassword();
       this.role = user.getRole();
       this.avatar = user.getAvatar();
       this.status = user.getStatus().name();
    }

    public static  UserDetailsImpl build(User user) {
        return new UserDetailsImpl(user);

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
