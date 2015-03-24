package com.asia.bomc.workflow.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;
@Embeddable
public class UserLoginPositionAssocPK implements Serializable{

	private static final long serialVersionUID = 602167993308768027L;
	private Integer userPartyId;
	private String positionId;
	public UserLoginPositionAssocPK(){}
	public UserLoginPositionAssocPK(Integer userPartyId,String positionId){
		this.userPartyId = userPartyId;
		this.positionId = positionId;
	}
	public Integer getUserPartyId() {
		return userPartyId;
	}
	public void setUserPartyId(Integer userPartyId) {
		this.userPartyId = userPartyId;
	}
	public String getPositionId() {
		return positionId;
	}
	public void setPositionId(String positionId) {
		this.positionId = positionId;
	}
	
}
