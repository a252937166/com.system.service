package com.crm.dao.menu;

import com.crm.mapper.MenuMapper;
import com.crm.util.vo.menu.MenuVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */

@Repository
public class MenuDaoImpl implements MenuDao {

    @Autowired
    private MenuMapper mapper;

    @Override
    public List<MenuVO> findMenus() {
        List<MenuVO> result = mapper.findMenus();
        return result;
    }
}
