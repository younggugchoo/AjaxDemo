package com.example.demo.ajax.controller;


import com.example.demo.ajax.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class AjaxController {


    @RequestMapping("/")
    public String Index(Model model){

        model.addAttribute("a", "test");

        return "ajax";
    }


    @RequestMapping(value="/ajaxTest")
    public @ResponseBody List<User> ajaxTest(@ModelAttribute User user){

        System.out.println(String.format("This date from html:%s",user.getUserName()));
        return CreateUsers();

    }

    private List<User> CreateUsers(){
        List<User> result = new ArrayList<User>();
        for(int i=0; i<10; i++){
            User u = new User();

            u.setUserName("kim");
            u.setAddr("seoul");
            result.add(u);
        }
        return result;

    }


}
