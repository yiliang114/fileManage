package com.mrjzhang.manage.file;

import java.io.*;

public class SearchFile {

	public String search(String path, final String keyword) {
		File dir = new File(path);
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
		}
//		else {
//			for (int i = 0; i < children.length; i++) {
//				String filename = children[i];
//				System.out.println(filename);
//			}
//		}
		// 这边只考虑 全名进行搜索，所以肯定只有一个文件，只取得数组中的第一个String就可以了
		return children[0];
	}
	public static void main(String[] args) {
		new SearchFile().search("D:/javagui/parabolarBlade/torgeFile0.0838", "parabolarBlade500sl1000sh50cx200cy0");
	}

}
