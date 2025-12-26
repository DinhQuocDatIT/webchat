package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.ConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ConversationService implements IConversationService {
    @Autowired
    private IConversationRepository conversationRepository;
    @Autowired
    private IUserService userService;
    @Override
    public List<ConversationResponse> getConversations(Integer meId) {

        List<Conversation>  conversations = conversationRepository.findByUserId(meId);
        List<ConversationResponse> conversationResponses = new ArrayList<>();
        for (Conversation conversation : conversations) {
            conversationResponses.add(new ConversationResponse(conversation));
        }
        return conversationResponses;
    }

    @Override
    public ConversationResponse getOrCreateConversation(Integer meId, Integer friendId) {

        Optional<Conversation> conversation = conversationRepository.findBetweenUsers(meId, friendId);
        if(conversation.isPresent()) {
            return new ConversationResponse(conversation.get());
        }
        Conversation conversation1 = new Conversation();
        User u1 = userService.findById(meId).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng "));
        User u2 = userService.findById(friendId).orElseThrow(() -> new RuntimeException("Không tìm thấy bạn của mình "));
        Set<User> users = new HashSet<>();
        users.add(u1);
        users.add(u2);
        conversation1.setParticipants(users);
        conversationRepository.save(conversation1);
        return new ConversationResponse(conversation1);
    }
}
