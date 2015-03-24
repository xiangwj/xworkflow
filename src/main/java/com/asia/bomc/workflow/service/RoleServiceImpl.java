package com.asia.bomc.workflow.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asia.bomc.workflow.dao.RoleDaoImp;
import com.asia.bomc.workflow.entity.SecurityPermission;
import com.asia.bomc.workflow.entity.SecurityRole;

@Service(value = "roleService")
public class RoleServiceImpl implements IRoleService{
	@Resource(name = "roleDao")
	private RoleDaoImp roleDao;

	public RoleDaoImp getRoleDao() {
		return roleDao;
	}

	public void setRoleDao(RoleDaoImp roleDao) {
		this.roleDao = roleDao;
	}
	@Transactional
	public List<SecurityRole> getRoleByQueryStr(String query){

		
			
		String jpql = "SELECT DISTINCT SR FROM "+SecurityRole.class.getName()+" SR JOIN SR.permissions PR  WHERE(SR.securityRoleId LIKE:query OR SR.securityRoleName LIKE:query OR PR.permissionId LIKE:query OR PR.permissionName LIKE:query)";
		Map<String,Object>  critals = new HashMap<String,Object>();
		critals.put("query", "%"+query+"%");
		List<SecurityRole> roles = roleDao.findByJpql(SecurityRole.class, jpql, critals);
		for(SecurityRole role:roles){
			Set<SecurityPermission> permissions = role.getPermissions();
			for(SecurityPermission permission:permissions){
				System.out.println(permission.getPermissionId());
			}
		}
		return roles;
	}
}
