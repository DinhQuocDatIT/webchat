package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.DetailFriendRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.FriendResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.FriendStatusResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.IncomingFriendRequestResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.OutgoingFriendRequestResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;

import java.util.List;
import java.util.Optional;

public interface IFriendService {
    void addFriend(Integer senderId, Integer receiverId);
    void acceptFriend(Integer receiverId,Integer senderId);
    void rejectFriend(Integer receiverId,Integer senderId);
    void unfriend(Integer receiverId,Integer senderId);
    Optional<Friend> findBetweenUsers(Integer u1, Integer u2);
    List<Friend> findAcceptedFriends(Integer userId);
    List<DetailFriendRequest> listFriend(Integer userId);
    FriendStatusResponse friendStatus(Integer meId, Integer otherId);
    List<IncomingFriendRequestResponse> getIncomingFriendRequests(Integer userId);
    List<OutgoingFriendRequestResponse> getOutgoingFriendRequests(Integer userId);
}
