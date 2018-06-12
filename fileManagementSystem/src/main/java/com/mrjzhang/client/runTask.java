package com.mrjzhang.client;

public class runTask {
	public static void main(String[] args) {
		// run in 5 second
		final long timeInterval = 5000;
		final String temp = null;
		Runnable runnable = new Runnable() {
		  @Override
			public void run() {
				String lastNewFile = null;// 储存上一个最新的文件名
				while (true) {
					FileListSort fileListSort = new FileListSort();
					if (fileListSort.getFilePathName(temp).equals(lastNewFile)) {
						System.out.println("没有新文件产生");
					} else {
						System.out.println(fileListSort.getFilePathName(temp));//都一次执行的语句
					}

					lastNewFile = fileListSort.getFilePathName(temp);

					try {
						Thread.sleep(timeInterval);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		};
		Thread thread = new Thread(runnable);
		thread.start();
	}
}