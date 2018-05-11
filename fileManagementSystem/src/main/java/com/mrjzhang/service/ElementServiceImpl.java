package com.mrjzhang.service;


import com.mrjzhang.bean.Element;
import com.mrjzhang.dao.ElementDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElementServiceImpl implements ElementService{
  @Autowired
  private ElementDao elementDao;

  @Override
  public boolean addElement(Element element) {
    boolean flag = false;
    try{
      elementDao.addElement(element);
      flag = true;

    }catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public boolean updateELement(Element element) {
    boolean flag = false;
    try{
      elementDao.updateELement(element);
      flag = true;

    }catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public boolean deleteElement(int id) {
    boolean flag = false;
    try{
      elementDao.deleteElement(id);
      flag = true;

    }catch (Exception e) {
      e.printStackTrace();
    }
    return flag;
  }

  @Override
  public Element findElementByName(String name) {
    return elementDao.findElementByName(name);
  }

  @Override
  public Element findElementById(int id) {
    return elementDao.findElementById(id);
  }

  @Override
  public List<Element> getElements() {
    return elementDao.getElements();
  }
}
