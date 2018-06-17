//package com.mrjzhang.manage.file;
//
//import java.util.Iterator;
//
//import com.mrjzhang.bean.Element;
//import org.hibernate.Session;
//import com.HibernateSessionFactory;
//
////
////直接显示数据库中已存入的信息
////
//public class SearchName {
//	public  void search(String Filename){
//		Session session = HibernateSessionFactory.getSession();
//		Filename= "'"+Filename+ "'";
//		String hql = "FROM Element E WHERE E.name = "+Filename;
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//
//		Iterator it = results.iterator();
//
//		while(it.hasNext()){
//
//			Element obj = (Element) it.next();
//			System.out.println("name:"+(obj).getName()+"\n"+"score:"+(obj).getScore()+"\n"
//					+"picture:"+(obj).getPicture()+"\n"+"curve:"+(obj).getCurve());
//			//显示数据库中信息
//		}
//
//		session.close();
//	}
//	public  String searchOut(String Filename){
//		Session session = HibernateSessionFactory.getSession();
//		Filename= "'"+Filename+ "'";
//		String hql = "FROM Element E WHERE E.name = "+Filename;
//		String result = null;
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//
//		Iterator it = results.iterator();
//
//		while(it.hasNext()){
//
//			Element obj = (Element) it.next();
//			result = "name:"+(obj).getName()+"\n"+"score:"+(obj).getScore()+"\n"
//					+"picture:"+(obj).getPicture()+"\n"+"curve:"+(obj).getCurve();
//			//显示数据库中信息
//		}
//
//		session.close();
//		return result;
//	}
//
////	useless 这是 api 中的find element
//}
