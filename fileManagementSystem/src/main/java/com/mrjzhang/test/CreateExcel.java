package com.mrjzhang.test;

import java.io.File;
import java.io.IOException;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
/**
 * Created by @author: mrjzhang on 2018/6/16
 */
public class CreateExcel {

  public static void main(String args[]){

    try {
      //打开文件
      WritableWorkbook book = Workbook.createWorkbook(new File("C:\\Users\\Mrz2J\\Desktop\\test\\1.xls"));
      //生成一个名为“第一页”的工作表，“0”表示第一页
      WritableSheet sheet = book.createSheet("第一页",0);
      //在Label对象中构造制定的第一列，第一行（0，0）
      //以及单元格的内容为“testtest”
      Label label = new Label(0,0,"testtestclb");
      //将值添加到单元格中
      sheet.addCell(label);
      //生成一个保存数字的单元格，必须使用Number的完整包路径，否则将出现歧异
      //单元格位置为第二列，第一行，值为555.1234
      jxl.write.Number number = new jxl.write.Number(1,0,555.12345);
      jxl.write.Number number1 = new jxl.write.Number(2,0,555.12345);
      jxl.write.Number number2 = new jxl.write.Number(3,0,555.12345);

      //将值添加到单元格中
      sheet.addCell(number);
      sheet.addCell(number1);
      sheet.addCell(number2);
      //写入数据并关闭文2件
      book.write();
      book.close();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    }
  }
}