package com.mrjzhang.bean;

import java.util.List;

/**
 * Created by @author: mrjzhang on 2018/5/25
 */
public class Series {
  private String name;
  private List<Integer> data;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Integer> getData() {
    return data;
  }

  public void setData(List<Integer> data) {
    this.data = data;
  }
}
