package com.mrjzhang.manage;

import com.mathworks.toolbox.javabuilder.MWException;
import com.mrjzhang.bean.Element;
import imgHide.imgHideClass;

/**
 * Created by @author: mrjzhang on 2018/6/16
 */
public class ManageMain {
  // 导出数据文件到excel的方法
  public boolean dbToExcel(String excelFileSrc) {

    return true;
  }

  public void createImgs() {

    new Thread() {
      @Override
      public void run() {
        try{
          imgHideClass imgHideClass = new imgHideClass();
          imgHideClass.imgHide("F:\\dataSource\\parabolarBlade\\bladeFile\\parabolarBlade500sl50sh0cx0cy.mat");

        } catch (MWException e) {
          System.out.println("xxx error");
          e.printStackTrace();
        }
      }
    }.start();

  }

}
