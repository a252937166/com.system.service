package com.crm.dao.menu;

import com.crm.util.vo.menu.MenuVO;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */
public interface MenuDao {
    public List<MenuVO> findMenus();
}
