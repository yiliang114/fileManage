//package com.mrjzhang.manage.file;
//
//import org.hibernate.Query;
//import org.hibernate.Session;
//
//public class DeleteData {
//	public void delete(String name){
//
//		Session session =  HibernateSessionFactory.getSession();
//        session.beginTransaction();
//        String hql ="delete from Element where name ="+"'"+name+"'";
//        Query query = session.createQuery(hql);
//        query.executeUpdate();
//        session.getTransaction().commit();
//
//	}
//	public static void main(String[] args) {
//		new DeleteData().delete("parabolarBlade500sl1000sh-100cx-100cy");
//	}
//
////	 useless
//}
