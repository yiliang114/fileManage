package com.mrjzhang.server;

/**
 * Created by @author: mrjzhang on 2018/6/12
 */
public class FtpServerMain {

  //String SERVER_PORT = "9999";
  //String FolderName = "F:\\fileManageWorkspace\\receive";

  DaemonThread daemonThread = new DaemonThread();

  public void start(String SERVER_PORT,String FolderName) {

    daemonThread.setPort(Integer.parseInt(SERVER_PORT));
    daemonThread.setFilePathName(FolderName);
    daemonThread.setDaemon(true);
    daemonThread.start();

    System.out.println("接收文件端口为：" + SERVER_PORT + "\n" + "接收文件的路径为： " + FolderName + "\n");

  }

}
