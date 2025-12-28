package datdq0317.edu.ut.vn.dinhquocdat.backend.service;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.ConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;

import java.util.List;

public interface IConversationService {
    List<ConversationResponse> getConversations(Integer meId);
    ConversationResponse getOrCreateConversation(Integer meId,Integer friendId);
    Conversation getConversationById(Long conversationId);
    List<MessageResponse> getcontentConversation(Integer meId,Long conversationId);
}
