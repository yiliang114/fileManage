package com.mrjzhang.dao;

import com.mrjzhang.bean.User;
import org.apache.ibatis.annotations.*;

// @Mapper 在接口上添加了这个注解表示这个接口是基于注解实现的CRUD
@Mapper
public interface UserDao {
    // 用户数据新增
    @Insert("insert into t_user(id,name,age) values (#{id},#{name},#{age})")
    void addUser(User user);

    // 用户数据修改
    @Update("update t_user set name=#{name},age=#{age} where id=#{id}")
    void updateUser(User user);

    // 用户数据删除
    @Delete("delete from t_user where id=#{id}")
    void  deleteUser(int id);

    // 根据用户姓名查询用户信息
    @Select("select id,name,age from t_user where name=#{name}")
    // @Param 的作用是啥？
    User findUserByName(@Param("username") String username);

    // 根据用户id查询用户信息
    @Select("select id,name,age from t_user where id=#{userId}")
    // @Param 的作用是啥？  Param:sql条件的字段
    User findUserById(@Param("userId") int userId);

    // 根据用户age查询用户信息
    @Select("select id,name,age from t_user where age=#{userAge}")
    // @Param 的作用是啥？
    User findUserByAge(@Param("userAge") int userAge);
}
