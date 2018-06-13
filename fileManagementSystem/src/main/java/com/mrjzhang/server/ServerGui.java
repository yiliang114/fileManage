package com.mrjzhang.server;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

public class ServerGui extends JFrame  {

	GridBagLayout g = new GridBagLayout();
	GridBagConstraints c = new GridBagConstraints();

	ServerGui(String str) throws Exception {
		super(str);// 标题
		setSize(400, 500);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLayout(g);

		// 调用方法
		addComponent();
		//start.addActionListener(this);// 注册监听器
		setVisible(true);
		setLocationRelativeTo(null);// 设居中显示;
	}

	/**
	 * @throws Exception
	 *
	 */
	public void addComponent() throws Exception {

		// 个人信息登记
		inputInformation = new JLabel("请输入以下信息：");
		add(g, c, inputInformation, 0, 0, 1, 1);

		// 接收文件端口
		PORT = new JLabel("接收文件端口：");
		add(g, c, PORT, 0, 1, 1, 1);
		// 接收文件端口
		textPORT = new JTextField(10);
		add(g, c, textPORT, 1, 1, 2, 1);

		// 接收文件文件夹设置
		folder = new JLabel("接收文件夹：");
		add(g, c, folder, 0, 2, 1, 1);
		// 文件夹输入框
		textFolder = new JTextField(10);
		add(g, c, textFolder, 1, 2, 1, 1);
		// 选择按钮
		open = new JButton("选择");
		add(g, c, open, 2, 2, 1, 1);

		// 文件选择器
		jfc = new JFileChooser();

		// 添加事件
		MyActionListener mal = new MyActionListener();
		open.addActionListener(mal);
		// stop.addActionListener(mal);

		// start按钮
		start = new JButton("启动");
		c.insets = new Insets(7, 0, 4, 0);
		add(g, c, start, 0, 3, 1, 1);
		// 停止按钮
		stop = new JButton("停止");
		//add(g, c, stop, 1, 3, 1, 1);
		// 结果显示文本框
		result = new JTextArea(15, 20);
		add(g, c, result, 0, 4, 3, 4);
		result.setLineWrap(true); // 当字符串太长时，允许自动换行


		start.addActionListener(new ActionListener() {
			// 传输事件
			@Override
			public void actionPerformed(ActionEvent e) {
				// filePathName 路径（只是个文件夹名）

				//这个地方已经将服务器线程和按钮事件线程分为两个线程，不再冲突
				if (e.getSource().equals(start)) {
					// 开启服务器
					String filePathName = textFolder.getText();
					int port = Integer.parseInt(textPORT.getText());
					DaemonThread test = new DaemonThread();
					test.setPort(port);
					test.setFilePathName(filePathName);
					test.setPort(port);
					test.setDaemon(true);
					//在start之后再设置为守护线程的话，就会抛出异常，线程是正常工作的，只是不再是守护线程
					test.start();

					// 显示在文本框
					String num = "接收文件端口为：" + port + "\n" + "接收文件的路径为： " + filePathName + "\n";
					result.setText(num);

				}

			}
		});

	}

	// 注册监听器
	class MyActionListener implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent e) {
			// 填在文件夹输入框中
			if (e.getSource().equals(open)) {// 检测定位到open动作

				jfc.setFileSelectionMode(1);// 设定只能选择到文件夹
				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
				if (state == 1) {
					return;
				} else {
					File f = jfc.getSelectedFile();// f为选择到的目录
					textFolder.setText(f.getAbsolutePath());

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

	JLabel inputInformation, PORT;
	JLabel folder, circulationTime;
	JTextField textPORT, textFolder, time;

	JButton start, open, stop;// open按钮，传输按钮
	JTextArea result;
	JFileChooser jfc;// 文件夹选择器


	public static void main(String args[]) throws Exception {
		ServerGui serverGui = new ServerGui("文件接收服务器端");
		//在这个main线程执行完servergui之后 创建一个线程用于传输文件
	}

}