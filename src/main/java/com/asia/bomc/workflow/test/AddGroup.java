package com.asia.bomc.workflow.test;

import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.identity.Group;

public class AddGroup {
	public static void main(String[] args){
		ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
		// 得到身份服务组件实例
		IdentityService identityService = engine.getIdentityService();
	
		// 根据ID删除用户组
		identityService.deleteGroup("12501");
		System.out.println("删除后用户组数量："
				+ identityService.createGroupQuery().count());
	}
}
