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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.TableGenerator;
@Entity(name = "BOMC_CONFIG_TYPE")
public class ConfigType implements Serializable{
	private static final long serialVersionUID = -9217108364165092297L;
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "privateConfigTypeId_pk_gen")
	@TableGenerator(name = "privateConfigTypeId_pk_gen", table = "BOMC_SEQUENCE_VALUE_ITEM", pkColumnName = "SEQ_NAME", pkColumnValue = "PARTY", valueColumnName = "SEQ_ID", allocationSize = 10)
	@Column(name = "CONFIG_TYPE_ID")
	private Integer id;
	@Column(name="CONFIG_TYPE_NAME")
	private String configTypeName;
	@Column(name="CONFIG_TYPE_DESC")
	private String configTypeDesc;
	@Column(name="CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name="UPDATED_STAMP")
	private Timestamp updatedStamp;
	@ManyToOne(targetEntity=ConfigType.class,fetch=FetchType.LAZY)
	@JoinTable(name="BOMC_CONFIG_T_T_ASS",joinColumns=@JoinColumn(name="PARTY_ID_TO"),inverseJoinColumns=@JoinColumn(name="PARTY_ID_FROM"))
	private ConfigType parentType;
	@OneToMany(targetEntity=ConfigType.class,fetch=FetchType.LAZY)
	@JoinTable(name="BOMC_CONFIG_T_T_ASS",joinColumns=@JoinColumn(name="PARTY_ID_FROM"),inverseJoinColumns=@JoinColumn(name="PARTY_ID_TO"))
	private Set<ConfigType> children = new HashSet<ConfigType>();
	@OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY, mappedBy="configType")
	Set<ConfigItem> configItems = new HashSet<ConfigItem>();
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getConfigTypeName() {
		return configTypeName;
	}
	public void setConfigTypeName(String configTypeName) {
		this.configTypeName = configTypeName;
	}
	public String getConfigTypeDesc() {
		return configTypeDesc;
	}
	public void setConfigTypeDesc(String configTypeDesc) {
		this.configTypeDesc = configTypeDesc;
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

	public ConfigType getParentType() {
		return parentType;
	}
	public void setParentType(ConfigType parentType) {
		this.parentType = parentType;
	}
	public Set<ConfigType> getChildren() {
		return children;
	}
	public void setChildren(Set<ConfigType> children) {
		this.children = children;
	}
	public Set<ConfigItem> getConfigItems() {
		return configItems;
	}
	public void setConfigItems(Set<ConfigItem> configItems) {
		this.configItems = configItems;
	}	
	
}
