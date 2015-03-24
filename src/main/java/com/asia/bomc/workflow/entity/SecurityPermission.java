package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
@Entity(name="BOMC_SECURITY_PERMISSION")
public class SecurityPermission implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5852336946849868963L;
	private String permissionId;
	private String permissionName;
	private String description;
	private Timestamp createdStamp;
	private Timestamp updatedStamp;
	private Set<SecurityRole>roles;
	@Id
	@Column(name="PERMISSION_ID",length=20)
	public String getPermissionId() {
		return permissionId;
	}
	public void setPermissionId(String permissionId) {
		this.permissionId = permissionId;
	}
	@Column(name="DESCRIPTION")
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
	@ManyToMany(mappedBy="permissions",fetch=FetchType.LAZY)
	public Set<SecurityRole> getRoles() {
		return roles;
	}
	public void setRoles(Set<SecurityRole> roles) {
		this.roles = roles;
	}
	@Column(name="PERMISSION_NAME")
	public String getPermissionName() {
		return permissionName;
	}
	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}
	
}
