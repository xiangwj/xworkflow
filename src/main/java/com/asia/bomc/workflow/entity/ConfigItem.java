package com.asia.bomc.workflow.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;
@Entity(name = "BOMC_CONFIG_ITEM")
public class ConfigItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3251715031551154581L;
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "privateConfigItem_pk_gen")
	@TableGenerator(name = "privateConfigItem_pk_gen", table = "BOMC_SEQUENCE_VALUE_ITEM", pkColumnName = "SEQ_NAME", pkColumnValue = "PARTY", valueColumnName = "SEQ_ID", allocationSize = 10)
	@Column(name = "CONFIG_ITEM_ID")
	private Integer id;
	@Column(name="CONFIG_ITEM_NAME")
	private String configItemName;
	@Column(name="CONFIG_ITEM_DESC")
	private String configItemDesc;
	@Column(name="CONFIG_VALUE")
	private String value;
	@Column(name="CONFIG_CODE")
	private String code;
	@Column(name="ENABLED")
	private String enabled;
	@Column(name="EXT1")
	private String ext1;
	@Column(name="CREATED_STAMP")
	private Timestamp createdStamp;
	@Column(name="UPDATED_STAMP")
	private Timestamp updatedStamp;
	@Column(name="DELETED")
	private String deleted;	
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="CONFIG_TYPE_ID")
	private ConfigType configType;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getConfigItemName() {
		return configItemName;
	}
	public void setConfigItemName(String configItemName) {
		this.configItemName = configItemName;
	}
	public String getConfigItemDesc() {
		return configItemDesc;
	}
	public void setConfigItemDesc(String configItemDesc) {
		this.configItemDesc = configItemDesc;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getEnabled() {
		return enabled;
	}
	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}
	public String getExt1() {
		return ext1;
	}
	public void setExt1(String ext1) {
		this.ext1 = ext1;
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
	
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public ConfigType getConfigType() {
		return configType;
	}
	public void setConfigType(ConfigType configType) {
		this.configType = configType;
	}
	
}
