package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name="BOMC_PRIVATE")
class Private implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6026603181058593783L;
	private String privateId;
	private String privateTypeId;
	private String statusId;
	private String createdByUserLogin;
	private String updatedByUserLogin;
	private Timestamp createdStamp;
	private Timestamp updatedStamp;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE,generator="private_pk_gen")
	@TableGenerator(name="private_pk_gen",table="BOMC_SEQUENCE_VALUE_ITEM",pkColumnName="SEQ_NAME",pkColumnValue="BOMC_PRIVATE",valueColumnName="SEQ_ID",allocationSize=10)
	@Column(name="PRIVATE_ID",length=20)
	public String getPrivateId() {
		return privateId;
	}
	public void setPrivateId(String privateId) {
		this.privateId = privateId;
	}
	@Column(name="PRIVATE_TYPE_ID",length=20)
	public String getPrivateTypeId() {
		return privateTypeId;
	}
	public void setPrivateTypeId(String privateTypeId) {
		this.privateTypeId = privateTypeId;
	}
	@Column(name="STATUS_ID")
	public String getStatusId() {
		return statusId;
	}
	public void setStatusId(String statusId) {
		this.statusId = statusId;
	}
	@Column(name="CREATED_BY_USER_LOGIN",length=255)
	public String getCreatedByUserLogin() {
		return createdByUserLogin;
	}
	public void setCreatedByUserLogin(String createdByUserLogin) {
		this.createdByUserLogin = createdByUserLogin;
	}
	@Column(name="UPDATED_BY_USER_LOGIN")
	public String getUpdatedByUserLogin() {
		return updatedByUserLogin;
	}
	public void setUpdatedByUserLogin(String updatedByUserLogin) {
		this.updatedByUserLogin = updatedByUserLogin;
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
	
}
