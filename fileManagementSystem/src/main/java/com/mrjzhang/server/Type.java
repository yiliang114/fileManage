package com.mrjzhang.server;

public class Type {

	public String judgeType(String fileName) {


		//判断是什么类型的文件
		//不同文件对应储存不同的文件夹

		if (fileName.endsWith(".mat")) {
			return "bladeFile";
		} else if (fileName.endsWith("0.0838")) {
			return "torgeFile0.0838";
		}
		return null;

	}
}
