//package com.mrjzhang.manage.file;
//
//import java.util.Iterator;
//
//import com.mrjzhang.bean.Element;
//import org.hibernate.Session;
//import com.HibernateSessionFactory;
//
///**
// * Created by @author: mrjzhang on 2018/6/16
// */
////
////按照分数降序方式显示数据库中已存入的信息
////
//public class showDataDESC {
//  public  void show(){
//    Session session = HibernateSessionFactory.getSession();
//    String hql = "FROM Element e ORDER BY e.score DESC";
//    //String hql = "FROM Element e WHERE e.name IS NOT NULL ORDER BY e.score DESC";
//
//    org.hibernate.Query query = session.createQuery(hql);
//    java.util.List results = query.list();
//
//    Iterator it = results.iterator();
//    int i =0;
//    while(it.hasNext()){
//
//      Element obj = (Element) it.next();
//      System.out.println("name:"+(obj).getName()+"    "+"score:"+(obj).getScore());
//      System.out.println("\n");
//      //显示数据库中信息按照分数排行
//      i++;
//    }
//    //
//    //显示数据库中已存入的信息的条数
//    //
//    System.out.println("total:"+i);
//
//    session.close();
//  }
//
////  useless getElements 排序
//}
