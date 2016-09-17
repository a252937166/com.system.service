package com.crm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 欧阳杜泞 on 2016/9/15.
 */
@Controller
public class HelloController {

    @RequestMapping({"hello","/"})
    public String hello(String username, Model model) {

        model.addAttribute("username",username);
        return "hello";

    }
}
