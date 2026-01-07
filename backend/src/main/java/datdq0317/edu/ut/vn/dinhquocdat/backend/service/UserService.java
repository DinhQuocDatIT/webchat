package datdq0317.edu.ut.vn.dinhquocdat.backend.service;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.UserResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Role;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.UserStatus;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IFriendRepository;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IUserRepository userRepository;

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public void updatePassword(Integer userId, String encodedPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public void updateRole(Integer userId, Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role);
        userRepository.save(user);
    }

    @Override
    public List<UserResponse> findAll() {
        List<User> users = userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();
        for (User user : users) {
            userResponses.add(new UserResponse(user));
        }
        return userResponses;
    }
    @Override
    public Optional<UserResponse> findByUsernameResponse(String username) {
        return userRepository.findByUsername(username).map(UserResponse::new);
    }

    @Override
    public UserResponse connect(UserResponse response) {
        Optional<User> user = userRepository.findByUsername(response.getUsername());
      user.ifPresent(u ->{
          u.setStatus(UserStatus.ONLINE);
          userRepository.save(u);
      });
        return new UserResponse(user.get());
    }

    @Override
    public void changeAvatar(Integer userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        String fileName = UUID.randomUUID()+"_"+user.getUsername()+"_"+file.getOriginalFilename();
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );
        user.setAvatar(fileName);
        userRepository.save(user);
    }

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ROLE_USER);
        user.setAvatar("avatar-default.png");
        User savedUser = userRepository.save(user);
        return savedUser;
    }


}