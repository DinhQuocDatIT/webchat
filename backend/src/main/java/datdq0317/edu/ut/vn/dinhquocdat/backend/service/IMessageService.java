package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.MessageRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.User;

import java.util.List;

public interface IMessageService {
    MessageResponse saveMessage(MessageRequest messageRequest);
    Message deleteMessage(Long messageId);
    Message getMessage(Long messageId);
    List<Message> getAllMessages();
    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
}
