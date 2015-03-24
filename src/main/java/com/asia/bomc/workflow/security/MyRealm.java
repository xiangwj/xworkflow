package com.asia.bomc.workflow.security;

import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.transaction.annotation.Transactional;

import com.asia.bomc.workflow.entity.SecurityRole;
import com.asia.bomc.workflow.entity.UserLogin;
import com.asia.bomc.workflow.service.IUserService;

public class MyRealm extends CasRealm {
	@Resource(name = "userService")
	private IUserService UserService;

	public IUserService getUserService() {
		return UserService;
	}

	public void setUserService(IUserService userService) {
		UserService = userService;
	}
	@Transactional
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo simpleAuthorizationInfo= (SimpleAuthorizationInfo)super.doGetAuthorizationInfo(principals);
		String userId = String.valueOf(principals.asList().get(0));
		List<UserLogin> users = UserService.findByUserName(userId);
		UserLogin user = users.get(0);
		List<SecurityRole> roles = UserService.getRolesByUserParyId(user.getId());
		
		for(SecurityRole role:roles)
		{
			System.out.println("role:"+role.getSecurityRoleDesc());
		}
		//Collection<SecurityRole> roles = user.getRoles();
		
		return simpleAuthorizationInfo;
	}
}
