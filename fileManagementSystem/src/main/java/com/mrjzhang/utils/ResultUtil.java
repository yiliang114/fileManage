/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

package com.mrjzhang.utils;

import com.mrjzhang.resultBody.ResponseResult;

public class ResultUtil {
  public static ResponseResult success(Object data){

    ResponseResult result = new ResponseResult();
    result.setData(data);
    result.setCode(0);
    return result;
  }

  public static ResponseResult success() {
    return success(null);
  }

  public static ResponseResult error(Object data,String info) {
    ResponseResult result = new ResponseResult();
    result.setData(data);
    result.setCode(1);
    result.setInfo(info);
    return result;
  }
}
