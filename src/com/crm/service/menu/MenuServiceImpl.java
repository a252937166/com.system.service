package com.crm.service.menu;

import com.crm.dao.menu.MenuDao;
import com.crm.util.vo.menu.MenuVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 欧阳杜泞 on 2016/9/24.
 */
@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuDao menuDao;

    @Override
    public List<MenuVO> findMenus() {

        List<MenuVO> result = menuDao.findMenus();

        return result;
    }
}
