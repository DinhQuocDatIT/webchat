package datdq0317.edu.ut.vn.dinhquocdat.backend.controller;

import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.request.MessageRequest;
import datdq0317.edu.ut.vn.dinhquocdat.backend.dto.response.MessageResponse;
import datdq0317.edu.ut.vn.dinhquocdat.backend.model.Message;
import datdq0317.edu.ut.vn.dinhquocdat.backend.service.IMessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private IMessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @PostMapping
    public MessageResponse sendMessage(@Valid @RequestBody MessageRequest messageRequest) {
        MessageResponse message = messageService.saveMessage(messageRequest);
        messagingTemplate.convertAndSend(
                "/topic/messages/"+ messageRequest.getConversationId(), message);
        return message;
    }
}
