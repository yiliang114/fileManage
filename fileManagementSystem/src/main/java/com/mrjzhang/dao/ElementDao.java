package com.mrjzhang.dao;

import com.mrjzhang.bean.Element;
import org.apache.ibatis.annotations.*;

import java.util.List;

// @Mapper 在接口上添加了注解，表示这个接口是基于注解实现的CRUD
@Mapper
public interface ElementDao {
  // 数据添加
  @Insert("insert into fileinfos(id,name,score,picture,curve,create_time,from_ip,status) values (#{id},#{name},#{score},#{picture},#{curve},#{create_time},#{from_ip},#{status})")
  void addElement(Element element);

  // 数据修改
  @Update("update fileinfos set name=#{name},score=#{score},picture=#{picture},curve=#{curve},create_time=#{create_time} where id=#{id}")
  void updateELement(Element element);

  // 数据删除
  @Delete("delete from fileinfos where id=#{id}")
  void  deleteElement(int id);

  // 根据用户姓名查询用户信息
  @Select("select * from fileinfos where name=#{name}")
  // @Param :sql条件的字段
  Element findElementByName(@Param("name") String name);

  // 根据用户id查询用户信息
  @Select("select * from fileinfos where id=#{id}")
  // @Param :sql条件的字段
  Element findElementById(@Param("id") int id);

  // 拉取所有elements 数据
  @Select("select * from fileinfos")
  // @Param :sql条件的字段
  List<Element> getElements();

}
