package com.mrjzhang;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.mrjzhang.dao")
public class Application {

	public static void main(String[] args) {
        System.out.println("程序正在运行...");
        // 启动嵌入式的 Tomcat 并初始化 Spring 环境及其各 Spring 组件
	    SpringApplication.run(Application.class, args);
	}
}
