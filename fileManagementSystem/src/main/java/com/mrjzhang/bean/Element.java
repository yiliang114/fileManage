package com.mrjzhang.bean;

public class Element{
  private int id;
  private String name;
  private double score;
  private String picture;
  private String curve;
  private String create_time;
  private String from_ip;
  private int status;

  public String getFrom_ip() {
    return from_ip;
  }

  public void setFrom_ip(String from_ip) {
    this.from_ip = from_ip;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public String getCreate_time() {
    return create_time;
  }

  public void setCreate_time(String create_time) {
    this.create_time = create_time;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getScore() {
    return score;
  }

  public void setScore(double score) {
    this.score = score;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getCurve() {
    return curve;
  }

  public void setCurve(String curve) {
    this.curve = curve;
  }
}
