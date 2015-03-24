package com.asia.bomc.workflow.web.controller;

import org.apache.shiro.authz.SimpleAuthorizationInfo;

public class test {
	public void test1(){
		SimpleAuthorizationInfo  info = new SimpleAuthorizationInfo();
		info.addStringPermission("");
	}
}
