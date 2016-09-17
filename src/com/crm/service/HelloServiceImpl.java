package com.crm.service;

import com.crm.dao.HelloDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 欧阳杜泞 on 2016/9/17.
 */

@Service
public class HelloServiceImpl implements HelloService {

    @Autowired
    private HelloDao helloDao;

    @Override
    public String hello() {
        System.out.println("=====Service=====");
        String name = helloDao.hello();
        return name;
    }
}
