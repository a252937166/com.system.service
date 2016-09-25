package com.crm.mapper;

import com.crm.util.vo.menu.MenuVO;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */
public interface MenuMapper {
    public List<MenuVO> findMenus();
}
