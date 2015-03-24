package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

public class PrivateRelationShipPK implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7028595056758345983L;
	private String privateIdFrom;
	private String privateIdTo;
	private String roleTypeIdFrom;
	private String roleTypeIdTo;
	private Timestamp fromDate;
	public PrivateRelationShipPK(){}
	@Column(name="PRIVATE_ID_FROM",length=20)
	public String getPrivateIdFrom() {
		return privateIdFrom;
	}
	public void setPrivateIdFrom(String privateIdFrom) {
		this.privateIdFrom = privateIdFrom;
	}
	@Column(name="PRIVATE_ID_TO",length=20)
	public String getPrivateIdTo() {
		return privateIdTo;
	}
	public void setPrivateIdTo(String privateIdTo) {
		this.privateIdTo = privateIdTo;
	}
	@Column(name="ROLE_TYPE_ID_FROM",length=20)
	public String getRoleTypeIdFrom() {
		return roleTypeIdFrom;
	}
	public void setRoleTypeIdFrom(String roleTypeIdFrom) {
		this.roleTypeIdFrom = roleTypeIdFrom;
	}
	@Column(name="ROLE_TYPE_ID_TO",length=20)
	public String getRoleTypeIdTo() {
		return roleTypeIdTo;
	}
	public void setRoleTypeIdTo(String roleTypeIdTo) {
		this.roleTypeIdTo = roleTypeIdTo;
	}
	@Column(name="FROM_DATE")
	public Timestamp getFromDate() {
		return fromDate;
	}
	public void setFromDate(Timestamp fromDate) {
		this.fromDate = fromDate;
	}
	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean bprivateIdFrom=false;
		boolean bprivateIdTo=false;
		boolean broleTypeIdFrom =false;
		boolean broleTypeIdTo = false;
		boolean bfromDate = false;
		if(this == obj)
			return true;
		if(obj == null)
			return false;
		if(this.getClass()!= obj.getClass())
			return false;
		final PrivateRelationShipPK other= (PrivateRelationShipPK)obj;
		if(other.getPrivateIdFrom()==null && this.getPrivateIdFrom()==null)
			bprivateIdFrom = true;
		if(other.getPrivateIdFrom()!=null && this.getPrivateIdFrom()==null)
			bprivateIdFrom =  false;		
		if(other.getPrivateIdFrom()==null && this.getPrivateIdFrom()!=null)
			bprivateIdFrom =  false;		
		if(other.getPrivateIdFrom().equals(this.getPrivateIdFrom()))
			bprivateIdFrom =  true;	
		else
			bprivateIdFrom =  false;
		
		if(other.getPrivateIdTo()==null && this.getPrivateIdTo()==null)
			bprivateIdTo = true;
		if(other.getPrivateIdTo()!=null && this.getPrivateIdTo()==null)
			bprivateIdTo =  false;		
		if(other.getPrivateIdTo()==null && this.getPrivateIdTo()!=null)
			bprivateIdTo =  false;		
		if(other.getPrivateIdTo().equals(this.getPrivateIdTo()))
			bprivateIdTo =  true;	
		else
			bprivateIdTo =  false;

		if(other.getRoleTypeIdFrom()==null && this.getRoleTypeIdFrom()==null)
			broleTypeIdFrom = true;
		if(other.getRoleTypeIdFrom()!=null && this.getRoleTypeIdFrom()==null)
			broleTypeIdFrom =  false;		
		if(other.getRoleTypeIdFrom()==null && this.getRoleTypeIdFrom()!=null)
			broleTypeIdFrom =  false;		
		if(other.getRoleTypeIdFrom().equals(this.getRoleTypeIdFrom()))
			broleTypeIdFrom =  true;	
		else
			broleTypeIdFrom =  false;
		

		if(other.getRoleTypeIdTo()==null && this.getRoleTypeIdTo()==null)
			broleTypeIdTo = true;
		if(other.getRoleTypeIdTo()!=null && this.getRoleTypeIdTo()==null)
			broleTypeIdTo =  false;		
		if(other.getRoleTypeIdTo()==null && this.getRoleTypeIdTo()!=null)
			broleTypeIdTo =  false;		
		if(other.getRoleTypeIdTo().equals(this.getRoleTypeIdTo()))
			broleTypeIdTo =  true;	
		else
			broleTypeIdTo =  false;
		
		if(other.getFromDate()==null && this.getFromDate()==null)
			bfromDate = true;
		if(other.getFromDate()!=null && this.getFromDate()==null)
			bfromDate =  false;		
		if(other.getFromDate()==null && this.getFromDate()!=null)
			bfromDate =  false;		
		if(other.getFromDate().getTime()==this.getFromDate().getTime())
			bfromDate =  true;	
		else
			bfromDate =  false;		
		
		return (bprivateIdFrom && bprivateIdTo && broleTypeIdFrom && broleTypeIdTo && bfromDate);
	}
	
}
