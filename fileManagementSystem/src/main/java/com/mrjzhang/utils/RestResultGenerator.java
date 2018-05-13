/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

package com.mrjzhang.utils;

import com.mrjzhang.bean.ResponseResult;

public class RestResultGenerator {
  public static <T> ResponseResult<T> genResult(T data, String info){

    ResponseResult<T> result = new ResponseResult<T>();
    result.setData(data);
    result.setCode("0");
    result.setInfo(info);
    return result;
  }
}
