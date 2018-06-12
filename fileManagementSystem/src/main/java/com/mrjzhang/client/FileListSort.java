package com.mrjzhang.client;

import java.io.File;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;
import java.util.TreeMap;

public class FileListSort {

	// 能够返回最新的文件名称
	// 这个地方只要在matlab（其他软件）生成那个图片文件的时候，执行这一段代码，就能够得到最新的
	// 文件，这个时候，只要向服务器发送这个文件就可以了
	public String getFilePathName(String filePath) {
		TreeMap<Long, File> tm = new TreeMap<Long, File>();
		File file = new File(filePath);
		File subFile[] = file.listFiles();
		int fileNum = subFile.length;
		for (int i = 0; i < fileNum; i++) {
			Long tempLong = new Long(subFile[i].lastModified());
			tm.put(tempLong, subFile[i]);
		}

		return tm.get(tm.lastKey()).getPath();

		// System.out.println("按时间从前到后排序--->");
		// System.out.println("最早的一个文件的路径-->"+tm.get(tm.firstKey()).getPath());
		// System.out.println("最近的一个文件的路径-->"+tm.get(tm.lastKey()).getPath());
		//
		// Set<Long> set = tm.keySet();
		// Iterator<Long> it = set.iterator();
		// while (it.hasNext()) {
		// Object key = it.next();
		// Object objValue = tm.get(key);
		// File tempFile = (File) objValue;
		// Date date=new Date((Long)key);
		// System.out.println(tempFile.getPath() + "\t"+date);
		// }
	}

}