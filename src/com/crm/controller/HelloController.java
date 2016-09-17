package com.crm.controller;

import com.crm.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 欧阳杜泞 on 2016/9/15.
 */
@Controller
public class HelloController {
    @Autowired
    private HelloService helloService;

    @RequestMapping({"hello","/"})
    public String hello(String username, Model model) {

        String name = helloService.hello();

        model.addAttribute("username",name);

        return "hello";

    }
}
