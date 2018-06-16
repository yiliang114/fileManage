package com.mrjzhang.manage;

import com.mrjzhang.bean.Element;

/**
 * Created by @author: mrjzhang on 2018/6/16
 */
public class ManageMain {
  // 导出数据文件到excel的方法
  public boolean dbToExcel(String excelFileSrc) {

    return true;
  }

  // 更新数据库文件的方法
  // 只能更新分数
  public Element updateElement(Element element,double score) {

    element.setScore(score);
    return element;
  }

}
