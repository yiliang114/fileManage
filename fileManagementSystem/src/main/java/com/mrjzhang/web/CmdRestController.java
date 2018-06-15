package com.mrjzhang.web;

import com.mrjzhang.client.FtpClientMain;
import com.mrjzhang.server.FtpServerMain;
import com.mrjzhang.utils.CmdBody;
import com.mrjzhang.utils.CmdServerBody;
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

  @RequestMapping(value="/serverStart", method = RequestMethod.POST)
  public String serverStart(@RequestBody CmdServerBody cmdServerBody) {
    // 传输文件
    try {
      FtpServerMain ftpServerMain = new FtpServerMain();

      ftpServerMain.start(cmdServerBody.getServerPort(),cmdServerBody.getReceiveFolder());
      System.out.println("开启服务器成功");
      return "开启服务器成功";
    } catch (Exception e) {
      System.out.println("开启服务器失败");
      e.printStackTrace();
      return "开启服务器失败";

    }
  }

  @RequestMapping(value="/getIp", method = RequestMethod.GET)
  @ResponseBody
  public String getIp(HttpServletRequest request) {
    return IpUtil.getIpAddr(request);
  }

}
