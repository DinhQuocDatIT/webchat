package datdq0317.edu.ut.vn.dinhquocdat.backend.repository;

import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IMessageRepository  extends JpaRepository<Message, Integer> {
    public List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
}
