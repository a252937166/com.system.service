package com.crm.service.user;

import com.crm.dao.user.UserDao;
import com.crm.util.core.genertor.IDGenerator;
import com.crm.util.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Duning Ouyang on 2016/12/10 0010.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public int addUser(UserVO userVO) {
        userVO.setUserId(IDGenerator.generator());
        return userDao.addUser(userVO);
    }

    public List<UserVO> findUsers(UserVO userVO) {
        List<UserVO> result = userDao.findUsers(userVO);
        return result;
    }
}
