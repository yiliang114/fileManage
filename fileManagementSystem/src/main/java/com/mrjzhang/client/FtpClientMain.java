package com.mrjzhang.client;

/**
 * Created by @author: mrjzhang on 2018/6/12
 */
public class FtpClientMain {

  public void start(String CLIENT_IP,String SERVER_PORT,String scoreFileName) {
    Client client = new Client(CLIENT_IP,
        Integer.parseInt(SERVER_PORT), scoreFileName);
    System.out.println("传输成功！");
  }

}
