package com.mrjzhang.service;

import com.mrjzhang.bean.User;

// Service 业务逻辑层，这一块几乎与 hibernate 和 mybatis 一样
public interface UserService {
    // 新增用户
    boolean addUser(User user);

    // 修改用户
    boolean updateUser(User user);

    // 删除用户
    boolean deleteUser(int id);

    // 根据用户名查询用户信息
    User findUserByName(String username);

    // 根据用户id查找用户信息
    User findUserById(int userId);

    // 根据用户年龄查找用户信息
    User findUserByAge(int userAge);
}
