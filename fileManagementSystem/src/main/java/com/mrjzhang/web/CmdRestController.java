package com.mrjzhang.web;

import com.mrjzhang.client.FtpClientMain;
import com.mrjzhang.server.FtpServerMain;
import com.mrjzhang.utils.CmdBody;
import com.mrjzhang.utils.IpUtil;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value="/cmd")
public class CmdRestController {

  @RequestMapping(value="/clientWork", method = RequestMethod.POST)
  public String clientWork(@RequestBody CmdBody cmdBody) {
    // 传输文件
    try {
      FtpClientMain ftpClientMain = new FtpClientMain();

      if(cmdBody.getType() == 0) {
        ftpClientMain.start(cmdBody.getServerIp(),cmdBody.getServerPort(),cmdBody.getFileSrc());
      }
      System.out.println("传输文件成功");
      return "传输文件成功";
    } catch (Exception e) {
      System.out.println("传输文件失败");
      e.printStackTrace();
      return "传输文件失败";
    }
  }

  // 监听文件夹
  @RequestMapping(value="/monitorClientWork", method = RequestMethod.POST)
  public void monitorClientWork(@RequestBody CmdBody cmdBody) {
    // 传输文件
    try {
      FtpClientMain ftpClientMain = new FtpClientMain();

      if(cmdBody.getType() == 1) {
        ftpClientMain.multifileStart(cmdBody.getServerIp(),cmdBody.getServerPort(),cmdBody.getFolderSrc(),cmdBody.getScanInterval());
      }
      System.out.println("传输多文件成功");

    } catch (Exception e) {
      System.out.println("传输多文件失败");
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
