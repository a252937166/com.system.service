package com.crm.controller.user;

import com.crm.service.user.UserService;
import com.crm.util.core.json.JSONUtil;
import com.crm.util.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Duning Ouyang on 2016/12/8 0008.
 */
@Controller
@RequestMapping(value = "/user.action")
public class UserController {
    @Autowired
    private UserService userService;

    @InitBinder("userVO")
    private void initBinder1(WebDataBinder webDataBinder) {
        webDataBinder.setFieldDefaultPrefix("userVO.");
    }

    @ResponseBody
    @RequestMapping(params = "addUser",method = RequestMethod.GET)
    public String addUser(@ModelAttribute UserVO userVO) {
        int result = userService.addUser(userVO);
        return String.valueOf(result);
    }

    @ResponseBody
    @RequestMapping(params="findUsers",method=RequestMethod.POST)
    public String findUsers(@ModelAttribute UserVO userVO,Integer start,Integer limit){
        if(userVO.getPageNo() != null){
//            start =userVO.getPageNo();
//            limit =userVO.getPageSize();
        }
        userVO.setPageNo(start);
        userVO.setPageSize(limit);
        List<UserVO> result = userService.findUsers(userVO);
        return JSONUtil.collectionToJsonStr(result);
    }
}
