package com.mrjzhang.web;

import com.mrjzhang.bean.Element;
import com.mrjzhang.service.ElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/element/api")
public class ElementRestController {
  @Autowired
  private ElementService elementService;

  @RequestMapping(value = "/addElement", method = RequestMethod.POST)
  public boolean addElement(Element element) {
    System.out.println("开始新增。。。");
    return elementService.addElement(element);
  }

  @RequestMapping(value = "/updateELement", method = RequestMethod.PUT)
  public boolean updateELement(Element element) {
    System.out.println("开始更新。。。");
    return elementService.updateELement(element);
  }

  @RequestMapping(value = "/deleteElement", method = RequestMethod.DELETE)
  public boolean deleteElement(@RequestParam(value = "id", required = true) int id) {
    System.out.println("开始删除。。。");
    return elementService.deleteElement(id);
  }

  @RequestMapping(value = "/elementName", method = RequestMethod.GET)
  public Element findElementByName(@RequestParam(value = "name", required = true) String name) {
    System.out.println("开始查询。。。");
    return elementService.findElementByName(name);
  }

  @RequestMapping(value = "/elementId", method = RequestMethod.GET)
  public Element findElementById(@RequestParam(value = "id", required = true) int id) {
    System.out.println("开始查询id。。。");
    return elementService.findElementById(id);
  }

  @RequestMapping(value = "/elements", method = RequestMethod.GET)
  public List<Element> getElements() {
    System.out.println("开始查询所有elements。。。");
    return elementService.getElements();
  }
}
