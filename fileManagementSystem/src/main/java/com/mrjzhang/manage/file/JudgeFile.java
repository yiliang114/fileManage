package com.mrjzhang.manage.file;
import java.io.File;

import com.mrjzhang.bean.Element;

/**
 * 可以单条记录输入.
 */
public class JudgeFile {

  /**
   * The Result.
   */
  String result = "";

  /**
   * Get result string.
   *
   * @return the string
   */
  public String getResult(){
		//返回插入数据之后的结果字符串
		return result;
	}

  /**
   * Manage file.
   * 这个地方判断最后一个“\”的位置，原因是，win下的目录默认是使用的“\”，这里只有对“\”进行操作
   * 后面的路径操作不需要改，linux系统下运行软件时，此处必须进行修改才能正常运行
   * 因为linux下默认的路径分隔符是“/”
   * @param picturePathName the picture path name
   * @param curvePathName   the curve path name
   */
  public boolean manageFile(String picturePathName, String curvePathName){

		int i=picturePathName.lastIndexOf("\\")+1;
		System.out.println(i);
		int j=curvePathName.lastIndexOf("\\")+1;
		System.out.println(j);

		Element element=new Element();

		// 读取curve文件中的分数值
		ReadScore readfile = new ReadScore();

		try{
			String picName= picturePathName.substring(i,picturePathName.length()-4);
			System.out.println(picName);
			//parabolarBlade500sl50sh0cx0cy.mat
			String curName= curvePathName.substring(j,curvePathName.length()-6);
			System.out.println(curName);
			//parabolarBlade500sl50sh0cx0cy0.0838
			//去掉两个文件pathname 的前缀和后缀

			File pictureFile = new File(picturePathName);
			File curveFile = new File(curvePathName);
			//parabolarBlade500sl50sh0cx0cy0.0838
			//parabolarBlade500sl50sh0cx0cy.mat
			//parabolarBlade500sl50sh0cx50cy0
			//parabolarBlade500sl50sh0cx50cy

      // 判断（judge）两个文件的名称是否匹配
      if((picName.equals(curName))&&curveFile.isFile()&&pictureFile.isFile()){
				return true;
			}else{
				return false;
			}

		}catch (Exception ex) {
		  ex.printStackTrace();
      return false;
		}

	}

}
