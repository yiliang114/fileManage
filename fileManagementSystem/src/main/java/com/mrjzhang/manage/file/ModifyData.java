//package com.mrjzhang.manage.file;
//
//import org.hibernate.*;
//import org.hibernate.Session;
//
//import com.HibernateSessionFactory;
//import DAO.Element;
////修改数据
//public class ModifyData {
//
//	public void modifyData(String name,double score){
//
//		Session session =  HibernateSessionFactory.getSession();
//		session.beginTransaction();
//		String hql ="update Element e set e.score =" +"'"+score+"'"+"where e.name ="+"'"+name+"'";
//		Query query = session.createQuery(hql);
//		query.executeUpdate();
//		session.getTransaction().commit();
//
//
//	}
//	public static void main(String[] args) {
//		new ModifyData().modifyData("parabolarBlade500sl1000sh-100cx-50cy", 0.01);
//	}
//
////  useless 直接通过发送http请求来修改
//}
