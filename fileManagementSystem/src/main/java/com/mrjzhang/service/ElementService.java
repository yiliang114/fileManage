package com.mrjzhang.service;

import com.mrjzhang.bean.Element;
import com.mrjzhang.utils.ReqBody;


import java.util.List;

public interface ElementService {

  boolean addElement(Element element);
  boolean updateELement(Element element);
  boolean deleteElement(int id);
  Element findElementByName(String name);
  Element findElementById(int id);

  List<Element> getElements(ReqBody requestBody);
  //List<Element> getWrongElements();

}
