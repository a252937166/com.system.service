package com.crm.controller.menu;

import com.crm.service.menu.MenuService;
import com.crm.util.core.json.JSONUtil;
import com.crm.util.vo.menu.MenuVO;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */

@Controller
@RequestMapping("/menu.action")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @ResponseBody
    @RequestMapping(value = "findMenus",method = RequestMethod.GET)
    public String findMenus() {

        List<MenuVO> result = menuService.findMenus();

        return JSONUtil.collectionToJsonStr(result);

    }
}
