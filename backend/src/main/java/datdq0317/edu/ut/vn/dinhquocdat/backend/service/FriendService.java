package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.FriendStatusResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.FriendshipStatus;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IFriendRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService implements IFriendService {

    @Autowired
    private IFriendRepository friendRepository;
    @Autowired
    private IUserService userService;

    @Override
    public void addFriend(Integer senderId, Integer receiverId) {

        if(senderId.equals(receiverId)) {
            throw new RuntimeException("Không thể kết bạn với chính mình");
        }
        if (friendRepository.existsAccepted(senderId, receiverId)) {
            throw new RuntimeException("Đã là bạn bè");
        }



        // không được gủi lời khi đã bị từ chối
        Optional<Friend>  rejectFriend = friendRepository.findByUserIdAndFriendId(senderId, receiverId);
        if(rejectFriend.isPresent()) {
            if(rejectFriend.get().getStatus() == FriendshipStatus.REJECTED) {
                throw new RuntimeException("Bạn đã bị từ chối lời mời không được gửi lại");
            }
            if (rejectFriend.get().getStatus() == FriendshipStatus.PENDING) {
                throw new RuntimeException("Đang trong trạng thái chờ chấp nhận lời mời");
            }
        }
        // gửi lời khi đã từ chối người đó
        Optional<Friend> noRejectFriend = friendRepository.findByUserIdAndFriendId(receiverId, senderId);
        if(noRejectFriend.isPresent()) {
            if(noRejectFriend.get().getStatus().equals(FriendshipStatus.PENDING)){
                throw new RuntimeException("Người này đã gửi lởi mời cho bạn");
            }
            if(noRejectFriend.get().getStatus().equals(FriendshipStatus.REJECTED)){
                noRejectFriend.get().setStatus(FriendshipStatus.PENDING);
                friendRepository.save(noRejectFriend.get());
                return;
            }
        }
        Friend friend = new Friend();
        User sender = userService.findById(senderId).orElseThrow(() -> new RuntimeException("Không tìm thấy người gửi"));
        User receiver = userService.findById(receiverId).orElseThrow(() -> new RuntimeException("Không tìm thấy người nhận"));
        friend.setUser(sender);
        friend.setFriend(receiver);
        friend.setStatus(FriendshipStatus.PENDING);
        friendRepository.save(friend);
    }

    @Override
    public void acceptFriend(Integer receiverId, Integer senderId) {
        Friend request = friendRepository
                .findByUserIdAndFriendId(senderId, receiverId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lời mời"));

        if (request.getStatus() != FriendshipStatus.PENDING) {
            throw new RuntimeException("Lời mời không hợp lệ");
        }

        request.setStatus(FriendshipStatus.ACCEPTED);
        friendRepository.save(request);
    }

    @Override
    public void rejectFriend(Integer receiverId,Integer senderId) {
        Friend request = friendRepository
                .findByUserIdAndFriendId(senderId, receiverId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lời mời" + "Người gửi: "+senderId + "Người nhận :"+receiverId));

        if (request.getStatus() != FriendshipStatus.PENDING)
            throw new RuntimeException("Không thể từ chối");

        request.setStatus(FriendshipStatus.REJECTED);
        friendRepository.save(request);
    }

    @Override
    @Transactional
    public void unfriend(Integer u1, Integer u2) {
        Friend f = friendRepository.findBetweenUsers(u1, u2)
                .orElseThrow(() -> new RuntimeException("Không phải bạn bè"));

        friendRepository.delete(f);
    }

    @Override
    public Optional<Friend> findBetweenUsers(Integer u1, Integer u2) {
        return friendRepository.findBetweenUsers(u1, u2);
    }

    @Override
    public List<Friend> findAcceptedFriends(Integer userId) {
        return friendRepository.findAcceptedFriends(userId);
    }
    @Override
    public List<DetailFriendRequest> listFriend(Integer userId) {
        List<Friend> relations = friendRepository.findAcceptedFriends(userId);
        List<DetailFriendRequest> friends = new ArrayList<>();
        for (Friend f : relations) {
            if (f.getUser().getId().equals(userId)) {
                friends.add(new DetailFriendRequest(f.getFriend()));
            }
            else {
                friends.add(new DetailFriendRequest(f.getUser()));
            }
        }

        return friends;
    }

    @Override
    public FriendStatusResponse friendStatus(Integer meId, Integer otherId) {

        Optional<Friend> opt = friendRepository.findBetweenUsers(meId, otherId);

        if (opt.isEmpty()) {
            return new FriendStatusResponse("NONE", "NONE", true);
        }

        Friend f = opt.get();

        if (f.getStatus() == FriendshipStatus.PENDING) {
            if (f.getUser().getId().equals(meId)) {
                return new FriendStatusResponse("PENDING", "OUTGOING", false);
            } else {
                return new FriendStatusResponse("PENDING", "INCOMING", false);
            }
        }

        if (f.getStatus() == FriendshipStatus.REJECTED) {
            if (f.getUser().getId().equals(meId)) {
                // mình bị từ chối
                return new FriendStatusResponse("REJECTED", "OUTGOING", false);
            } else {
                // mình là người từ chối → được gửi lại
                return new FriendStatusResponse("REJECTED", "INCOMING", true);
            }
        }

        if (f.getStatus() == FriendshipStatus.ACCEPTED) {
            return new FriendStatusResponse("ACCEPTED", "NONE", false);
        }

        return new FriendStatusResponse("NONE", "NONE", true);
    }


}
