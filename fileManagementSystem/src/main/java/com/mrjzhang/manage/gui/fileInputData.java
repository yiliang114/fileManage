package com.mrjzhang.manage.gui;

import javax.swing.*;

import File.JudgeFilePath;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

import File.*;
import com.mrjzhang.manage.file.JudgeFile;
import com.mrjzhang.manage.file.SearchName;

public class fileInputData extends JLabel {

	GridBagLayout g = new GridBagLayout();
	GridBagConstraints c = new GridBagConstraints();

	public Container returnFileInputData() throws Exception {
		setLayout(g);
		// 调用方法
		addComponent();
		setVisible(true);
		return this;
	}

	/**
	 * @throws Exception
	 *
	 */
	JLabel FileLabel;
	JLabel pictureFileLabel, findNameLabel;
	JTextField pictureFileText, findNameText;// TextField 图片文件夹的路径
	JButton FilePictureChooseButton;// 选择

	JLabel curveFileLabel;
	JTextField curveFileText;// TextField 曲线文件夹的路径
	JButton FileCurveChooseButton;// 选择

	JFileChooser jfc = new JFileChooser();// 文件选择器

	JButton FileInputButton, findNameButton;
	JTextArea result;

	public void addComponent() throws Exception {

		FileLabel = new JLabel("单条导入/请选择文件:");
		add(g, c, FileLabel, 0, 0, 1, 1);

		pictureFileLabel = new JLabel("图片数据文件：");
		add(g, c, pictureFileLabel, 0, 1, 1, 1);

		pictureFileText = new JTextField(10);
		add(g, c, pictureFileText, 1, 1, 1, 1);

		FilePictureChooseButton = new JButton("选择");
		add(g, c, FilePictureChooseButton, 2, 1, 1, 1);
		// 换行
		curveFileLabel = new JLabel("曲线数据文件：");
		add(g, c, curveFileLabel, 0, 2, 1, 1);
		// 文件夹输入框
		curveFileText = new JTextField(10);
		add(g, c, curveFileText, 1, 2, 1, 1);
		// 选择按钮
		FileCurveChooseButton = new JButton("选择");
		add(g, c, FileCurveChooseButton, 2, 2, 1, 1);

		// 文件选择器
		jfc = new JFileChooser();

		// 添加事件
		MyActionListener mal = new MyActionListener();
		FilePictureChooseButton.addActionListener(mal);
		FileCurveChooseButton.addActionListener(mal);

		// 导入按钮
		FileInputButton = new JButton("导入数据库");
		c.insets = new Insets(7, 0, 4, 0);
		add(g, c, FileInputButton, 0, 3, 1, 1);
		// 换行
		findNameLabel = new JLabel("搜索数据记录：");
		add(g, c, findNameLabel, 0, 4, 1, 1);
		// 文件夹输入框
		findNameText = new JTextField(10);
		add(g, c, findNameText, 1, 4, 1, 1);
		// 选择按钮
		findNameButton = new JButton("搜索");
		add(g, c, findNameButton, 2, 4, 1, 1);

		// 结果显示文本框
		result = new JTextArea(10, 50);
		add(g, c, result, 0, 5, 3, 4);
		result.setLineWrap(true); // 当字符串太长时，允许自动换行

		FileInputButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (e.getSource().equals(FileInputButton)) {

					// 插入数据库
					JudgeFile input = new JudgeFile();
					input.manageFile(pictureFileText.getText(), curveFileText.getText());
					result.setText(input.getResult());
				}
			}
		});
		findNameButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub
				if (arg0.getSource().equals(findNameButton)) {
					SearchName searchName = new SearchName();
					result.setText(searchName.searchOut(findNameText.getText()));

				}
			}
		});

	}

	// 注册监听器
	class MyActionListener implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			// 填在文件夹输入框中
			if (e.getSource().equals(FilePictureChooseButton)) {// 检测定位到open动作

				jfc.setFileSelectionMode(0);// 设定只能选择到文件夹
				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
				if (state == 1) {
					return;
				} else {
					File f = jfc.getSelectedFile();// f为选择到的目录
					pictureFileText.setText(f.getAbsolutePath());

				}
			}
			if (e.getSource().equals(FileCurveChooseButton)) {// 检测定位到open动作

				jfc.setFileSelectionMode(0);// 设定只能选择到文件夹
				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
				if (state == 1) {
					return;
				} else {
					File f = jfc.getSelectedFile();// f为选择到的目录
					curveFileText.setText(f.getAbsolutePath());

				}
			}

		}

	}

	public void add(GridBagLayout g, GridBagConstraints c, JComponent jc, int x, int y, int gw, int gh) {
		c.gridx = x;
		c.gridy = y;
		c.anchor = GridBagConstraints.WEST;
		c.gridwidth = gw;
		c.gridheight = gh;
		g.setConstraints(jc, c);
		add(jc);
	}

}