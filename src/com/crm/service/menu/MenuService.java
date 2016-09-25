package com.crm.service.menu;

import com.crm.util.vo.menu.MenuVO;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */
public interface MenuService {
    public List<MenuVO> findMenus();
}
