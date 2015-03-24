package com.asia.bomc.workflow.web.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class ListenTest implements HttpSessionListener{

	public void sessionCreated(HttpSessionEvent arg0) {
		System.out.println(arg0.getSession().getId());
		// TODO Auto-generated method stub
		
	}

	public void sessionDestroyed(HttpSessionEvent arg0) {
		System.out.println(arg0.getSession().getId());
		System.out.println("111111111111");
		
	}

}
