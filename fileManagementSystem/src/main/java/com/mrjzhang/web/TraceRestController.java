package com.mrjzhang.web;

import com.mrjzhang.bean.Trace;
import com.mrjzhang.service.TraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/trace/api")
public class TraceRestController {
    @Autowired
    private TraceService traceService;

    @RequestMapping(value="/traceOfIp", method = RequestMethod.GET)
    public Trace traceNumByIp(@RequestParam(value = "ip", required = true) String ip) {
      System.out.println("开始查询ip nums。。。");
      System.out.println(traceService.traceNumByIp(ip).getIp());
      return traceService.traceNumByIp(ip);
    }

    @RequestMapping(value="/traces", method = RequestMethod.GET)
    public List<Trace> traceAllNum() {
      System.out.println("开始查询all ip nums。。。");
      System.out.println(traceService.traceAllNum().get(0));
      return traceService.traceAllNum();
    }

    @RequestMapping(value="/pandect", method = RequestMethod.GET)
    public int tracePandect() {
      System.out.println("开始查询 pandect。。。");
      List<Trace> list = traceService.traceAllNum();
      int pandect = 0;
      for (Trace trace : list) {
        pandect += trace.getNum();
      }
      return pandect;
    }

}
