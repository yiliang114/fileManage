package com.mrjzhang.web;

import com.mrjzhang.bean.Element;
import com.mrjzhang.resultBody.ResponseResult;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.utils.ReqBody;
import com.mrjzhang.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

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
  public ResponseResult getElements(@RequestBody ReqBody reqBody) {
    System.out.println("开始查询所有elements。。。");

    int page = reqBody.getPage();
    int limit = reqBody.getLimit();
    String name = reqBody.getName();
    String score_order = reqBody.getScore_order();
    String create_time_order = reqBody.getCreate_time_order();
    Object generateStatus = reqBody.getGenerateStatus();
    Object scoreStatus = reqBody.getScoreStatus();
    String start_time = reqBody.getStart_time();
    String end_time = reqBody.getEnd_time();

    System.out.println(generateStatus);
    System.out.println(scoreStatus);
    System.out.println(start_time);
    System.out.println(end_time);

    // 组装result
    List<Element> elements = elementService.getElements(reqBody);

    // 搜索
    if(name != null && !name.equals("")) {
      // .collect(Collectors.toList()) 将 stream 格式 转化为 List
      elements = elements.stream().filter(element -> element.getName().indexOf(name) != -1).collect(Collectors.toList());
    }

    // 时间筛选
    if(!start_time.equals("") && !end_time.equals("")) {
      elements = elements.stream()
          .filter(element -> element.getCreate_time().compareTo(end_time) <= 0 && element.getCreate_time().compareTo(start_time) >= 0)
          .collect(Collectors.toList());
    }

    // 排序
    if(score_order != null && !score_order.equals("")) {
      if(score_order.equals("desc")) {
        System.out.println("desc...");
        Collections.sort(elements, new Comparator<Element>() {
          @Override
          public int compare(Element o1, Element o2) {
            if(o1.getScore()-(o2.getScore())!=0){
              return o1.getScore()-(o2.getScore()) >= 0 ? 1 : -1;
            }else{
              return  o1.getName().compareTo(o2.getName());
            }
          }
        });
        // 遍历集合
        //for (Element element : elements) {
        //  System.out.println(element.getName() + "---" + element.getScore());
        //}
      } else if(score_order.equals("asc")) {
        System.out.println("asc...");
        Collections.sort(elements, new Comparator<Element>() {
          @Override
          public int compare(Element o1, Element o2) {
            if(o1.getScore()-(o2.getScore())!=0){
              return o1.getScore()-(o2.getScore()) < 0 ? 1 : -1;
            }else{
              return  o1.getName().compareTo(o2.getName());
            }
          }
        });
        // 遍历集合
        //for (Element element : elements) {
        //  System.out.println(element.getName() + "---" + element.getScore());
        //}
      }
    }
    if(create_time_order != null && !create_time_order.equals("")) {
      if(create_time_order.equals("desc")) {
        Collections.sort(elements, new Comparator<Element>() {
          @Override
          public int compare(Element o1, Element o2) {
            if(o1.getCreate_time().compareTo(o2.getCreate_time()) != 0){
              return o1.getCreate_time().compareTo(o2.getCreate_time());
            }else{
              return  o1.getName().compareTo(o2.getName());
            }
          }
        });
      } else if(create_time_order.equals("asc")) {
        Collections.sort(elements, new Comparator<Element>() {
          @Override
          public int compare(Element o1, Element o2) {
            if(o1.getCreate_time().compareTo(o2.getCreate_time()) != 0){
              return -(o1.getCreate_time().compareTo(o2.getCreate_time()));
            }else{
              return  o1.getName().compareTo(o2.getName());
            }
          }
        });
      }
    }

    int size = elements.size();
    HashMap<String , Object> map = new HashMap<String , Object>();

    // 翻页
    if(page != 0 && limit != 0) {
      // 这里需要注意，不能超出list 的最大下标
      elements = elements.subList((page-1)*limit,page*limit > size ? size : page*limit);
    }





    map.put("elements" , elements);
    map.put("total" ,size);

    return ResultUtil.success(map);
  }

  @RequestMapping(value = "/testAddElements", method = RequestMethod.GET)
  public void testAddElements() {
    System.out.println("testAddElements。。。");
    Element element = new Element();
    element.setId(1111);
    element.setCreate_time("2018-05-23 14:35:02");
    element.setCurve("xxx");
    element.setPicture("xxxxxx");
    element.setName("ssss");
    element.setScore(21221);
    element.setFrom_ip("221212");
    element.setStatus(0);
    elementService.addElement(element);
  }

}
