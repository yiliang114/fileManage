package com.mrjzhang.server;

import java.text.SimpleDateFormat;
import java.util.Date;

public class GetTime {
	
	public String getTime() {
		// TODO Auto-generated constructor stub
		Date dt = new Date();
		SimpleDateFormat matter1 = new SimpleDateFormat("MM-dd");
		return matter1.format(dt);
	
		
	}
}