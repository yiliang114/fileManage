package com.mrjzhang.bean;

public class User {
    // 编号
    private int id;
    // 姓名
    private String name;
    // 年龄
    private  int age;

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static class ElementDao {
      // 数据库对应的实体类
      private int id;

      private String name;
      private double score;
      private String picture;
      private String curve;

      public int getId() {
        return id;
      }

      public String getName() {
        return name;
      }

      public double getScore() {
        return score;
      }

      public String getPicture() {
        return picture;
      }

      public String getCurve() {
        return curve;
      }

      public void setId(int id) {
        this.id = id;
      }

      public void setName(String name) {
        this.name = name;
      }

      public void setScore(double score) {
        this.score = score;
      }

      public void setPicture(String picture) {
        this.picture = picture;
      }

      public void setCurve(String curve) {
        this.curve = curve;
      }

      public ElementDao(int id, String name, double score, String picture, String curve) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.picture = picture;
        this.curve = curve;
      }
    }
}
