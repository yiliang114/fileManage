package com.mrjzhang.manage.file;

import java.io.*;
import java.util.Scanner;

/**
 * 读取文本目录中的最后一行分数
 */
public class ReadScore {

	/**
	 * Read txt score string.
	 *
	 * @param txtPath the txt path
	 * @return the string
	 */
	public String readTxtScore(String txtPath) {

		String line = "";
		int i=0;
		String score = null;
		try {

			Scanner sc=new Scanner(new FileReader(txtPath));

			while((sc.hasNextLine()&&(line=sc.nextLine())!=null)){
				if(!sc.hasNextLine()) {
					i=line.lastIndexOf(" ")+1;
				}
				score= line.substring(i,line.length());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return score;
	}
}
