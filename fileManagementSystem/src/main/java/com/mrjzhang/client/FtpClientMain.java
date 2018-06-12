package com.mrjzhang.client;

/**
 * Created by @author: mrjzhang on 2018/6/12
 */
public class FtpClientMain {

  String CLIENT_IP = "127.0.0.1";
  String SERVER_PORT = "9999";

  String matFileName = "F:\\fileManageWorkspace\\send\\bladeFile-0\\parabolarBlade500sl150sh100cx-100cy.mat";
  String scoreFileName = "F:\\fileManageWorkspace\\send\\torgeFile0.0838-0\\parabolarBlade500sl150sh100cx-100cy0.0838";

  public void start() {
    Client client = new Client(CLIENT_IP,
        Integer.parseInt(SERVER_PORT), matFileName);
    System.out.println("传输成功！");
  }

}
