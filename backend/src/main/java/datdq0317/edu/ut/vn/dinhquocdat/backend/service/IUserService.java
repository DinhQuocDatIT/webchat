package datdq0317.edu.ut.vn.dinhquocdat.backend.service;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.UserResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Role;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    Optional<User> findById(Integer id);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User save(User user);

    User update(User user);

    void updatePassword(Integer userId, String encodedPassword);

    void updateRole(Integer userId, Role role);
    List<UserResponse> findAll();
    Optional<UserResponse> findByUsernameResponse(String username);
}