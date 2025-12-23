package datdq0317.edu.ut.vn.dinhquocdat.backend.controller;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.FriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.FriendStatusResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.security.UserDetailsImpl;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IFriendService;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {
    @Autowired
    private IFriendService friendService;

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addFriend(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        friendService.addFriend(me.getId(), id);
        return ResponseEntity.ok("Gửi lời mời thành công");
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptFriend(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        friendService.acceptFriend(me.getId(), id);
        return ResponseEntity.ok("Chấp nhận lời mời thành công");
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<?> rejectFriend(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        friendService.rejectFriend(me.getId(), id);
        return ResponseEntity.ok("Từ chối lời mời");
    }
    @PostMapping("/unfriend/{id}")
    public ResponseEntity<?> unfriend(
            @PathVariable Integer id,
            Authentication authentication
    ){
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        friendService.unfriend(me.getId(), id);
        return ResponseEntity.ok("Hủy kết bạn thành công");
    }
    @GetMapping("/getfriend")
    public List<DetailFriendRequest> getFriend(Authentication authentication){
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        List<DetailFriendRequest> friends = friendService.listFriend(me.getId());
        System.out.println("friends"+friends.size());
        return friends;
    }
    @GetMapping("/friend-status/{id}")
    public FriendStatusResponse friendStatus(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        UserDetailsImpl me = (UserDetailsImpl) authentication.getPrincipal();
        return friendService.friendStatus(me.getId(), id);
    }

}
