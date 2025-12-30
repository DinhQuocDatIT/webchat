package datdq0317.edu.ut.vn.dinhquocdat.backend.controller;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.UserResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IFriendService;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private IFriendService friendService;
    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok(new UserResponse(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/by-username")
    public ResponseEntity<UserResponse> getUserByUsername(@RequestParam String username) {
        return userService.findByUsernameResponse(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @MessageMapping("/user/connect")
    public void connect(@Payload UserResponse userResponse) {

        UserResponse updatedUser = userService.connect(userResponse);

//        List<DetailFriendRequest> friendRequests = friendService.listFriend(userResponse.getId());
//
//        for(DetailFriendRequest friendRequest : friendRequests) {
//            messagingTemplate.convertAndSend(
//                    "/topic/active/"+friendRequest.getUsername(),updatedUser
//            );
//        }
            System.out.println("username friend là: " + updatedUser.getUsername()+"|"+userResponse.getUsername());
            messagingTemplate.convertAndSend(
                    "/topic/active/"+ userResponse.getUsername(),userResponse
            );

    }

}
