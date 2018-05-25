package com.mrjzhang.web;

import com.mrjzhang.bean.Series;
import com.mrjzhang.bean.Trace;
import com.mrjzhang.service.TraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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

    @RequestMapping(value="/traceOfIps", method = RequestMethod.GET)
    public List<String> traceOfIps() {
      return traceService.traceOfIps();
    }

    @RequestMapping(value="/traceByDay", method = RequestMethod.GET)
    public List<Trace> traceByDay() {
      List<Trace> traceList = traceService.traceByDay();
      int traceOfIpsLength = traceService.traceOfIps().size();
      // 获取 echart 时间轴的时间
      Calendar cal = Calendar.getInstance();
      cal.add(Calendar.DATE,-1);
      String yesterday = new SimpleDateFormat( "yyyy-MM-dd ").format(cal.getTime());
      System.out.println(yesterday);

      List<Series> dateList = new ArrayList<>();
      // 规定显示的时间长度为 7 天
      for (int i = 0; i< 7 ; i++) {
        Series series = new Series();
        series.setName();
        //dateList.add()
      }
      List<Series> seriesList;
      //for ()
      return traceService.traceByDay();
    }
}
