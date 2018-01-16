package com.example.demo.websocket.controller;


import com.example.demo.websocket.model.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ChatController {


    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @RequestMapping("/chat/chatSample")
    public String ChatSample(Model model){
        return "/chat/ChatSample";
    }

    /**
     *  route like this /app/chat.sendMessage
     *
     * @param chatMessage
     * @return
     */
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        logger.info(chatMessage.toString());
        return chatMessage;
    }


    /**
     * route like this /app/chat.addUser
     *
     * @param chatMessage
     * @param headerAccessor
     * @return
     */
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        logger.info(chatMessage.toString());
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

        joinWithOwner(headerAccessor);
        return chatMessage;
    }

    @SendTo("/topic/public")
    private ChatMessage joinWithOwner(SimpMessageHeaderAccessor headerAccessor){
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        chatMessage.setSender("lee");
        logger.info(chatMessage.toString());
        return chatMessage;
    }


}
