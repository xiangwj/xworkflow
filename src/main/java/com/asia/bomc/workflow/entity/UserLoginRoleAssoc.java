package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BOMC_USER_ROLE_ASSOC")
public class UserLoginRoleAssoc implements Serializable {
	@Id
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "userPartyId", column = @Column(name = "USER_PARTY_ID")),
			@AttributeOverride(name = "roleId", column = @Column(name = "ROLE_ID")) })
	private UserLoginRoleAssocPK id;

	@ManyToOne(targetEntity = UserLogin.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_PARTY_ID", referencedColumnName = "PARTY_ID", insertable = false, updatable = false)
	private UserLogin userLogin;

	@ManyToOne(targetEntity = SecurityRole.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "ROLE_ID", referencedColumnName = "SECURITY_ROLE_ID", insertable = false, updatable = false)
	private SecurityRole role;
	@Column(name = "CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name = "UPDATED_STAMP")
	private Timestamp updatedStamp;

	public UserLoginRoleAssocPK getId() {
		return id;
	}

	public void setId(UserLoginRoleAssocPK id) {
		this.id = id;
	}

	public UserLogin getUserLogin() {
		return userLogin;
	}

	public void setUserLogin(UserLogin userLogin) {
		this.userLogin = userLogin;
	}



	public SecurityRole getRole() {
		return role;
	}

	public void setRole(SecurityRole role) {
		this.role = role;
	}

	public Timestamp getCreatedStamp() {
		return createdStamp;
	}

	public void setCreatedStamp(Timestamp createdStamp) {
		this.createdStamp = createdStamp;
	}

	public Timestamp getUpdatedStamp() {
		return updatedStamp;
	}

	public void setUpdatedStamp(Timestamp updatedStamp) {
		this.updatedStamp = updatedStamp;
	}

}
