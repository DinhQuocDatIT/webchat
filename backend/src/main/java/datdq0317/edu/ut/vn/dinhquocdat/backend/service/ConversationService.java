package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.ConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IConversationRepository;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IMessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ConversationService implements IConversationService {
    @Autowired
    private IConversationRepository conversationRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private IMessageRepository messageRepository;
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

    @Override
    public Conversation getConversationById(Long conversationId) {
        return conversationRepository.findById(conversationId).orElse(null);
    }

    @Override
    public List<MessageResponse> getcontentConversation(Integer meId,Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow(()-> new RuntimeException("Lỗi khi không tìm thấy cuộc trò chuyện"));
        boolean isMember = conversation.getParticipants()
                .stream()
                .anyMatch(u -> u.getId().equals(meId));

        if (!isMember) {
            throw new RuntimeException("Bạn không thuộc cuộc trò chuyện này");
        }
        List<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        List<MessageResponse> messageResponses = new ArrayList<>();
        for (Message message : messages) {
            messageResponses.add(new MessageResponse(message));
        }
        return messageResponses;
    }
}
