package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
@Entity
@Table(name="BOMC_PRIVATE_RELATIONSHIP")
@IdClass(PrivateRelationShipPK.class)
public class PrivateRelationship implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6317564997942349132L;
	private String privateIdFrom;
	private String privateIdTo;
	private String roleTypeIdFrom;
	private String roleTypeIdTo;
	private Timestamp fromDate;
	private Timestamp thruDate;
	private String privateRelationshipTypeId;
	private Timestamp createdStamp;
	private Timestamp updatedStamp;
	private String createdByUserLogin;
	private String updatedByUserLogin;
	//private Private pIdFrom;
	//private Private PIdTo;
	@Id
	public String getPrivateIdFrom() {
		return privateIdFrom;
	}
	public void setPrivateIdFrom(String privateIdFrom) {
		this.privateIdFrom = privateIdFrom;
	}
	@Id
	public String getPrivateIdTo() {
		return privateIdTo;
	}
	public void setPrivateIdTo(String privateIdTo) {
		this.privateIdTo = privateIdTo;
	}
	@Id
	public String getRoleTypeIdFrom() {
		return roleTypeIdFrom;
	}
	public void setRoleTypeIdFrom(String roleTypeIdFrom) {
		this.roleTypeIdFrom = roleTypeIdFrom;
	}
	@Id
	public String getRoleTypeIdTo() {
		return roleTypeIdTo;
	}
	public void setRoleTypeIdTo(String roleTypeIdTo) {
		this.roleTypeIdTo = roleTypeIdTo;
	}
	@Id
	public Timestamp getFromDate() {
		return fromDate;
	}
	public void setFromDate(Timestamp fromDate) {
		this.fromDate = fromDate;
	}
	@Column(name="THRU_DATE")
	public Timestamp getThruDate() {
		return thruDate;
	}
	public void setThruDate(Timestamp thruDate) {
		this.thruDate = thruDate;
	}
	@Column(name="PRIVATE_RELATIONSHIP_TYPE_ID",length=20)
	public String getPrivateRelationshipTypeId() {
		return privateRelationshipTypeId;
	}
	public void setPrivateRelationshipTypeId(String privateRelationshipTypeId) {
		this.privateRelationshipTypeId = privateRelationshipTypeId;
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
	@Column(name="CREATED_BY_USER_LOGIN",length=20)
	public String getCreatedByUserLogin() {
		return createdByUserLogin;
	}
	public void setCreatedByUserLogin(String createdByUserLogin) {
		this.createdByUserLogin = createdByUserLogin;
	}
	@Column(name="UPDATED_BY_USER_LOGIN",length=20)
	public String getUpdatedByUserLogin() {
		return updatedByUserLogin;
	}
	public void setUpdatedByUserLogin(String updatedByUserLogin) {
		this.updatedByUserLogin = updatedByUserLogin;
	}
	/*@MapsId(value="privateIdFrom")
	@ManyToOne(targetEntity=Private.class)
	public Private getpIdFrom() {
		return pIdFrom;
	}
	public void setpIdFrom(Private pIdFrom) {
		this.pIdFrom = pIdFrom;
	}
	@MapsId(value="privateIdTo")
	@ManyToOne(targetEntity=Private.class)	
	public Private getPIdTo() {
		return PIdTo;
	}
	public void setPIdTo(Private pIdTo) {
		PIdTo = pIdTo;
	}*/
	
	
}
