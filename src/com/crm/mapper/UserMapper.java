package com.crm.mapper;

import com.crm.util.vo.user.UserVO;

import java.util.List;

/**
 * Created by Duning Ouyang on 2016/12/8 0008.
 */
public interface UserMapper {
    public int addUser(UserVO userVO);
    //查询多条用户信息
    public List<UserVO> findUsers(UserVO userVO);
}
