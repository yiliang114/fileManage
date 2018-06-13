package com.mrjzhang.server;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 服务器
 */

public class Server extends ServerSocket implements Runnable{

	private ServerSocket server;

	private Socket client;

	private DataInputStream dis;

	private FileOutputStream fos;

	private String filePathNameType;
	private String filePathNameTime;
	int i =0;
	@Override
	public void run() {

	}

	//保证接收这个过程是 一个线程结束之后才能继续执行下一个线程
	public synchronized void receive(String filePathName) throws IOException{
		client = server.accept();

		dis = new DataInputStream(client.getInputStream());

		// 文件名和长度
		i++;
		String fileName = dis.readUTF();

		long fileLength = dis.readLong();

		// 创建日期文件夹目录
		filePathNameTime = new MkFolder().mkDateDirs(filePathName);

		filePathNameType = new MkFolder().mkTypeDirs(filePathNameTime, fileName);

		// 下载的位置
		String newPath = filePathNameType + "-" + String.valueOf(i / 2000);
		File newFile = new File(newPath);
		// newFile.createNewFile();
		if (!newFile.exists()) {
			newFile.mkdirs();
		}
		fos = new FileOutputStream(new File(newFile.toString()+ "\\" + fileName));

		byte[] sendBytes = new byte[1024];

		int transLen = 0;

		while (true) {

			int read = 0;

			read = dis.read(sendBytes);

			if (read == -1)

				break;

			transLen += read;

			fos.write(sendBytes, 0, read);

			fos.flush();

		}

		System.out.println("接收文件<" + fileName + ">成功");

		//resultTxt = "接收文件<"+ fileName +">成功";

		client.close();
	}

	public Server(int PORT,String filePathName) throws Exception {

		try {

			try {

				server = new ServerSocket(PORT);

				while (true) {

					receive(filePathName);

				}

			} catch (Exception e) {

				e.printStackTrace();

			} finally {

				if (dis != null){
					dis.close();
				}
				if (fos != null) {
					fos.close();
				}
				server.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public static void main(String[] args) throws Exception {
		int port = 2013;
		String filePath = "D:\\test";
		Server server = new Server(port,filePath);


	}



}