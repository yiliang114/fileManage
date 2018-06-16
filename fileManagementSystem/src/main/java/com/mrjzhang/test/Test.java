package com.mrjzhang.test;

import com.mrjzhang.bean.Element;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.service.UserService;
import com.mrjzhang.utils.SpringTool;

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
    Test test = new Test();
    test.print();
  }
}