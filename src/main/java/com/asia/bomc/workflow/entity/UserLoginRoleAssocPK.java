package com.asia.bomc.workflow.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class UserLoginRoleAssocPK implements Serializable {
	private static final long serialVersionUID = -8904622484622462723L;
	private Integer userPartyId;
	private String roleId;

	public UserLoginRoleAssocPK() {
	}

	public UserLoginRoleAssocPK(Integer userPartyId, String roleId) {
		this.userPartyId = userPartyId;
		this.roleId = roleId;
	}

	public Integer getUserPartyId() {
		return userPartyId;
	}

	public void setUserPartyId(Integer userPartyId) {
		this.userPartyId = userPartyId;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
