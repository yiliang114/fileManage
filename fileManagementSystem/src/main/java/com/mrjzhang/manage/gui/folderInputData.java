//package com.mrjzhang.manage.gui;
//
//import javax.swing.*;
//import java.awt.*;
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;
//import java.io.File;
//
//import File.*;
//import com.mrjzhang.manage.file.JudgeFilePath;
//
//public class folderInputData extends JLabel {
//
//	GridBagLayout g = new GridBagLayout();
//	GridBagConstraints c = new GridBagConstraints();
//
//
//	public Container returnFolderInputData() throws Exception {
////		super(str);// 标题
////		setSize(400, 500);
////		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//		setLayout(g);
//
//		// 调用方法
//		addComponent();
//		// start.addActionListener(this);// 注册监听器
//		setVisible(true);
////		this.setLocation(null);// 设居中显示;
//		return this;
//	}
//
//	/**
//	 * @throws Exception
//	 *
//	 */
//	JLabel FolderLabel;
//	JLabel pictureFolderLabel;
//	JTextField pictureFolderText;// TextField 图片文件夹的路径
//	JButton folderPictureChooseButton;// 选择
//
//	JLabel curveFolderLabel;
//	JTextField curveFolderText;// TextField 曲线文件夹的路径
//	JButton folderCurveChooseButton;// 选择
//
//	JFileChooser jfc = new JFileChooser();// 文件选择器
//
//	JButton FolderInputButton ;
//	JTextArea result ;
//
//	public void addComponent() throws Exception {
//
//		FolderLabel = new JLabel("批量导入/请选择文件夹:");
//		add(g, c, FolderLabel, 0, 0, 1, 1);
//
//		pictureFolderLabel = new JLabel("图片数据文件夹：");
//		add(g, c, pictureFolderLabel, 0, 1, 1, 1);
//
//		pictureFolderText = new JTextField(10);
//		add(g, c, pictureFolderText, 1, 1, 1, 1);
//
//		folderPictureChooseButton = new JButton("选择");
//		add(g, c, folderPictureChooseButton, 2, 1, 1, 1);
//		// 换行
//		curveFolderLabel = new JLabel("曲线数据文件夹：");
//		add(g, c, curveFolderLabel, 0, 2, 1, 1);
//		// 文件夹输入框
//		curveFolderText = new JTextField(10);
//		add(g, c, curveFolderText, 1, 2, 1, 1);
//		// 选择按钮
//		folderCurveChooseButton = new JButton("选择");
//		add(g, c, folderCurveChooseButton, 2, 2, 1, 1);
//
//		// 文件选择器
//		jfc = new JFileChooser();
//
//		// 添加事件
//		MyActionListener mal = new MyActionListener();
//		folderPictureChooseButton.addActionListener(mal);
//		folderCurveChooseButton.addActionListener(mal);
//
//		// 导入按钮
//		FolderInputButton = new JButton("导入数据库");
//		c.insets = new Insets(7, 0, 4, 0);
//		add(g, c, FolderInputButton, 0, 3, 1, 1);
//
//		// 结果显示文本框
//		result = new JTextArea(10, 50);
//		add(g, c, result, 0, 4, 3, 4);
//		result.setLineWrap(true); // 当字符串太长时，允许自动换行
//
//		FolderInputButton.addActionListener(new ActionListener() {
//
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				// TODO Auto-generated method stub
//				if (e.getSource().equals(FolderInputButton)) {
//					// 插入数据库
//					JudgeFilePath inputFolder = new JudgeFilePath();
//					inputFolder.manageFilePath(pictureFolderText.getText(), curveFolderText.getText());
//					result.setText(inputFolder.getResult());
//				}
//			}
//		});
//
//	}
//
//	// 注册监听器
//	class MyActionListener implements ActionListener {
//		@Override
//		public void actionPerformed(ActionEvent e) {
//			// TODO Auto-generated method stub
//			// 填在文件夹输入框中
//			if (e.getSource().equals(folderPictureChooseButton)) {// 检测定位到open动作
//
//				jfc.setFileSelectionMode(1);// 设定只能选择到文件夹
//				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
//				if (state == 1) {
//					return;
//				} else {
//					File f = jfc.getSelectedFile();// f为选择到的目录
//					pictureFolderText.setText(f.getAbsolutePath());
//
//				}
//			}
//			if (e.getSource().equals(folderCurveChooseButton)) {// 检测定位到open动作
//
//				jfc.setFileSelectionMode(1);// 设定只能选择到文件夹
//				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
//				if (state == 1) {
//					return;
//				} else {
//					File f = jfc.getSelectedFile();// f为选择到的目录
//					curveFolderText.setText(f.getAbsolutePath());
//
//				}
//			}
//
//		}
//
//	}
//
//	public void add(GridBagLayout g, GridBagConstraints c, JComponent jc, int x, int y, int gw, int gh) {
//		c.gridx = x;
//		c.gridy = y;
//		c.anchor = GridBagConstraints.WEST;
//		c.gridwidth = gw;
//		c.gridheight = gh;
//		g.setConstraints(jc, c);
//		add(jc);
//	}
//
//
//
//}