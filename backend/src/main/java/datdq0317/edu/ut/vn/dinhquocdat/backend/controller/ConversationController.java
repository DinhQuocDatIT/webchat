package datdq0317.edu.ut.vn.dinhquocdat.backend.controller;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.ConversationResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Conversation;
import datdq0317.edu.ut.vn.dinhquocdat.backend.security.UserDetailsImpl;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {
    @Autowired
   private IConversationService conversationService;
    @GetMapping
    public List<ConversationResponse> getConversation(Authentication authentication) {
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        return conversationService.getConversations(user.getId());
    }
    @GetMapping("/{id}")
    public ConversationResponse getOrCreateConversation(
            @PathVariable Integer id,
            Authentication authentication) {
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        return  conversationService.getOrCreateConversation(user.getId(),id);
    }
}
