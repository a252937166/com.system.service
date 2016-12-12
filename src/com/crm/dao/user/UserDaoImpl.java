package com.crm.dao.user;

import com.crm.mapper.UserMapper;
import com.crm.util.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Duning Ouyang on 2016/12/8 0008.
 */
@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserMapper userMapper;

    @Override
    public int addUser(UserVO userVO) {
        return userMapper.addUser(userVO);
    }

    public List<UserVO> findUsers(UserVO userVO) {
        return userMapper.findUsers(userVO);
    }
}
