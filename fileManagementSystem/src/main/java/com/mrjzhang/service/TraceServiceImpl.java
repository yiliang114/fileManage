package com.mrjzhang.service;

import com.mrjzhang.bean.Trace;
import com.mrjzhang.dao.TraceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// 用户操作实现类
@Service
public class TraceServiceImpl implements TraceService {
  @Autowired
  private TraceDao traceDao;

  @Override
  public Trace traceNumByIp(String ip) {
    return traceDao.traceNumByIp(ip);
  }

  @Override
  public List<Trace> traceAllNum() {
    return traceDao.traceAllNum();
  }
}
