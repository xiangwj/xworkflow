package com.asia.bomc.workflow.service;

import java.util.List;

import com.asia.bomc.workflow.entity.SecurityRole;


public interface IRoleService {
	public List<SecurityRole> getRoleByQueryStr(String query);
	
}
