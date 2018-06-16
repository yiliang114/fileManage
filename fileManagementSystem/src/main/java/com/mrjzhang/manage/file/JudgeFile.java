package com.mrjzhang.manage.file;
import java.io.File;

import com.mrjzhang.bean.Element;
import com.mrjzhang.service.ElementService;
import com.mrjzhang.service.ElementServiceImpl;

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
  public void manageFile(String picturePathName, String curvePathName){

		int i=picturePathName.lastIndexOf("\\")+1;
		System.out.println(i);
		int j=curvePathName.lastIndexOf("\\")+1;
		System.out.println(j);

		//Session s=HibernateSessionFactory.getSession();
		//Transaction tx=s.beginTransaction();

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
      //if((picName.equals(curName))&&curveFile.isFile()&&pictureFile.isFile()){
      if(true){
				element.setName(picName);
				picturePathName = picturePathName.replace("\\", "/");
				element.setPicture(picturePathName);
				curvePathName = curvePathName.replace("\\", "/");
				element.setCurve(curvePathName);
        //element.setScore(Double.parseDouble(readfile.readTxtScore(curvePathName)));
        element.setScore(11);

				//s.save(element);
				//tx.commit();
        //
				//s.close();

        // test
        element.setCreate_time("2018-05-23 14:35:02");
        element.setId(1234);

        //ElementServiceImpl elementService = new ElementServiceImpl();
        //System.out.println(elementService);
        //System.out.println(elementService.addElement(element));
        //System.out.println(elementService.addElement(element));

				System.out.println(picName+"插入数据库成功！");
				result = result+picName+"插入数据库成功！"+"\n";
			}else{
				System.out.println("文件不匹配！插入数据库错误");
				result = result+"文件不匹配！插入数据库错误"+"\n";
			}

		}catch (Exception ex) {
		  ex.printStackTrace();
			System.out.println("主键冲突或者输入的文件名不正确！插入数据库错误");
			result = result+"主键冲突或者输入的文件名不正确！插入数据库错误"+"\n";
		}

	}

}
