package com.mrjzhang.dao;

import com.mrjzhang.bean.Trace;
import org.apache.ibatis.annotations.*;

import java.util.List;

// @Mapper 在接口上添加了这个注解表示这个接口是基于注解实现的CRUD
@Mapper
public interface TraceDao {

    @Select("select from_ip as ip,count(*) as num from fileinfos where from_ip=#{ip}")
    Trace traceNumByIp(@Param("ip") String ip);

    @Select("select from_ip as ip,count(*) as num from fileinfos group by from_ip")
    List<Trace> traceAllNum();

    @Select("select from_ip as ip from fileinfos group by from_ip")
    List<String> traceOfIps();

    @Select("select from_ip as ip,LEFT(create_time,10) as date,count(*) as num from fileinfos group by from_ip,date")
    List<Trace> traceByDay();
}
