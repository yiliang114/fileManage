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
      i.plotHide("G:\\作业盘\\javagui\\m-jtest\\03-13\\torgeFile0.0838-0\\parabolarBlade500sl150sh100cx-200cy0.0838");
      System.out.println("success");
    } catch (MWException e) {
      System.out.println("error");
      e.printStackTrace();
    }
  }
}
