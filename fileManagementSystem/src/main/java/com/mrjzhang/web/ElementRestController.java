package com.mrjzhang.web;

import com.mrjzhang.bean.Element;
import com.mrjzhang.resultBody.ResponseResult;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/element/api")
public class ElementRestController {
  @Autowired
  private ElementService elementService;

  @RequestMapping(value = "/addElement", method = RequestMethod.POST)
  public ResponseResult addElement(Element element) {
    System.out.println("开始新增。。。");
    return ResultUtil.success(elementService.addElement(element));
  }

  @RequestMapping(value = "/updateELement", method = RequestMethod.PUT)
  public ResponseResult updateELement(Element element) {
    System.out.println("开始更新。。。");
    return ResultUtil.success(elementService.updateELement(element));
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

  //@RequestMapping(value = "/elements", method = RequestMethod.GET)
  //public List<Element> getElements() {
  //  System.out.println("开始查询所有elements。。。");
  //  return elementService.getElements();
  //}

  @RequestMapping(value = "/elements", method = RequestMethod.GET)
  public ResponseResult getElements() {
    System.out.println("开始查询所有elements。。。");
    return ResultUtil.success(elementService.getElements());
  }
}
