/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.asia.bomc.workflow.security;

import java.util.Collection;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;

import com.asia.bomc.workflow.entity.SecurityPermission;
import com.asia.bomc.workflow.entity.SecurityRole;
import com.asia.bomc.workflow.entity.UserLogin;
import com.asia.bomc.workflow.exception.BomcServiceException;
import com.asia.bomc.workflow.service.IUserService;
import com.asia.bomc.workflow.utils.CollectionUtils;

public class SecurityRealm extends AuthorizingRealm {

	/*private static final Logger logger = LoggerFactory
			.getLogger(SecurityRealm.class);*/
	@Resource(name = "userService")
	private IUserService UserService;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		/*UserLogin user = (UserLogin) getAvailablePrincipal(principals);
		if (user != null) {
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			Collection<SecurityRole> roles = user.getRoles();
			if (!CollectionUtils.isEmpty(roles)) {
				for (SecurityRole role : roles) {
					info.addRole(role.getSecurityRoleId());
					Collection<SecurityPermission> permissions = role
							.getPermissions();
					if (!CollectionUtils.isEmpty(permissions)) {
						for (SecurityPermission permission : permissions)
							info.addStringPermission(permission
									.getPermissionId());
					}
				}
			}
			return info;
		} else {
			return null;
		}*/
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		String username = token.getUsername();

		//logger.info("authenticating user: {}", username);

		if (StringUtils.isEmpty(username)) {
			throw new AccountException("Null usernames are not allowed.");
		}

		UserLogin user=null;
		try {
			//user = UserService.findByUserName(username);
		} catch (BomcServiceException e) {
			throw new UnknownAccountException(e.getMessage());
		}

		SimpleAuthenticationInfo saInfo = new SimpleAuthenticationInfo(user,
				user.getPassword(), getName());
		// saInfo.setCredentialsSalt(ByteSource.Util.bytes(user.getSalt()));

		return saInfo;
	}

	/**
	 * 清空用户关联权限认证，待下次使用时重新加载。
	 * 
	 * @param principal
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(
				principal, getName());
		clearCachedAuthorizationInfo(principals);
	}

	/**
	 * 清空所有关联认证
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			cache.clear();
		}
	}

	public void setUserService(IUserService userService) {
		UserService = userService;
	}

}
