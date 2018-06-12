package com.mrjzhang.server;

import java.io.File;
import java.io.IOException;

public class MoveFile extends Thread{
	/**
	 * 通过重命名来移动文件，而不是通过复制文件之后再进行删除
	 */
	public  MoveFile(String oldPath) {
		String newPath = null;
		File fileOld = new File(oldPath);
		int count = 0;
		if (!fileOld.exists()) {
			try {
				System.out.println("路径不存在");
				fileOld.createNewFile();

			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			File[] files = fileOld.listFiles();
			// int i = files.length;
			// count = i/2000 + 1;
			int num = 0;
			// 这个循环 有问题
			// for(File f:files)
			//貌似是 操作过程中对集合进行了操作
			for (int i = 0; i < files.length; i++) {
				num++;
				try {
					newPath = oldPath + "-" + String.valueOf(num / 2000);
					File newFile = new File(newPath);
					// newFile.createNewFile();
					if (!newFile.exists()) {
						newFile.mkdirs();
					}
					System.out.println(newFile.toString());
					if (files[i].renameTo(new File(newFile.toString() + "\\" + files[i].getName()))) {
						System.out.println("File is moved successful!");
					} else {
						System.out.println("File is failed to move!");
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void main(String[] args) {
		MoveFile m = new MoveFile("D:\\test");
	}
}
