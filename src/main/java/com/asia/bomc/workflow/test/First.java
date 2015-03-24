package com.asia.bomc.workflow.test;

import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.ProcessEngineImpl;
public class First {
	public static void main(String[] args)throws Exception{
		// 创建流程引擎
		ProcessEngineImpl engine = (ProcessEngineImpl) ProcessEngines
				.getDefaultProcessEngine();
		engine.getProcessEngineConfiguration().getJobExecutor().start();
		// 得到流程存储服务实例
		RepositoryService repositoryService = engine.getRepositoryService();
		repositoryService.createDeployment()
				.addClasspathResource("workflowdef/jobException.bpmn").deploy();
		// 关闭 JobExecutor
		Thread.sleep(2000);
		engine.getProcessEngineConfiguration().getJobExecutor().shutdown();	

	}
	
}
