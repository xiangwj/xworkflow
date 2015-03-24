package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.TableGenerator;

@Entity(name = "BOMC_PARTY_GROUP")
public class Group implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6749837093631442321L;

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "privateGroup_pk_gen")
	@TableGenerator(name = "privateGroup_pk_gen", table = "BOMC_SEQUENCE_VALUE_ITEM", pkColumnName = "SEQ_NAME", pkColumnValue = "PARTY", valueColumnName = "SEQ_ID", allocationSize = 10)
	@Column(name = "PARTY_ID", length = 20)
	private Integer partyId;
	@Column(name = "GROUP_NAME", length = 255)
	private String groupName;
	@Column(name = "DESCRIPTION", length = 4000)
	private String description;
	@Column(name = "CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name = "UPDATED_STAMP")
	private Timestamp updatedStamp;
	
	@ManyToOne(targetEntity=Group.class,fetch=FetchType.LAZY)
	@JoinTable(name="BOMC_GROUP_GROUP_ASSOC",joinColumns=@JoinColumn(name="PARTY_ID_TO"),inverseJoinColumns=@JoinColumn(name="PARTY_ID_FROM"))
	private Group parent;
	
	@OneToMany(targetEntity=Group.class,fetch=FetchType.LAZY)
	@JoinTable(name="BOMC_GROUP_GROUP_ASSOC",joinColumns=@JoinColumn(name="PARTY_ID_FROM"),inverseJoinColumns=@JoinColumn(name="PARTY_ID_TO"))
	private Set<Group> children ;
	
	@ManyToMany(targetEntity=UserLogin.class,fetch=FetchType.LAZY)
	@JoinTable(name="BOMC_GROUP_USER_ASSOC",joinColumns=@JoinColumn(name="PARTY_ID_FROM"),inverseJoinColumns=@JoinColumn(name="PARTY_ID_TO"))
	private Set<UserLogin> users = new HashSet();
	
	
	public Integer getPartyId() {
		return partyId;
	}

	public void setPartyId(Integer partyId) {
		this.partyId = partyId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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



	public Collection<Group> getChildren() {
		return children;
	}

	public void setChildren(Set<Group> children) {
		this.children = children;
	}

	public Group getParent() {
		return parent;
	}

	public void setParent(Group parent) {
		this.parent = parent;
	}

	public Collection<UserLogin> getUsers() {
		return users;
	}

	public void setUsers(Set<UserLogin> users) {
		this.users = users;
	}
	public void addUser(UserLogin userLogin){
		if(!users.contains(userLogin))
		this.users.add(userLogin);
	}
	public void remove(UserLogin userLogin){
		if(users.contains(userLogin))
			this.users.remove(userLogin);
	}

}