package com.mrjzhang.utils;

import java.util.UUID;

/**
 * Created by @author: mrjzhang on 2018/6/16
 */
public class IdUtil {
  public static String getUUID(){
    UUID  uuid= UUID.randomUUID();
    String str = uuid.toString();
    String uuidStr=str.replace("-", "");
    return uuidStr;
  }
}
