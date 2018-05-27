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
      i.imgHide("F:\\dataSource\\parabolarBlade\\bladeFile\\parabolarBlade500sl50sh0cx0cy.mat","C:\\Users\\Mrz2J\\Desktop\\matlab\\imgTemp\\xxx.png");
      System.out.println("success");
    } catch (MWException e) {
      System.out.println("error");
      e.printStackTrace();
    }
  }
}
