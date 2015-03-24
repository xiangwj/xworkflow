package com.asia.bomc.workflow.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class DateTimeUtil {
	public static String format(Timestamp timeStamp,String format){
		SimpleDateFormat df = new SimpleDateFormat(format);
		String result = "";
		if(timeStamp == null)
			result ="";
		else
			result = df.format(timeStamp);
		return result;
	}
}
