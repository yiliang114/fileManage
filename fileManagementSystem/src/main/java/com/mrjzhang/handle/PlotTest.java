//package com.mrjzhang.handle;
//
//import com.mathworks.toolbox.javabuilder.*;
//import drawplot.Plotter;
//
//import java.io.FileReader;
//import java.util.Scanner;
//
///**
// * Created by @author: mrjzhang on 2018/5/27
// */
//public class PlotTest {
//
//  public static String readTxtScore(String txtPath) {
//
//    String line = "";
//    int i=0;
//    String score = null;
//    try {
//
//      Scanner sc=new Scanner(new FileReader(txtPath));
//
//      while((sc.hasNextLine()&&(line=sc.nextLine())!=null)){
//        if(!sc.hasNextLine()) {
//          i=line.lastIndexOf(" ")+1;
//        }
//        score= line.substring(i,line.length());
//      }
//
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//
//    return score;
//  }
//  public static void main(String[] args) {
//    MWNumericArray x = null; // 存放x值的数组
//    MWNumericArray y = null; // 存放y值的数组
//    Plotter thePlot = null; // plotter类的实例（在MatLab编译时，新建的类）
//    int n = 20; // 作图点数
//
//
//    try {
//      // 分配x、y的值
//      int[] dims = { 1, n };
//      x = MWNumericArray.newInstance(dims, MWClassID.DOUBLE,
//          MWComplexity.REAL);
//      y = MWNumericArray.newInstance(dims, MWClassID.DOUBLE,
//          MWComplexity.REAL);
//
//      // 定义 y = x^2
//      for (int i = 1; i <= n; i++) {
//        x.set(i, i);
//        y.set(i, i * i);
//      }
//
//      // 初始化plotter的对象
//      thePlot = new Plotter();
//
//      // 作图
//      thePlot.drawplot(x, y);
//      thePlot.waitForFigures();
//    }
//
//    catch (Exception e) {
//      System.out.println("Exception: " + e.toString());
//    }
//
//    finally {
//      // 释放本地资源
//      MWArray.disposeArray(x);
//      MWArray.disposeArray(y);
//      if (thePlot != null) {
//        thePlot.dispose();
//      }
//    }
//  }
//}