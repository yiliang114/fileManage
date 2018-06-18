package com.mrjzhang.web;

import com.mrjzhang.bean.Element;
import com.mrjzhang.client.FtpClientMain;
import com.mrjzhang.manage.file.*;
import com.mrjzhang.server.FtpServerMain;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
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

      if(cmdBody.getType() == "file") {
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

      ftpClientMain.multifileStart(cmdBody.getServerIp(),cmdBody.getServerPort(),cmdBody.getFolderSrc(),cmdBody.getScanInterval());
      //if(cmdBody.getType() == "folder") {
      //  ftpClientMain.multifileStart(cmdBody.getServerIp(),cmdBody.getServerPort(),cmdBody.getFolderSrc(),cmdBody.getScanInterval());
      //}
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

  @RequestMapping(value="/fileInfoToDb", method = RequestMethod.POST)
  public boolean fileInfoToDb(@RequestBody Element element) {
    System.out.println(element.getName());
    System.out.println(element.getPicture());
    System.out.println(element.toString());

    JudgeFile judgeFile = new JudgeFile();
    if(judgeFile.manageFile(element.getPicture(),element.getCurve())) {

      // 重新设置名称
      File file = new File(element.getPicture());
      String name = file.getName().substring(0,file.getName().length()-4);
      element.setName(name);

      // 重新设置分数
      ReadScore readfile = new ReadScore();
      element.setScore(Double.parseDouble(readfile.readTxtScore(element.getCurve())));
      // 如果文件名称匹配的话，插入数据库
      elementService.addElement(element);
      System.out.println("插入数据成功");
      return true;
    } else {
      System.out.println("插入数据失败");
      return false;
    }

  }

  @RequestMapping(value="/folderInfoToDb", method = RequestMethod.POST)
  public boolean folderInfoToDb(@RequestBody InitElementBody initElementBody) {
    System.out.println(initElementBody.getCurveFolderSrc());


    File folderPicturePath = new File(initElementBody.getPicFolderSrc());
    String filesPicturePath[];

    // 将文件夹中的文件目录集合放入字符串数组中
    filesPicturePath = folderPicturePath.list();

    // 文件夹中的文件名写入字符串数组中
    JudgeFile judge = new JudgeFile();
    // 搜索同名关键字的曲线文件
    // 有相应的算法对文件的名称进行匹配，只有两个文件的文件名匹配对了以后才会进行插入操作。
    SearchFile searchFile = new SearchFile();

    // 初始化状态的Element
    Element element = new Element();
    element.setId((int)(Math.random()*100000));
    element.setStatus(0);
    element.setFrom_ip("ip1");
    Date d = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println("sdf.format(d)" + sdf.format(d));
    element.setCreate_time(sdf.format(d));

    for (int i = 0; i < filesPicturePath.length; i++) {
      System.out.println("filesPicturePath[i]:" +filesPicturePath[i]);
      if(filesPicturePath[i].equals("imageTemp")) {
        continue;
      }
      // 文件名直接list 出来不带目录
      String tempFileCurvePath = filesPicturePath[i].substring(0, filesPicturePath[i].lastIndexOf("."));
      System.out.println(tempFileCurvePath);
      tempFileCurvePath = searchFile.search(initElementBody.getCurveFolderSrc().replace("\\","\\\\"), tempFileCurvePath);

      if(tempFileCurvePath == null) {
        continue;
      }
      // 文件夹名称和文件名称进行拼接，得到图片文件完整的路径名
      filesPicturePath[i] = initElementBody.getPicFolderSrc() + "\\" + filesPicturePath[i];

      element.setPicture(filesPicturePath[i]);
      element.setCurve(initElementBody.getCurveFolderSrc()+"\\"+tempFileCurvePath);

      // 重新设置名称
      File file = new File(element.getPicture());
      String name = file.getName().substring(0,file.getName().length()-4);
      element.setName(name);

      // 重新设置分数
      ReadScore readfile = new ReadScore();
      element.setScore(Double.parseDouble(readfile.readTxtScore(element.getCurve())));
      element.setId(element.getId() + i);
      // 如果文件名称匹配的话，插入数据库
      elementService.addElement(element);
      System.out.println("插入数据成功");

    }
    return true;
  }

}
