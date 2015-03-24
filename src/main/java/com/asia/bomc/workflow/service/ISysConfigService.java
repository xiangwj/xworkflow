package com.asia.bomc.workflow.service;

import java.util.List;
import java.util.Map;

import com.asia.bomc.workflow.entity.ConfigItem;
import com.asia.bomc.workflow.entity.ConfigType;

public interface ISysConfigService {
	public List<ConfigType> getSysConfigByQueryStr(String query);
	public List<Map<String,Object>> getSystreeMapByQuery(String query);
	public void fulfillTreeList(List<Map<String,Object>> list);
	public List<Map<String,Object>> getAllConfigTypeChildren(Integer nodeId);
	public String createSysConfig(String newConfigName,String newConfigDesc,Integer parentTypeId);
	public ConfigType getConfigTypeById(Integer configTypeId);
	public String  updateConfigType(Integer configTypeId,String configTypeName,String configTypeDesc,Integer parentTypeId);
	public long getConfigItemCount(Integer configTypeId,String query);
	public List<ConfigItem> getConfigItemList(Integer configTypeId,String query,  int start,int limit);
	public String createConfigItem(String configItemName,String configItemDesc,String value,String code,String enabled,String ext1,Integer configTypeId);
	public String updateConfigItem(Integer id,String configItemName,String configItemDesc,String value,String code,String enabled,String ext1,Integer configTypeId);
}
