package com.mrjzhang.handle;

import imgHide.imgHideClass;
import com.mathworks.toolbox.javabuilder.MWException;
/**
 * Created by @author: mrjzhang on 2018/5/26
 */
public class imgShowTest {
  public static void main(String[] args) {
    imgHideClass i;
    try {
      i = new imgHideClass();
      i.imgHide("G:\\作业盘\\javagui\\m-jtest\\03-13\\bladeFile-0\\parabolarBlade500sl150sh100cx-100cy.mat");
      System.out.println("success");
    } catch (MWException e) {
      System.out.println("error");
      e.printStackTrace();
    }
  }
}
