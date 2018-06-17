package com.mrjzhang.manage.file;

import java.io.*;

public class SearchFile {

	public String search(String path, final String keyword) {
    System.out.println("path: " + path);
		try {
			File dir = new File(path);
      System.out.println("list:" + dir.listFiles() + dir.list());
			// 通过一个过滤器将关键字信息搜索
			FilenameFilter filter = new FilenameFilter() {
				@Override
				public boolean accept(File dir, String name) {
					return name.contains(keyword);
				}
			};

			// 得到过滤之后的文件目录信息
			String[] children = dir.list(filter);

			if (children == null) {
				// 输入的路径出问题
				System.out.println("目录不存在或它不是一个目录");
        return null;
			}
//		else {
//			for (int i = 0; i < children.length; i++) {
//				String filename = children[i];
//				System.out.println(filename);
//			}
//		}
			// 这边只考虑 全名进行搜索，所以肯定只有一个文件，只取得数组中的第一个String就可以了
			return children[0];
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	public static void main(String[] args) {
		System.out.println(new SearchFile().search("F:\\dataSource\\6-17\\orgeFile0.0838-0", "parabolarBlade500sl50sh0cx-50cy"));
	}

}
