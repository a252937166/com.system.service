package com.crm.service.user;

import com.crm.util.vo.user.UserVO;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Duning Ouyang on 2016/12/10 0010.
 */
public interface UserService {
    public int addUser(UserVO userVO);
    //查询多条用户信息
    public List<UserVO> findUsers(UserVO userVO);
}
