package com.mrjzhang.manage.file;

import java.io.File;

/**
 * 可以批量记录输入
 */
public class JudgeFilePath {

  /**
   * The Result.
   */
  String result ="" ;

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
   * Manage file path.
   *
   * @param picturePath the picture path
   * @param curvePath   the curve path
   */
  public void manageFilePath(String picturePath, String curvePath) {
		File filePicturePath = new File(picturePath);
		String testFilePicturePath[];

		// 将文件夹中的文件目录集合放入字符串数组中
		testFilePicturePath = filePicturePath.list();

//		File fileCurvePath = new File(curvePath);
//		String testFileCurvePath[];
//		testFileCurvePath = fileCurvePath.list();

		// 文件夹中的文件名写入字符串数组中
		JudgeFile judge = new JudgeFile();
		// 搜索同名关键字的曲线文件
		// 有相应的算法对文件的名称进行匹配，只有两个文件的文件名匹配对了以后才会进行插入操作。
		SearchFile searchFile = new SearchFile();

		for (int i = 0; i < testFilePicturePath.length; i++) {
			// 文件名直接list 出来不带目录
			String tempFileCurvePath = testFilePicturePath[i].substring(0, testFilePicturePath[i].lastIndexOf("."));
			tempFileCurvePath = searchFile.search(curvePath, tempFileCurvePath);
			// 文件夹名称和文件名称进行拼接，得到图片文件完整的路径名
			testFilePicturePath[i] = picturePath + "\\" + testFilePicturePath[i];

//			testFileCurvePath[i] = curvePath + "\\" + testFileCurvePath[i];

			judge.manageFile(testFilePicturePath[i], curvePath+"\\"+tempFileCurvePath);
			result = judge.getResult();

		}
	}

}
