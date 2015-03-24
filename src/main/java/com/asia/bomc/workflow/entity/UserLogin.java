package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.OrderColumn;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

/**
 * @author Administrator
 * 
 */
@Entity
@Table(name = "BOMC_USER_LOGIN")
public class UserLogin implements Serializable {
	private static final long serialVersionUID = 5498840264759038369L;
	private Integer id;
	private String userLoginId;
	private String firstName;
	private String password;
	private String enabled;
	private String mobileNo;
	private String email;
	private Timestamp validDate;
	private Timestamp expireDate;
	private Timestamp createdStamp;
	private Timestamp updatedStamp;
	private String gender;
	private Set<UserLoginRoleAssoc> userLoginRoleAssocs = new HashSet<UserLoginRoleAssoc>();
	private Set<Group> groups = new HashSet<Group>();
	private Set<UserLoginPositionAssoc> userLoginPositionAssoc = new HashSet<UserLoginPositionAssoc>();
	
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "user_login_pk_gen")
	@TableGenerator(name = "user_login_pk_gen", table = "BOMC_SEQUENCE_VALUE_ITEM", pkColumnName = "SEQ_NAME", pkColumnValue = "PARTY", valueColumnName = "SEQ_ID", allocationSize = 10)
	@Column(name = "PARTY_ID")
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "USER_LOGIN_ID", length = 20, unique = true)
	public String getUserLoginId() {
		return userLoginId;
	}

	public void setUserLoginId(String userLoginId) {
		this.userLoginId = userLoginId;
	}

	@Column(name = "FIRST_NAME", length = 255)
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "CURRENT_PASSWORD", length = 255)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "ENABLED", length = 1)
	public String getEnabled() {
		return enabled;
	}

	@Column(name = "MOBILE_NO", length = 255)
	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	@Column(name = "EMAIL", length = 255)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "VALID_DATE")
	public Timestamp getValidDate() {
		return validDate;
	}

	public void setValidDate(Timestamp validDate) {
		this.validDate = validDate;
	}

	@Column(name = "EXPIRE_DATE")
	public Timestamp getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Timestamp expireDate) {
		this.expireDate = expireDate;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	@Column(name = "CREATED_STAMP")
	public Timestamp getCreatedStamp() {
		return createdStamp;
	}

	public void setCreatedStamp(Timestamp createdStamp) {
		this.createdStamp = createdStamp;
	}

	@Column(name = "UPDATED_STAMP")
	public Timestamp getUpdatedStamp() {
		return updatedStamp;
	}

	public void setUpdatedStamp(Timestamp updatedStamp) {
		this.updatedStamp = updatedStamp;
	}

	@Column(name = "GENDER", length = 20)
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY, mappedBy = "users")
	public Set<Group> getGroups() {
		return groups;
	}

	public void setGroups(Set<Group> groups) {
		this.groups = groups;
	}

	@Override
	public int hashCode() {
		return super.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserLogin other = (UserLogin) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;

	}

	@OneToMany(targetEntity=UserLoginRoleAssoc.class,fetch=FetchType.LAZY,mappedBy="userLogin")
	@OrderBy("updatedStamp DESC")
	public Set<UserLoginRoleAssoc> getUserLoginRoleAssocs() {
		return userLoginRoleAssocs;
	}

	public void setUserLoginRoleAssocs(Set<UserLoginRoleAssoc> userLoginRoleAssocs) {
		this.userLoginRoleAssocs = userLoginRoleAssocs;
	}
	@OneToMany(targetEntity=UserLoginPositionAssoc.class,fetch=FetchType.LAZY,mappedBy="userLogin")
	@OrderBy("updatedStamp DESC")
	public Set<UserLoginPositionAssoc> getUserLoginPositionAssoc() {
		return userLoginPositionAssoc;
	}

	public void setUserLoginPositionAssoc(
			Set<UserLoginPositionAssoc> userLoginPositionAssoc) {
		this.userLoginPositionAssoc = userLoginPositionAssoc;
	}







}
