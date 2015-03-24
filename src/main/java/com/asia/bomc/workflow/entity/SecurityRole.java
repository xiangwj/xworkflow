package com.asia.bomc.workflow.entity;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="BOMC_SECURITY_ROLE")
public class SecurityRole implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3468470761359537345L;
	private String securityRoleId;
	private String securityRoleName;
	private String securityRoleDesc;
	private Timestamp createdStamp;
	private Timestamp updatedStamp;
	private Set<SecurityPermission> permissions = new HashSet<SecurityPermission>(); 

	private Set<UserLoginRoleAssoc> userLoginRoleAssoc = new HashSet<UserLoginRoleAssoc>();
	@Id
	@Column(name="SECURITY_ROLE_ID",length=255)
	public String getSecurityRoleId() {
		return securityRoleId;
	}
	public void setSecurityRoleId(String securityRoleId) {
		this.securityRoleId = securityRoleId;
	}
	@Column(name="SECURITY_ROLE_NAME",length=255)
	public String getSecurityRoleName() {
		return securityRoleName;
	}
	public void setSecurityRoleName(String securityRoleName) {
		this.securityRoleName = securityRoleName;
	}
	@Column(name="SECURITY_ROLE_DESC",length=1000)
	public String getSecurityRoleDesc() {
		return securityRoleDesc;
	}
	public void setSecurityRoleDesc(String securityRoleDesc) {
		this.securityRoleDesc = securityRoleDesc;
	}
	@Column(name="CREATED_STAMP")
	public Timestamp getCreatedStamp() {
		return createdStamp;
	}
	public void setCreatedStamp(Timestamp createdStamp) {
		this.createdStamp = createdStamp;
	}
	@Column(name="UPDATED_STAMP")
	public Timestamp getUpdatedStamp() {
		return updatedStamp;
	}
	public void setUpdatedStamp(Timestamp updatedStamp) {
		this.updatedStamp = updatedStamp;
	}
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "BOMC_SECURITY_ROLE_PERMISSION", joinColumns = @JoinColumn(name = "SECURITY_ROLE_ID"), inverseJoinColumns =@JoinColumn(name = "PERMISSION_ID") )

	public Set<SecurityPermission> getPermissions() {
		return permissions;
	}
	
	public void setPermissions(Set<SecurityPermission> permissions) {
		this.permissions = permissions;
	}

	@OneToMany(targetEntity=UserLoginRoleAssoc.class,fetch=FetchType.LAZY,mappedBy="role")

	public Set<UserLoginRoleAssoc> getUserLoginRoleAssoc() {
		return userLoginRoleAssoc;
	}
	public void setUserLoginRoleAssoc(Set<UserLoginRoleAssoc> userLoginRoleAssoc) {
		this.userLoginRoleAssoc = userLoginRoleAssoc;
	}

	
}
