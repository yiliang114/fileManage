package com.mrjzhang.server;

public class SynchronizeThread implements Runnable{
	//一共有10张票
	private int ticket = 10;

	@Override
	public void run() {
		while(true){
			receive();
		}
	}
	public synchronized void receive() {
		if(ticket>0){
			//为了演示产生的问题，线程在这里睡眠一次
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			//睡眠结束之后，继续当前的票进行销售
			System.out.println(Thread.currentThread().getName()+"卖票-->"+(this.ticket--));

		}
	}

	public static void main(String[] args) {
		//建立三个售票窗口的线程类来模拟窗口售票
		SynchronizeThread ru = new SynchronizeThread();
		Thread t = new Thread(ru);
		Thread t3 =new Thread(ru);
		t.setName("窗口1");
		Thread t1 = new Thread(ru);
		t1.setName("窗口2");
		Thread t2 = new Thread(ru);
		t2.setName("窗口3");
		t.start();
		t1.start();
		t2.start();
	}
}
