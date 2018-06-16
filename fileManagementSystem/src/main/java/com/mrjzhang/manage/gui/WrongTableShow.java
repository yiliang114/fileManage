//package com.mrjzhang.manage.gui;
//
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;
//import java.io.File;
//import java.util.ArrayList;
//import java.util.Iterator;
//
//import javax.swing.JButton;
//import javax.swing.JFileChooser;
//import javax.swing.JLabel;
//import javax.swing.JPanel;
//import javax.swing.JScrollPane;
//import javax.swing.JTextField;
//import javax.swing.table.DefaultTableModel;
//
//import com.mrjzhang.manage.file.DeleteData;
//import com.mrjzhang.manage.file.ModifyData;
//import com.mrjzhang.manage.file.CopyFile;
//import org.hibernate.Session;
//
//import com.HibernateSessionFactory;
//import com.mathworks.toolbox.javabuilder.MWException;
//
//import DAO.Element;
//import File.CopyFile;
//import File.DeleteData;
//import File.ModifyData;
//import File.SearchName;
//import imagescMat.imagescMat;
//
//@SuppressWarnings("serial")
//public class WrongTableShow extends JPanel implements ActionListener {
//	private JScrollPane panel;
//	private JButton next, previous, update, delete, desc;
//	private JLabel label1;
//	private WrongElementTable table;
//	// 图片锟斤拷示锟斤拷钮锟斤拷锟斤拷锟斤拷锟斤拷钮锟斤拷锟斤拷锟侥硷拷锟斤拷钮
//	//plotShow锟斤拷示锟斤拷示锟斤拷锟斤拷锟斤拷锟斤拷使锟矫碉拷锟斤拷plot锟斤拷锟斤拷锟斤拷picShow锟斤拷示锟斤拷示锟斤拷锟斤拷图片使锟矫碉拷锟斤拷imagesc锟斤拷锟斤拷
//	private JButton picShow, copy, open1,plotShow,refresh;
//	private JTextField folderPathName;
//	JFileChooser jfc = new JFileChooser();// 锟侥硷拷选锟斤拷锟斤拷
//
//	public WrongTableShow() {
//		// super("锟斤拷锟揭筹拷锟斤拷锟斤拷锟�");
//		initTableData();
//		initComponent();
//	}
//
//	private void initTableData() {
//		// TODO Auto-generated method stub
//		// 锟斤拷始锟斤拷锟斤拷锟斤拷锟斤拷锟捷ｏ拷直锟接达拷锟斤拷锟捷匡拷锟饺�
//		Session session = HibernateSessionFactory.getSession();
//		String hql = "FROM Element e where e.score <-1 or  e.score >1";
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//		// Element.wrongElements = new ArrayList<Element>();
//		Iterator it = results.iterator();
//
//		while (it.hasNext()) {
//			Element element = new Element();
//			Element obj = (Element) it.next();
//			element.setName((obj).getName());
//			element.setScore((obj).getScore());
//			element.setPicture((obj).getPicture());
//			element.setCurve((obj).getCurve());
//			Element.wrongElements.add(element);
//
//		}
//
//	}
//
//	private void initTableDataDESC() {
//
//		Session session = HibernateSessionFactory.getSession();
//		String hql = "FROM Element e where e.score <-1 or  e.score >1 ORDER BY e.score DESC";
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//		// Element.wrongElements = new ArrayList<Element>();
//		Iterator it = results.iterator();
//
//		while (it.hasNext()) {
//			Element element = new Element();
//			Element obj = (Element) it.next();
//			element.setName((obj).getName());
//			element.setScore((obj).getScore());
//			element.setPicture((obj).getPicture());
//			element.setCurve((obj).getCurve());
//			Element.wrongElements.add(element);
//
//		}
//	}
//
//	private void initComponent() {
//		this.setSize(600, 500);
//		table = new WrongElementTable();
//		panel = new JScrollPane(table);
//		panel.setBounds(10, 10, 550, 330);
//		desc = new JButton("DESC");
//		desc.setBounds(50, 400, 75, 20);
//		previous = new JButton("锟斤拷一页");
//		previous.setBounds(150, 400, 75, 20);
//		next = new JButton("锟斤拷一页");
//		next.setBounds(255, 400, 75, 20);
//		delete = new JButton("删锟斤拷");
//		delete.setBounds(350, 400, 65, 20);
//		update = new JButton("锟斤拷锟斤拷");
//		update.setBounds(420, 400, 65, 20);
//
//		picShow = new JButton("锟斤拷示图片");
//		picShow.setBounds(50, 430, 90, 20);
//		refresh = new JButton("刷锟斤拷");
//		refresh.setBounds(450, 360, 65, 20);
//
//		copy = new JButton("锟斤拷锟斤拷");
//		copy.setBounds(160, 430, 65, 20);
//		open1 = new JButton("锟斤拷");
//		open1.setBounds(420, 430, 65, 20);
//		plotShow = new JButton("锟斤拷锟斤拷锟斤拷锟斤拷");
//		plotShow.setBounds(350, 360, 90, 20);
//
//		folderPathName = new JTextField(50);
//		folderPathName.setBounds(230, 430, 180, 22);
//		previous.addActionListener(this);
//		next.addActionListener(this);
//		delete.addActionListener(this);
//		update.addActionListener(this);
//		desc.addActionListener(this);
//		picShow.addActionListener(this);
//		copy.addActionListener(this);
//		open1.addActionListener(this);
//		plotShow.addActionListener(this);
//		refresh.addActionListener(this);
//
//		label1 = new JLabel("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//		label1.setBounds(150, 360, 200, 20);
//		setLayout(null);
//		add(panel);
//		add(desc);
//		add(previous);
//		add(next);
//		add(update);
//		add(delete);
//		add(label1);
//		add(picShow);
//		add(copy);
//		add(open1);
//		add(folderPathName);
//		add(refresh);
//
//		setVisible(true);
//	}
//
//	/**
//	 * 锟斤拷钮锟铰硷拷
//	 */
//	public void actionPerformed(ActionEvent e) {
//		// TODO Auto-generated method stub
//		JButton button = (JButton) e.getSource();
//		if (button.equals(desc)) {
//			Element.wrongElements = new ArrayList<Element>();
//			initTableDataDESC();
//			table.wrongElements = Element.wrongElements;
//			table.initTable();
//			label1.setText("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//			return;
//		}
//		if (button.equals(previous)) {
//			int i = table.getPreviousPage();
//			if (i == -1)
//				return;
//		}
//		if (button.equals(next)) {
//			int i = table.getNextPage();
//			if (i == -1)
//				return;
//		}
//		if (button.equals(picShow)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String pathName = (String) table.getValueAt(i, 2);
//			imagescMat m;
//			try {
//				m = new imagescMat();
//				m.imagescMat(pathName);
//			} catch (MWException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//
//		}
//
//		if (button.equals(picShow)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String pathName = (String) table.getValueAt(i, 2);
//			imagescMat m;
//			try {
//				m = new imagescMat();
//				m.imagescMat(pathName);
//			} catch (MWException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//
//		}
//		if (button.equals(copy)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String picPathName = (String) table.getValueAt(i, 2);
//			String CurPathName = (String) table.getValueAt(i, 3);
//			CopyFile copyFile = new CopyFile();
//			int j = 0;
//			j = picPathName.lastIndexOf("\\") + 1;
//			String temp = null;
//			temp = picPathName.substring(j, picPathName.length());
//			String afterPicPathName = folderPathName.getText() + "\\" + temp;
//			copyFile.copyFile(picPathName, afterPicPathName);
//
//			j = CurPathName.lastIndexOf("\\") + 1;
//			temp = CurPathName.substring(j, CurPathName.length());
//			String afterCurPathName = folderPathName.getText() + "\\" + temp;
//			copyFile.copyFile(CurPathName, afterCurPathName);
//		}
//		if (button.equals(open1)) {
//			jfc.setFileSelectionMode(1);// 锟借定只锟斤拷选锟斤拷锟侥硷拷锟斤拷
//			int state = jfc.showOpenDialog(null);// 锟剿撅拷锟角达拷锟侥硷拷选锟斤拷锟斤拷锟斤拷锟斤拷拇锟斤拷锟斤拷锟斤拷
//			if (state == 1) {
//				return;
//			} else {
//				File f = jfc.getSelectedFile();// f为选锟今到碉拷目录
//				folderPathName.setText(f.getAbsolutePath());
//
//			}
//		}
//		if (button.equals(delete)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String name = (String) table.getValueAt(i, 0);
//			if (name == null)
//				return;
//			Element s = null;
//			for (Element ele : Element.wrongElements) {
//				if (ele.getName().equals(name))
//					s = ele;
//			}
//			int index = Element.wrongElements.indexOf(s);
//			Element.wrongElements.remove(index);
//
//			// 锟斤拷锟斤拷锟斤拷锟节讹拷锟斤拷锟斤拷删锟斤拷锟斤拷锟斤拷锟斤拷
//			DeleteData d = new DeleteData();
//			d.delete(s.getName());
//			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟捷匡拷锟斤拷也锟斤拷锟斤拷息删锟斤拷锟斤拷
//			table.initTable();
//			label1.setText("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//			return;
//		}
//		if (button.equals(update)) {
//
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String name = (String) table.getValueAt(i, 0);
//			double score = Double.parseDouble((String) table.getValueAt(i, 1));
//
//			if (name == null)
//				return;
//			Element s = null;
//			for (Element ele : Element.wrongElements) {
//				if (ele.getName().equals(name)) {
//					s = ele;
//					s.setScore(score);
//				}
//			}
//			int index = Element.wrongElements.indexOf(s);
//			Element.wrongElements.set(index, s);
//			new ModifyData().modifyData(name, score);
//			Element.wrongElements = new ArrayList<Element>();
//			initTableData();
//			table.wrongElements = Element.wrongElements;
//			table.initTable();
//			label1.setText("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//			return;
//		}
//
//		if (button.equals(refresh)) {
//
//			Element.wrongElements = new ArrayList<Element>();
//			initTableData();
//			table.wrongElements = Element.wrongElements;
//			table.initTable();
//			label1.setText("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//			return;
//		}
//
//		DefaultTableModel model = new DefaultTableModel(table.getPageData(), table.columnNames);
//		table.setModel(model);
//		label1.setText("锟杰癸拷" + table.totalRowCount + "锟斤拷录|锟斤拷前锟斤拷" + table.currentPage + "页");
//	}
//}