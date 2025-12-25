package datdq0317.edu.ut.vn.dinhquocdat.backend.controller;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.UserResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;
    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.findAll();
    }
    @GetMapping("/by-username")
    public ResponseEntity<UserResponse> getUserByUsername(@RequestParam String username) {
        return userService.findByUsernameResponse(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @MessageMapping("/user/connect")//người dùng gửi tới /app
    @SendTo("/topic/active")//client nhận message từ /toppic
    public UserResponse connect(@RequestBody UserResponse userResponse) {
        return userService.connect(userResponse);

}

}
