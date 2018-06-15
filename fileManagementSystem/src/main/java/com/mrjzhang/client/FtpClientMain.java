package com.mrjzhang.client;

import jxl.write.Boolean;

import java.util.List;

/**
 * Created by @author: mrjzhang on 2018/6/12
 */
public class FtpClientMain {

  public void start(String SERVER_IP,String SERVER_PORT,String scoreFileName) {
    Client client = new Client(SERVER_IP,
        Integer.parseInt(SERVER_PORT), scoreFileName);
    System.out.println("传输成功！");
  }

  public void multifileStart(String SERVER_IP,String SERVER_PORT,String textFolder,int scanInterval) {
    Runnable runnable = new Runnable() {
      @Override
      public void run() {
        // 储存上一个最新的文件名
        String lastNewFile = null;
        // 能够返回最新的文件名称
        FileListSort fileListSort = new FileListSort();

        // 首先将文件夹中的所有文件先进行汇总处理
        List<String> files = fileListSort.getAllFile(textFolder,true);

        for (int i = 0; i < files.size(); i++) {
          Client client = new Client(SERVER_IP,
              Integer.parseInt(SERVER_PORT), files.get(i));
        }
        System.out.println("文件夹中已存在文件汇总储存完毕。。。");

        while (true) {

          if (fileListSort.getFilePathName(textFolder).equals(lastNewFile)) {
            // 最好能够给服务端信息返回
            System.out.println("没有新文件产生");
          } else {
            // 都一次执行的语句
            // System.out.println("传输文件：" + fileListSort.getFilePathName(textFolder));
            // result.setText(fileListSort.getFilePathName(textFolder.getText())+"传输成功！");
            // 最好能够给服务端信息返回
            Client client = new Client(SERVER_IP,
                Integer.parseInt(SERVER_PORT), fileListSort.getFilePathName(textFolder));
          }
          lastNewFile = fileListSort.getFilePathName(textFolder);

          try {
            // 时间间隔自动扫描
            Thread.sleep(scanInterval);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      }
    };
    Thread thread = new Thread(runnable);
    thread.start();
    System.out.println("传输成功！");
  }



}
