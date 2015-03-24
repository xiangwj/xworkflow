package com.asia.bomc.workflow.utils;

public class Utils {
	public static boolean isInteger(String str){
		boolean result = true;
		try{
			Integer.parseInt(str);
		}catch(Exception e){
			result = false;
		}
		return result;
	}
}
