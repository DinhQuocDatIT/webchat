package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.MessageRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;
import datdq0317.edu.ut.vn.dinhquocdat.backend.repository.IMessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService implements IMessageService {
    @Autowired
    private IMessageRepository messageRepository;
    @Autowired
    IUserService userService;
    @Autowired
    IConversationService conversationService;
    @Override
    @Transactional
    public MessageResponse saveMessage(MessageRequest messageRequest) {
        User sender = userService.findById(messageRequest.getSenderId()).orElseThrow(() -> new RuntimeException("Lỗi khi người gửi"));
        Conversation conversation = conversationService.getConversationById(messageRequest.getConversationId());
        if (conversation == null) {
            throw new RuntimeException("Không tìm thấy cuộc trò chuyện");
        }

        boolean isMember = conversation.getParticipants()
                .stream()
                .anyMatch(u -> u.getId().equals(sender.getId()));

        if (!isMember) {
            throw new RuntimeException("User không thuộc conversation");
        }
            Message message = new Message();
            message.setContent(messageRequest.getContent());
            message.setIsRead(false);
            message.setSender(sender);
            message.setConversation(conversation);
            Message saveMessage =  messageRepository.save(message);
            conversation.setLastMessageAt(saveMessage.getCreatedAt());
            conversation.setLastMessage(saveMessage.getContent());
        return new MessageResponse(saveMessage);
    }

    @Override
    public Message deleteMessage(Long messageId) {
        return null;
    }

    @Override
    public Message getMessage(Long messageId) {
        return null;
    }

    @Override
    public List<Message> getAllMessages() {
        return List.of();
    }

    @Override
    public List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
}
