package com.example.demo.login.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {

    @RequestMapping("/admin")
    public String admin(){
        return "/admin";
    }
}
