package com.mrjzhang.service;

import com.mrjzhang.bean.User;
import com.mrjzhang.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 用户操作实现类
// 继承必须要实现接口的所有方法？？？
@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private UserDao userDao;

  @Override
  public boolean addUser(User user) {
    boolean flag = false;
    try {
      userDao.addUser(user);
      flag = true;

    } catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public boolean updateUser(User user) {
    boolean flag = false;
    try {
      userDao.updateUser(user);
      flag = true;

    } catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public boolean deleteUser(int id) {
    boolean flag = false;
    try {
      userDao.deleteUser(id);
      flag = true;

    } catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public User findUserById(int userId) {
    return userDao.findUserById(userId);
  }

  @Override
  public User findUserByName(String userName) {
    return userDao.findUserByName(userName);
  }

  @Override
  public User findUserByAge(int userAge) {
    return userDao.findUserByAge(userAge);
  }

}
