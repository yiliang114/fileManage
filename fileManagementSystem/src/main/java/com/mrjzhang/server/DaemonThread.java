package com.mrjzhang.server;

public class DaemonThread extends Thread {
	//后台线程
  /**
  * port
  */
	int port ;
	String filePathName ;
	public void setPort(int port) {
		this.port = port;
	}
	public void setFilePathName(String filePathName) {
		this.filePathName = filePathName;
	}
	public DaemonThread() {
	}

	@Override
	public void run() {
		// 线程的run方法，它将和其他线程同时运行
//		for (int i = 1; i <= 100; i++) {
//			try {
//				Thread.sleep(100);
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//			//后台线程持续输出i
//			System.err.println(i);
//		}
		//启动服务器
		try {
			Server server = new Server(port, filePathName);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

//	public static void main(String[] args) {
//		DaemonThread test = new DaemonThread();
//		test.setDaemon(true);
//		//在start之后再设置为守护线程的话，就会抛出异常，线程是正常工作的，只是不再是守护线程
//		test.start();
//		System.out.println("isDaemon="+ test.isDaemon());
//		try {
//			//接收输入，使程序在此停顿
//			//一旦接收到用户输入，main线程结束
//			//守护线程自动结束，如果用户不在输入东西
//			//那么程序就会从1输出到100，
//			//之后才算完了，但主程序还没有结束
//			//而当在运行这个程序时输入回车，
//			//那全部的线程都结束了，包括主线程都退出
//			System.in.read();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//	}

}
