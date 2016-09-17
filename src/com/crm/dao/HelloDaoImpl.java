package com.crm.dao;

import com.crm.mapper.HelloMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by 欧阳杜泞 on 2016/9/17.
 */
@Repository
public class HelloDaoImpl implements HelloDao {
    @Autowired
    private HelloMapper helloMapper;

    @Override
    public String hello() {
        System.out.println("============Dao=============");
        String name = helloMapper.hello();
        return name;
    }
}
