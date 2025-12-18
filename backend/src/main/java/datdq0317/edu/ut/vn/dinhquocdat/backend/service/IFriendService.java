package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;

public interface IFriendService {
    void addFriend(Integer senderId, Integer receiverId);
    void acceptFriend(Integer receiverId,Integer senderId);
    void rejectFriend(Integer receiverId,Integer senderId);
    void unfriend(Integer receiverId,Integer senderId);
}
