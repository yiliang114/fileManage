package com.mrjzhang.service;

import com.mrjzhang.bean.Trace;

import java.util.List;

// Service 业务逻辑层，这一块几乎与 hibernate 和 mybatis 一样
public interface TraceService {

    Trace traceNumByIp(String ip);

    List<Trace> traceAllNum();
}
