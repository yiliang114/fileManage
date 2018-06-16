//package com.mrjzhang.manage.gui;
//
//import com.mrjzhang.manage.useless.aboutTab;
//
//import javax.swing.*;
//import java.awt.*;
//
//public class index {
//
////java swing 主页面
//
//  // 框架布局
//  JFrame frame = new JFrame("分布式文件更新汇总软件");
//  // 选项卡布
//  JTabbedPane tabPane = new JTabbedPane();
//  // 创建容器
//  Container con = new Container();
//  // 创建容器
//  Container con1 = new Container();
//  // 创建容器
//  Container con2= new Container();
//  // 创建容器
//  Container con3 = new Container();
//
//  index() throws Exception {
//
//
//    double lx = Toolkit.getDefaultToolkit().getScreenSize().getWidth();
//
//    double ly = Toolkit.getDefaultToolkit().getScreenSize().getHeight();
//
//    frame.setLocation(new Point((int) (lx / 2) - 200, (int) (ly / 2) - 250));// 设定窗口出现位置
//    //出现在windows中间
//    frame.setSize(600, 550);// 设定窗口大小
//    frame.setContentPane(tabPane);// 设置布局
//    // tabPane.add(jPanel,"导入");
//    frame.setVisible(true);// 窗口可见
//    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);// 使能关闭窗口，结束程序
////        tabPane.add("导入", con );// 添加布局1
//    tabPane.add(showFileInputData(),"文件导入" );// 添加布局1
//    tabPane.add(showFolderInputData(),"文件夹导入" );// 添加布局1
//    tabPane.add(new gui.TableShow(),"数据库table");
//    tabPane.add(new gui.WrongTableShow(),"数据库wrongtable");
//    tabPane.add(new gui.otherRequirement().returnOtherRequirement(),"其他功能");
//    tabPane.add(aboutTab(),"关于");
//
//  }
//
//  private Container aboutTab() throws Exception {
//    return new aboutTab().returnAboutTab();
//  }
//
//  private Container showFileInputData() throws Exception {
//    return new gui.fileInputData().returnFileInputData();
//  }
//
//  private Container showFolderInputData() throws Exception {
//    return new gui.folderInputData().returnFolderInputData();
//  }
//
//  public static void main(String arg[]) throws Exception{
//    new index();
//  }
//}
//
//
