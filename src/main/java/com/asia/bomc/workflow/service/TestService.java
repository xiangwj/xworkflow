package com.asia.bomc.workflow.service;

import org.springframework.stereotype.Service;

@Service(value = "TestService")
public class TestService implements ITestService{

	public void test() {
		System.out.print("ok");
		
	}

}
