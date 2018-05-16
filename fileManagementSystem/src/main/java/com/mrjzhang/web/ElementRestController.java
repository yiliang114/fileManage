package com.mrjzhang.web;

import com.mrjzhang.bean.Element;
import com.mrjzhang.resultBody.ResponseResult;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by @author: mrjzhang on 2018-5-13
 */

@RestController
@RequestMapping(value = "/element/api")
public class ElementRestController {
  @Autowired
  private ElementService elementService;

  @RequestMapping(value = "/addElement", method = RequestMethod.POST)
  public ResponseResult addElement(@RequestBody Element element) {
    System.out.println("开始新增。。。");
    return ResultUtil.success(elementService.addElement(element));
  }

  @RequestMapping(value = "/updateELement", method = RequestMethod.PUT)
  public ResponseResult updateELement(@RequestBody Element element) {
    System.out.println("开始更新。。。");
    System.out.println(element.getName()+" "+element.getId());
    boolean result = elementService.updateELement(element);
    if(result) {
      return ResultUtil.success(result);
    } else {
      return ResultUtil.error(result,"访问出错");
    }
  }

  @RequestMapping(value = "/deleteElement", method = RequestMethod.DELETE)
  public ResponseResult deleteElement(@RequestParam(value = "id", required = true) int id) {
    System.out.println("开始删除。。。");
    return ResultUtil.success(elementService.deleteElement(id));
  }

  @RequestMapping(value = "/elementName", method = RequestMethod.GET)
  public ResponseResult findElementByName(@RequestParam(value = "name", required = true) String name) {
    System.out.println("开始查询。。。");
    return ResultUtil.success(elementService.findElementByName(name));
  }

  @RequestMapping(value = "/elementId", method = RequestMethod.GET)
  public ResponseResult findElementById(@RequestParam(value = "id", required = true) int id) {
    System.out.println("开始查询id。。。");
    return ResultUtil.success(elementService.findElementById(id));
  }

  @RequestMapping(value = "/elements", method = RequestMethod.POST)
  public ResponseResult getElements(@RequestBody String req) {
    System.out.println("开始查询所有elements。。。");
    System.out.println(req);
    List<Element> elements = elementService.getElements();
    return ResultUtil.success(elements);
  }

  //@RequestMapping(value = "/elements", method = RequestMethod.GET)
  //public ResponseResult getElements() {
  //  System.out.println("开始查询所有elements。。。");
  //  return ResultUtil.success(elementService.getElements());
  //}

}
