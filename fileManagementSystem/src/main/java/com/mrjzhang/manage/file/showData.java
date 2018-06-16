//package com.mrjzhang.manage.file;
//import java.util.Iterator;
//
//import com.mrjzhang.bean.Element;
//import org.hibernate.Session;
//import com.HibernateSessionFactory;
////
////直接显示数据库中已存入的信息
////
//public class showData {
//	public  void show(){
//		Session session = HibernateSessionFactory.getSession();
//		String hql = "FROM Element e ";
//		//String hql = "FROM Element e WHERE e.name IS NOT NULL ";
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//
//		Iterator it = results.iterator();
//		int i =0;
//		while(it.hasNext()){
//
//			Element obj = (Element) it.next();
//			System.out.println("name:"+(obj).getName()+"    "+"score:"+(obj).getScore());
//			System.out.println("\n");
//			//显示数据库中信息
//			i++;
//		}
//		//
//		//显示数据库中已存入的信息的条数
//		//
//		System.out.println("total:"+i);
//
//		session.close();
//	}
//
////	useless getElements
//}
