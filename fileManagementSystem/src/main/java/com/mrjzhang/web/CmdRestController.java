package com.mrjzhang.web;

import com.mrjzhang.client.FtpClientMain;
import com.mrjzhang.manage.file.DbToExcel;
import com.mrjzhang.server.FtpServerMain;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value="/cmd")
public class CmdRestController {
  @Autowired
  private ElementService elementService;

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

  @RequestMapping(value="/dbToExcel", method = RequestMethod.POST)
  public boolean dbToExcel(@RequestBody ExcelFileBody excelFileSrc) {
    System.out.println(excelFileSrc.getSrc());
    DbToExcel dbToExcel = new DbToExcel();

    // 构造一个空的ReqBody就行了
    ReqBody reqBody = new ReqBody();

    List results = elementService.getElements(reqBody);
    System.out.println(results.size());

    dbToExcel.outDbToExcel(excelFileSrc.getSrc(),results);

    return true;
  }

}
