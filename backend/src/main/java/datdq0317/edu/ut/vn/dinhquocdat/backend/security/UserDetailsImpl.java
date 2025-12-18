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
    private int id;
    private String fullName;
    private String username;
    private String email;
    private String password;

    private Role role;

    public UserDetailsImpl() {
    }

    public UserDetailsImpl(int id,String fullName, String username, String email, String password, Role role) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static  UserDetailsImpl build(User user) {
        return new UserDetailsImpl(user.getId(),user.getFullName(), user.getUsername(), user.getEmail(), user.getPassword(), user.getRole());

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
