package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
@Entity
@Table(name="BOMC_SECURITY_POSITION")
public class SecurityPosition implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7709648008910110162L;
	@Id
	@Column(name="POSITION_ID")
	private String positionId;
	@Column(name="POSITION_NAME")
	private String positionName;
	@Column(name="POSITION_DESC")
	private String positionDesc;
	@Column(name="CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name="UPDATED_STAMP")
	private Timestamp updatedStamp;
	@OneToMany(targetEntity=UserLoginPositionAssoc.class,fetch=FetchType.LAZY,mappedBy="securityPosition")
	@OrderBy("updatedStamp DESC")
	private Set<UserLoginPositionAssoc> userloginSecurityAssoc = new HashSet<UserLoginPositionAssoc>();
	public String getPositionId() {
		return positionId;
	}
	public void setPositionId(String positionId) {
		this.positionId = positionId;
	}
	public String getPositionName() {
		return positionName;
	}
	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	public String getPositionDesc() {
		return positionDesc;
	}
	public void setPositionDesc(String positionDesc) {
		this.positionDesc = positionDesc;
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
	public Set<UserLoginPositionAssoc> getUserloginSecurityAssoc() {
		return userloginSecurityAssoc;
	}
	public void setUserloginSecurityAssoc(
			Set<UserLoginPositionAssoc> userloginSecurityAssoc) {
		this.userloginSecurityAssoc = userloginSecurityAssoc;
	}
	
}

