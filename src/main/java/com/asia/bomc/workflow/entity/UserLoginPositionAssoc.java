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
@Table(name = "BOMC_USER_POSITION_ASSOC")
public class UserLoginPositionAssoc implements Serializable{
	private static final long serialVersionUID = -3126324879581457471L;
	@Id
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "userPartyId", column = @Column(name = "USER_PARTY_ID")),
			@AttributeOverride(name = "positionId", column = @Column(name = "POSITION_ID")) })
	private UserLoginPositionAssocPK id;
	@Column(name="CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name="UPDATED_STAMP")
	private Timestamp updatedStamp;
	@ManyToOne(targetEntity = UserLogin.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_PARTY_ID", referencedColumnName = "PARTY_ID", insertable = false, updatable = false)
	private UserLogin userLogin;
	@ManyToOne(targetEntity = SecurityPosition.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "POSITION_ID", referencedColumnName = "POSITION_ID", insertable = false, updatable = false)
	private SecurityPosition securityPosition;
	public UserLoginPositionAssocPK getId() {
		return id;
	}
	public void setId(UserLoginPositionAssocPK id) {
		this.id = id;
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
	public UserLogin getUserLogin() {
		return userLogin;
	}
	public void setUserLogin(UserLogin userLogin) {
		this.userLogin = userLogin;
	}
	public SecurityPosition getSecurityPosition() {
		return securityPosition;
	}
	public void setSecurityPosition(SecurityPosition securityPosition) {
		this.securityPosition = securityPosition;
	}

}
