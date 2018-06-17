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
//import imagescMat.imagescMat;
////import plotData.plotData;
//
//@SuppressWarnings("serial")
//public class TableShow extends JPanel implements ActionListener {
//	private JScrollPane panel;
//	private JButton next, previous, update, delete,desc;
//	private JLabel label1;
//	private ElementTable table;
//	//plotShow表示显示力矩曲线使用的是plot函数，picShow表示显示的是图片使用的是imagesc函数
//	private JButton picShow, copy, open1,plotShow,refresh;
//
//	private JTextField folderPathName;
//	JFileChooser jfc = new JFileChooser();// 文件选择器
//
//	public TableShow() {
//		// super("表分页及操作");
//		initTableData();
//		initComponent();
//	}
//
//	private void initTableData() {
//		// 初始化表格的内容，直接从数据库读取
//		Session session = HibernateSessionFactory.getSession();
//		String hql = "FROM Element e ";
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//
//		Iterator it = results.iterator();
//
//		while (it.hasNext()) {
//			Element element = new Element();
//			Element obj = (Element) it.next();
//			element.setName((obj).getName());
//			element.setScore((obj).getScore());
//			element.setPicture((obj).getPicture());
//			element.setCurve((obj).getCurve());
//			// 添加到队列中
//			Element.elements.add(element);
//
//		}
//
//	}
//	private void initTableDataDESC() {
//		// 初始化表格的内容，直接从数据库读取
//		Session session = HibernateSessionFactory.getSession();
//		String hql = "FROM Element e ORDER BY e.score DESC";
//
//		org.hibernate.Query query = session.createQuery(hql);
//		java.util.List results = query.list();
//
//		Iterator it = results.iterator();
//
//		while (it.hasNext()) {
//			Element element = new Element();
//			Element obj = (Element) it.next();
//			element.setName((obj).getName());
//			element.setScore((obj).getScore());
//			element.setPicture((obj).getPicture());
//			element.setCurve((obj).getCurve());
//			// 添加到队列中
//			Element.elements.add(element);
//
//		}
//
//	}
//
//	private void initComponent() {
//		this.setSize(600, 500);
//		table = new ElementTable();
//		panel = new JScrollPane(table);
//		panel.setBounds(10, 10, 550, 330);
//		desc = new JButton("DESC");
//		desc.setBounds(45, 400, 75, 20);
//		previous = new JButton("上一页");
//		previous.setBounds(150, 400, 75, 20);
//		next = new JButton("下一页");
//		next.setBounds(255, 400, 75, 20);
//		update = new JButton("更新");
//		update.setBounds(350, 400, 65, 20);
//		delete = new JButton("删除");
//		delete.setBounds(420, 400, 65, 20);
//
//		picShow = new JButton("显示图片");
//		picShow.setBounds(50, 430, 90, 20);
//
//		copy = new JButton("拷贝");
//		copy.setBounds(160, 430, 65, 20);
//		open1 = new JButton("打开");
//		open1.setBounds(420, 430, 65, 20);
//		plotShow = new JButton("力矩曲线");
//		plotShow.setBounds(350, 360, 90, 20);
//		refresh = new JButton("刷新");
//		refresh.setBounds(450, 360, 65, 20);
//
//		folderPathName = new JTextField(50);
//		folderPathName.setBounds(230, 430, 180, 22);
//		previous.addActionListener(this);
//		next.addActionListener(this);
//		update.addActionListener(this);
//		delete.addActionListener(this);
//		desc.addActionListener(this);
//		picShow.addActionListener(this);
//		copy.addActionListener(this);
//		open1.addActionListener(this);
//		plotShow.addActionListener(this);
//		refresh.addActionListener(this);
//
//		label1 = new JLabel("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
//		label1.setBounds(150, 360, 200, 20);
//		setLayout(null);
//		add(panel);
//		add(desc);
//		add(previous);
//		add(next);
//		add(delete);
//		add(label1);
//		add(update);
//		add(picShow);
//		add(copy);
//		add(open1);
//		add(folderPathName);
//		add(plotShow);
//		add(refresh);
//
//		setVisible(true);
//	}
//
//	/**
//	 * 按钮事件
//	 */
//	public void actionPerformed(ActionEvent e) {
//		JButton button = (JButton) e.getSource();
//		if (button.equals(desc)) {
//			Element.elements = new ArrayList<Element>();
//			initTableDataDESC();
//			table.elements = Element.elements;
//			table.initTable();
//			label1.setText("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
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
//				e1.printStackTrace();
//			}
//
//		}
//
//		if (button.equals(plotShow)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String pathName = (String) table.getValueAt(i, 3);
////			plotData p;
////			try {
////				p = new plotData();
////				p.plotData(pathName);
////			} catch (MWException e1) {
////				e1.printStackTrace();
////			}
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
//			jfc.setFileSelectionMode(1);// 设定只能选择到文件夹
//			int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
//			if (state == 1) {
//				return;
//			} else {
//				File f = jfc.getSelectedFile();// f为选择到的目录
//				folderPathName.setText(f.getAbsolutePath());
//
//			}
//		}
//
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
//			for (Element ele : Element.elements) {
//				if (ele.getName().equals(name)) {
//					s = ele;
//					s.setScore(score);
//				}
//			}
//			int index = Element.elements.indexOf(s);
//			Element.elements.set(index, s);
//			new ModifyData().modifyData(name, score);
//			Element.elements = new ArrayList<Element>();
//			initTableData();
//			table.elements = Element.elements;
//			table.initTable();
//			label1.setText("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
//			return;
//		}
//
//		if (button.equals(refresh)) {
//
//			Element.elements = new ArrayList<Element>();
//			initTableData();
//			table.elements = Element.elements;
//			table.initTable();
//			label1.setText("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
//			return;
//		}
//		if (button.equals(delete)) {
//			int i = table.getSelectedRow();
//			if (i == -1)
//				return;
//			String name = (String) table.getValueAt(i, 0);
//			if (name == null)
//				return;
//			Element s = null;
//			for (Element ele : Element.elements) {
//				if (ele.getName().equals(name))
//					s = ele;
//			}
//			int index = Element.elements.indexOf(s);
//			Element.elements.remove(index);
//
//			// 仅仅是在队列中删除了数据
//			DeleteData d = new DeleteData();
//			d.delete(s.getName());
//			// 这样是在数据库中也将信息删除了
//			table.initTable();
//			label1.setText("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
//			return;
//		}
//
//		DefaultTableModel model = new DefaultTableModel(table.getPageData(), table.columnNames);
//		table.setModel(model);
//		label1.setText("总共" + table.totalRowCount + "记录|当前第" + table.currentPage + "页");
//	}
//
//	/**
//	 * @param args
//	 */
//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//		new TableShow();
//	}
//}