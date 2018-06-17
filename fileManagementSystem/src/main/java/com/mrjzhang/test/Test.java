package com.mrjzhang.test;

import com.mrjzhang.bean.Element;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.service.UserService;
import com.mrjzhang.utils.SpringTool;

import java.io.File;

/**
 * Created by @author: mrjzhang on 2018/6/16
 */
public class Test {

  public void print() {
    //ElementService elementService = (ElementService) SpringTool.getBean("elementService");
    UserService userService = (UserService) SpringTool.getBean("UserService");
    System.out.println(userService.findUserById(2));
    //ElementService elementService = (ElementService) SpringTool.getBean("ElementService");
    //Element element = elementService.findElementById(53);
    //System.out.println(element.getName());
  }

  public static void main(String[] args) {
    File matFile = new File("F:\\dataSource\\parabolarBlade\\bladeFile\\parabolarBlade500sl50sh0cx0cy.mat");
    File curveFile = new File("G:\\作业盘\\javagui\\m-jtest\\03-13\\torgeFile0.0838-0\\parabolarBlade500sl150sh100cx-200cy0.0838");
    System.out.println(matFile.getParent() + "\\imgTemp\\" + matFile.getName().substring(0,matFile.getName().length()-4));
    // 获取 name
    String picName= matFile.getParent() + "\\imgTemp\\" + matFile.getName().substring(0,matFile.getName().length()-4) + ".png";
    System.out.println(picName);
    //parabolarBlade500sl50sh0cx0cy.mat
    String curName= curveFile.getParent() + "\\imgTemp\\" + curveFile.getName().substring(0,curveFile.getName().length()-5) + ".png";
    System.out.println(curName);


  }
}