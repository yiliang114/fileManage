package com.mrjzhang.client;

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
        while (true) {
          // 能够返回最新的文件名称
          FileListSort fileListSort = new FileListSort();
          if (fileListSort.getFilePathName(textFolder).equals(lastNewFile)) {
            //result.setText("没有新文件产生");
            System.out.println("没有新文件产生");

          } else {
            // 都一次执行的语句
            //System.out.println("传输文件：" + fileListSort.getFilePathName(textFolder));
            //result.setText(fileListSort.getFilePathName(textFolder.getText())+"传输成功！");
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
