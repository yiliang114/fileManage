package com.mrjzhang.handle;

import com.mathworks.toolbox.javabuilder.MWException;
import plotHide.plotHideClass;

/**
 * Created by @author: mrjzhang on 2018/5/26
 */
public class plotShowTest {
  public static void main(String[] args) {
    plotHideClass i;
    try {
      i = new plotHideClass();
      i.plotHide("F:\\dataSource\\parabolarBlade\\torgeFile0.0838\\parabolarBlade500sl50sh0cx0cy0.0838");
      System.out.println("success");
    } catch (MWException e) {
      System.out.println("error");
      e.printStackTrace();
    }
  }
}
