package datdq0317.edu.ut.vn.dinhquocdat.backend.repository;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IFriendRepository extends JpaRepository<Friend, Integer> {

    Optional<Friend> findByUserIdAndFriendId(Integer userId, Integer friendId);

    @Query("""
        select count(f) > 0 from Friend f
        where (
            (f.user.id = :u1 and f.friend.id = :u2)
            or
            (f.user.id = :u2 and f.friend.id = :u1)
        )
        and f.status = 'ACCEPTED'
    """)
    boolean existsAccepted(Integer u1, Integer u2);

    @Modifying
    @Query("""
        delete from Friend f
        where f.user.id = :userId
        and f.friend.id = :friendId
    """)
    int deleteByUserIdAndFriendId(Integer userId, Integer friendId);
    @Query("""
    select f from Friend f
    where (
        (f.user.id = :userId)
        or
        (f.friend.id = :userId)
    )
    and f.status = 'ACCEPTED'
""")
    List<Friend> findAcceptedFriends(Integer userId);

    @Query("""
    select f from Friend f
    where (
        (f.user.id = :u1 and f.friend.id = :u2)
        or
        (f.user.id = :u2 and f.friend.id = :u1)
    )
""")
    Optional<Friend> findBetweenUsers(Integer u1, Integer u2);

    @Query("""
        select  f from Friend  f 
        where (f.friend.id = :userId)
                and (f.status='PENDING')
""")
    List<Friend> getIncomingFriendRequests(Integer userId);
    @Query("""
    select  f from Friend  f 
        where  (f.user.id = :userId )
            and (f.status = "PENDING")
    """)
    List<Friend> getOutgoingFriendRequests(Integer userId);
}
