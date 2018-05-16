package com.mrjzhang.utils;

/**
 * Created by @author: mrjzhang on 2018/5/16
 */
public class ReqBody {
  private int page;
  private int limit;
  private String start_time;
  private String end_time;
  private String num_order;
  private String create_time_order;

  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  public int getLimit() {
    return limit;
  }

  public void setLimit(int limit) {
    this.limit = limit;
  }

  public String getStart_time() {
    return start_time;
  }

  public void setStart_time(String start_time) {
    this.start_time = start_time;
  }

  public String getEnd_time() {
    return end_time;
  }

  public void setEnd_time(String end_time) {
    this.end_time = end_time;
  }

  public String getNum_order() {
    return num_order;
  }

  public void setNum_order(String num_order) {
    this.num_order = num_order;
  }

  public String getCreate_time_order() {
    return create_time_order;
  }

  public void setCreate_time_order(String create_time_order) {
    this.create_time_order = create_time_order;
  }
}

