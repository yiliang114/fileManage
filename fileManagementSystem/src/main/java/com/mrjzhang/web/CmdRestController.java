package com.mrjzhang.web;

import com.mrjzhang.client.FtpClientMain;
import com.mrjzhang.server.FtpServerMain;
import com.mrjzhang.utils.IpUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value="/cmd")
public class CmdRestController {

    FtpClientMain ftpClientMain = new FtpClientMain();
    @RequestMapping(value="/clientWork", method = RequestMethod.GET)
    public void clientWork() {
      // 传输文件
      try {
        String CLIENT_IP = "127.0.0.1";
        String SERVER_PORT = "9999";

        String matFileName = "F:\\fileManageWorkspace\\send\\bladeFile-0\\parabolarBlade500sl150sh100cx-100cy.mat";
        String scoreFileName = "F:\\fileManageWorkspace\\send\\torgeFile0.0838-0\\parabolarBlade500sl150sh100cx-100cy0.0838";

        ftpClientMain.start(CLIENT_IP,SERVER_PORT,scoreFileName);
        System.out.println("传输文件成功");
      } catch (Exception e) {
        System.out.println("传输文件失败");
        e.printStackTrace();
      }
    }

  FtpServerMain ftpServerMain = new FtpServerMain();
  @RequestMapping(value="/serverStart", method = RequestMethod.GET)
  public void serverStart() {
    // 传输文件
    try {
      // 启动服务器, 所需参数带在url中
      String SERVER_PORT = "9999";
      String FolderName = "F:\\fileManageWorkspace\\receive";

      ftpServerMain.start(SERVER_PORT,FolderName);
      System.out.println("开启服务器成功");
    } catch (Exception e) {
      System.out.println("开启服务器失败");
      e.printStackTrace();
    }
  }

  @RequestMapping(value="/getIp", method = RequestMethod.GET)
  @ResponseBody
  public String getIp(HttpServletRequest request) {
    return IpUtil.getIpAddr(request);
  }

}
