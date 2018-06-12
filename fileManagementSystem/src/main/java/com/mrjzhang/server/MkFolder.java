package com.mrjzhang.server;
//import Time.*;

import java.io.File;

//import JudgeType.*;

public class MkFolder {

	//自动根据接收文件的日期和文件类型创建文件夹
	public String mkDateDirs(String filePathName){
		//当前日期
		String time = new GetTime().getTime();
		String filePathNameTime = filePathName+"\\"+time;
		File file =new File(filePathNameTime);
		//以日期为文件夹名称
		//如果文件夹不存在则创建
		if  (!file .exists()  && !file .isDirectory())
		{
			file .mkdir();
		}
		filePathNameTime = filePathName +"\\"+time ;
		return filePathNameTime;
	}
	public String mkTypeDirs(String filePathName,String fileName){
		//当前文件类型
		String type = new Type().judgeType(fileName);
		String filePathNameType = filePathName + "\\"+type ;
//		File fileType =new File(filePathNameType);
//		//类型为文件夹名称
//		//如果文件夹不存在则创建
//		if  (!fileType .exists()  && !fileType .isDirectory())      
//		{        
//			fileType .mkdir();    
//		}
		return filePathNameType;
	}

}
