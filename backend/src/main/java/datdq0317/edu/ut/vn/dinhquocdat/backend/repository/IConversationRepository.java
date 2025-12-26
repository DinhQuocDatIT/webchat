package datdq0317.edu.ut.vn.dinhquocdat.backend.repository;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("""
    select c from Conversation c
    join c.participants u
    where u.id = :userId
""")
    List<Conversation> findByUserId(Integer userId);

    @Query("""
select c from  Conversation  c 
join c.participants u1 
join c.participants u2
where u1.id = :meId and u2.id = :friendId
""")
    Optional<Conversation> findBetweenUsers(Integer meId, Integer friendId);
}
