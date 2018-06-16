package com.mrjzhang.manage.useless;

import javax.swing.*;

import java.awt.*;

public class aboutTab extends JLabel {

	GridBagLayout g = new GridBagLayout();
	GridBagConstraints c = new GridBagConstraints();

	public Container returnAboutTab() throws Exception {
		setLayout(g);
		// 调用方法
		addComponent();
		setVisible(true);
		return this;
	}

	JLabel about, nameJLabel, name, addressJLabel, address, phoneJLabel, phone;

	public void addComponent() throws Exception {

		about = new JLabel("关于:");
		add(g, c, about, 0, 0, 1, 1);

		nameJLabel = new JLabel("作者:");
		add(g, c, nameJLabel, 0, 1, 1, 1);

		name = new JLabel("张志坚");
		add(g, c, name, 1, 1, 1, 1);

		addressJLabel = new JLabel("单位：");
		add(g, c, addressJLabel, 0, 2, 1, 1);

		address = new JLabel("浙江工业大学");
		add(g, c, address, 1, 2, 1, 1);

		phoneJLabel = new JLabel("联系电话：");
		add(g, c, phoneJLabel, 0, 3, 1, 1);

		phone = new JLabel("18158501703");
		add(g, c, phone, 1, 3, 1, 1);

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