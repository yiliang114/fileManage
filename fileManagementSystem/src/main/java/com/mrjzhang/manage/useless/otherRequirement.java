//package com.mrjzhang.manage.gui;
//
//import javax.swing.*;
//import File.JudgeFilePath;
//import com.mrjzhang.manage.file.DbToExcel;
//import com.mrjzhang.manage.file.ModifyData;
//import gui.fileInputData.MyActionListener;
//
//import java.awt.*;
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;
//import java.io.File;
//
//import File.*;
//
//public class otherRequirement extends JLabel {
//
//	GridBagLayout g = new GridBagLayout();
//	GridBagConstraints c = new GridBagConstraints();
//
//	public Container returnOtherRequirement() throws Exception {
//		setLayout(g);
//		// 调用方法
//		addComponent();
//		setVisible(true);
//		return this;
//	}
//
//	/**
//	 * @throws Exception
//	 *
//	 */
//	JLabel DataToExcelLabel, ModifyDataScore, ExcelPath, ModifyDataLabel, ModifyDataName;
//	JButton ExcelPathChooseButton;// 选择
//	JTextField ExcelPathText, ModifyDataScoreText, ModifyDataNameText;
//
//	JFileChooser jfc = new JFileChooser();// 文件选择器
//
//	JButton DataOutButton, alterButton;
//
//
//	public void addComponent() throws Exception {
//		DataToExcelLabel = new JLabel("导出数据到excel文件:");
//		add(g, c, DataToExcelLabel, 0, 0, 1, 1);
//
//		ExcelPath = new JLabel("excel文件路径：");
//		add(g, c, ExcelPath, 0, 1, 1, 1);
//
//		ExcelPathText = new JTextField(10);
//		add(g, c, ExcelPathText, 1, 1, 1, 1);
//
//		ExcelPathChooseButton = new JButton("选择");
//		add(g, c, ExcelPathChooseButton, 2, 1, 1, 1);
//		// 换行
//		// 导出按钮
//		DataOutButton = new JButton("导出");
//		c.insets = new Insets(7, 0, 4, 0);
//		add(g, c, DataOutButton, 0, 2, 1, 1);
//		// 换行
//		ModifyDataLabel = new JLabel("修改数据库内容：");
//		add(g, c, ModifyDataLabel, 0, 3, 1, 1);
//		ModifyDataName = new JLabel("修改数据名称：");
//		add(g, c, ModifyDataName, 0, 4, 1, 1);
//		ModifyDataNameText = new JTextField(10);
//		add(g, c, ModifyDataNameText, 1, 4, 1, 1);
//		//
//		ModifyDataScore = new JLabel("修改数据分数：");
//		add(g, c, ModifyDataScore, 0, 5, 1, 1);
//		ModifyDataScoreText = new JTextField(5);
//		add(g, c, ModifyDataScoreText, 1, 5, 1, 1);
//		// 导出按钮
//		alterButton = new JButton("修改");
//		c.insets = new Insets(7, 0, 4, 0);
//		add(g, c, alterButton, 0, 6, 1, 1);
//
//		// 文件选择器
//		jfc = new JFileChooser();
//		// 添加事件
//		MyActionListener mal = new MyActionListener();
//		ExcelPathChooseButton.addActionListener(mal);
//
//
//
//		DataOutButton.addActionListener(new ActionListener() {
//
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				// TODO Auto-generated method stub
//				if (e.getSource().equals(DataOutButton)) {
//					DbToExcel dbToExcel = new DbToExcel();
//					dbToExcel.outDbToExcel(ExcelPathText.getText());
//					// 选择excel文件进行数据库数据的输出
//				}
//			}
//		});
//		alterButton.addActionListener(new ActionListener() {
//
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				// TODO Auto-generated method stub
//				if (e.getSource().equals(alterButton)) {
//					ModifyData m = new ModifyData();
//					m.modifyData(ModifyDataNameText.getText(), Double.parseDouble(ModifyDataScoreText.getText()));
//					//修改有错误的数据的分数
//					//因为图片和曲线路径都是不会错误的
//
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
//			if (e.getSource().equals(ExcelPathChooseButton)) {// 检测定位到open动作
//
//				jfc.setFileSelectionMode(0);// 设定只能选择到文件
//				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
//				if (state == 1) {
//					return;
//				} else {
//					File f = jfc.getSelectedFile();// f为选择到的目录
//					ExcelPathText.setText(f.getAbsolutePath());
//				}
//			}
//		}
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
