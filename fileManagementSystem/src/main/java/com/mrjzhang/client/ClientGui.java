package com.mrjzhang.client;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
//import Socket.*;
//import sort.FileListSort;

//127.0.0.1 = localhost 本地
public class ClientGui extends JFrame implements ActionListener {

	GridBagLayout g = new GridBagLayout();
	GridBagConstraints c = new GridBagConstraints();

	ClientGui(String str) {
		super(str);// 标题
		setSize(400, 500);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLayout(g);

		// 调用方法
		addComponent();
		submit.addActionListener(this);// 注册监听器
		setVisible(true);
		setLocationRelativeTo(null);// 设居中显示;
	}

	public void addComponent() {

		// 个人信息登记
		inputInformation = new JLabel("请输入以下信息：");
		add(g, c, inputInformation, 0, 0, 1, 1);

		// 服务器IP
		SERVER_IP = new JLabel("服务器IP：");
		add(g, c, SERVER_IP, 0, 1, 1, 1);
		// 服务器IP输入框
		textSERVER_IP = new JTextField(10);
		add(g, c, textSERVER_IP, 1, 1, 2, 1);

		// 服务器端口
		SERVER_PORT = new JLabel("服务器端口：");
		add(g, c, SERVER_PORT, 0, 2, 1, 1);
		// 服务器端口输入框
		textUserSERVER_PORT = new JTextField(10);
		add(g, c, textUserSERVER_PORT, 1, 2, 2, 1);

		// 文件
		file = new JLabel("文件:");
		add(g, c, file, 0, 3, 1, 1);
		// 文件输入框
		textFile = new JTextField(10);
		add(g, c, textFile, 1, 3, 1, 1);
		// 选择按钮
		open1 = new JButton("选择");
		add(g, c, open1, 2, 3, 1, 1);


		// 文件夹
		folder = new JLabel("文件夹:");
		add(g, c, folder, 0, 4, 1, 1);
		// 文件输入框
		textFolder = new JTextField(10);
		add(g, c, textFolder, 1, 4, 1, 1);
		// 选择按钮
		open2 = new JButton("选择");
		add(g, c, open2, 2, 4, 1, 1);

		// 时间选择器
		circulationTime = new JLabel("自动扫描时间：");
		add(g, c, circulationTime, 0, 5, 1, 1);
		// 时间选择器输入框
		textTime = new JTextField(5);
		add(g, c, textTime, 1, 5, 1, 1);

		// 文件选择器
		jfc = new JFileChooser();

		// 添加事件
		MyActionListener mal = new MyActionListener();
		open1.addActionListener(mal);
		open2.addActionListener(mal);

		// submit按钮
		submit = new JButton("文件夹传输");
		c.insets = new Insets(7, 0, 4, 0);
		add(g, c, submit, 1, 6, 1, 1);
		submit1 = new JButton("文件传输");
		add(g,c,submit1,2,6,1,1);

		result = new JTextArea(15, 20);
		add(g, c, result, 0, 7, 3, 4);

		result.setLineWrap(true); // 当字符串太长时，允许自动换行

		submit1.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				if (e.getSource().equals(submit1)){

					Client client = new Client(textSERVER_IP.getText(),
							Integer.parseInt(textUserSERVER_PORT.getText()), textFile.getText());
					result.setText(textFile.getText()+"传输成功！");
				}
			}
		});
		submit.addActionListener(new ActionListener() {
			// 传输事件
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				if (e.getSource().equals(submit)) {
					// run in 5 second
					//final long timeInterval = 5000;

					Runnable runnable = new Runnable() {
						@Override
						public void run() {
							String lastNewFile = null;// 储存上一个最新的文件名
							while (true) {
								// ------- code for task to run
								// ------- ends here
								FileListSort fileListSort = new FileListSort();
								if (fileListSort.getFilePathName(textFolder.getText()).equals(lastNewFile)) {
									result.setText("没有新文件产生");
								} else {
									result.setText(fileListSort.getFilePathName(textFolder.getText())+"传输成功！");// 都一次执行的语句
									Client client = new Client(textSERVER_IP.getText(),
											Integer.parseInt(textUserSERVER_PORT.getText()), fileListSort.getFilePathName(textFolder.getText()));
								}
								lastNewFile = fileListSort.getFilePathName(textFolder.getText());

								try {
									Thread.sleep(Long.parseLong(textTime.getText()));
								} catch (InterruptedException e) {
									e.printStackTrace();
								}
							}
						}
					};
					Thread thread = new Thread(runnable);
					thread.start();

				}

			}
		}); // 添加事件处理

	}

	// 注册监听器
	class MyActionListener implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent e) {
			// 先判断该路径是文件还是文件夹
			// 填在文件夹输入框中
			if (e.getSource().equals(open2)) {// 检测定位到open动作

				jfc.setFileSelectionMode(1);// 设定只能选择到文件夹
				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
				if (state == 1) {
					return;
				} else {
					File f = jfc.getSelectedFile();// f为选择到的目录
					textFolder.setText(f.getAbsolutePath());

				}
			}
			// 绑定到选择文件，先择文件事件
			if (e.getSource().equals(open1)) {
				jfc.setFileSelectionMode(0);// 设定只能选择到文件
				int state = jfc.showOpenDialog(null);// 此句是打开文件选择器界面的触发语句
				if (state == 1) {
					return;// 撤销则返回
				} else {
					File f = jfc.getSelectedFile();// f为选择到的文件
					textFile.setText(f.getAbsolutePath());
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

	public static void main(String args[]) {
		new ClientGui("文件传输客户端");
	}

	JLabel inputInformation, SERVER_IP, SERVER_PORT;
	JLabel file, folder, circulationTime;
	JTextField textSERVER_IP, textUserSERVER_PORT, textFile, textFolder, textTime;

	JButton submit, open1, open2,submit1;// open按钮，传输按钮
	JTextArea result;
	JFileChooser jfc;// 文件夹选择器

	@Override
	public void actionPerformed(ActionEvent arg0) {


		// 显示在文本框
		String s = textSERVER_IP.getText();
		String t = textUserSERVER_PORT.getText();
		// String k = sexMan.getText();
		// String v = sexGirl.getText();
		// String a = (String) year.getSelectedItem();
		// String b = (String) month.getSelectedItem();
		// String num = "用户名：" + s + "\n" + "密码: " + t + "\n 性别: " + (k == null
		// ? v : k) + "\n" + "出生日期:" + a + " " + b;

		// result.setText(num);
	}

}