package com.asia.bomc.workflow.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asia.bomc.workflow.entity.ConfigItem;
import com.asia.bomc.workflow.entity.ConfigType;
import com.asia.bomc.workflow.service.ISysConfigService;
import com.asia.bomc.workflow.utils.Constants;
import com.asia.bomc.workflow.utils.DateTimeUtil;

@Controller()
@RequestMapping("/sysConfig")
public class SysConfigController {
	@Resource(name = "sysConfigService")
	ISysConfigService sysConfigService;

	public ISysConfigService getSysConfigService() {
		return sysConfigService;
	}

	public void setSysConfigService(ISysConfigService sysConfigService) {
		this.sysConfigService = sysConfigService;
	}
	@RequestMapping(value = "/getSysConfigTree.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public List<Map<String, Object>> getSysConfigTree(
			@RequestParam(value = "query", required = false) String query
	) {
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
		lst = sysConfigService.getSystreeMapByQuery(query);
		return lst;
	
	}
	@RequestMapping(value = "/getSysConfigTreeByNodeId.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public List<Map<String, Object>> getSysConfigTreeByNodeId(
			@RequestParam(value = "nodeId", required = false) Integer nodeId
	) {
		if(nodeId==null)
			nodeId = new Integer(-1);
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
		lst = sysConfigService.getAllConfigTypeChildren(nodeId);
		return lst;
	
	}
	@RequestMapping(value="/createConfigType.do")
	@ResponseBody
	public Map<String, String> createConfigType(
			@RequestParam(value = "newConfigName", required = false) String  newConfigName,
			@RequestParam(value = "newConfigDesc", required = false) String  newConfigDesc,
			@RequestParam(value = "parentTypeId", required = false) Integer  parentTypeId
			){
		Map<String, String> result= new HashMap<String,String>();
		String resultMsg = sysConfigService.createSysConfig(newConfigName, newConfigDesc, parentTypeId);
		if("".equals(resultMsg)){
			result.put(Constants.RETURN_CODE, "0");
		}else{
			result.put(Constants.RETURN_CODE, "1");
		}
			
		result.put(Constants.RETURN_MSG, resultMsg);
		return result;
	}
	@RequestMapping(value="/getConfigTypeById.do")
	@ResponseBody
	public Map<String, String> getConfigTypeById(
			@RequestParam(value = "configTypeId", required = false) Integer  configTypeId
			){
		Map<String, String> result= new HashMap<String,String>();
		ConfigType configType = sysConfigService.getConfigTypeById(configTypeId);
		result.put("configTypeId", String.valueOf(configType.getId()));
		result.put("configTypeName", configType.getConfigTypeName());
		result.put("configTypeDesc", configType.getConfigTypeDesc());
		return result;
	}
	@RequestMapping(value="/updateConfigType.do")
	@ResponseBody
	public Map<String, String> updateConfigType(
			@RequestParam(value = "configTypeId", required = false) Integer  configTypeId,
			@RequestParam(value = "configTypeName", required = false) String  configTypeName,
			@RequestParam(value = "configTypeDesc", required = false) String  configTypeDesc,
			@RequestParam(value = "parentTypeId", required = false) Integer  parentTypeId
			){
		Map<String, String> result= new HashMap<String,String>();
		String resultMsg = sysConfigService.updateConfigType(configTypeId, configTypeName, configTypeDesc, parentTypeId);
		if("".equals(resultMsg)){
			result.put(Constants.RETURN_CODE, "0");
		}else{
			result.put(Constants.RETURN_CODE, "1");
		}
			
		result.put(Constants.RETURN_MSG, resultMsg);
		return result;
	}
	@RequestMapping(value="/getConfigItemList.do")
	@ResponseBody
	public Map<String, Object> getConfigItemList(
			@RequestParam(value = "configTypeId", required = false) Integer configTypeId,
			@RequestParam(value = "query", required = false) String query,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit
			){
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String,Object>> records = new ArrayList<Map<String,Object>>();
		long count = sysConfigService.getConfigItemCount(configTypeId, query);
		List<ConfigItem> items = sysConfigService.getConfigItemList(configTypeId, query, start, limit);
		for(ConfigItem item:items){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("configTypeId",item.getConfigType().getId()==null?"":""+item.getConfigType().getId());
			row.put("configTypeName",item.getConfigType().getConfigTypeName()==null?"":""+item.getConfigType().getConfigTypeName());
			row.put("configItemId", item.getId()==null?"":""+item.getId());
			row.put("configItemName", item.getConfigItemName()==null?"":item.getConfigItemName());
			row.put("configItemDesc", item.getConfigItemDesc()==null?"":item.getConfigItemDesc());
			row.put("configValue", item.getValue()==null?"":item.getValue());
			row.put("configCode",item.getCode()==null?"":item.getCode());
			row.put("ext1",item.getExt1()==null?"":item.getExt1());
			row.put("enabled",item.getEnabled()==null?"":item.getEnabled());
			row.put("createdStamp", item.getCreatedStamp()==null?"":DateTimeUtil.format(item.getCreatedStamp(), "yyyy-MM-dd HH:mm:ss"));
			row.put("updatedStamp", item.getUpdatedStamp()==null?"":DateTimeUtil.format(item.getUpdatedStamp(), "yyyy-MM-dd HH:mm:ss"));
			records.add(row);
		}
		result.put(Constants.TOTAL_COUNT, count);
		result.put(Constants.RECORDS, records);
		return result;
	}
	@RequestMapping(value="/createConfigItem.do")
	@ResponseBody
	public Map<String, String> createConfigItem(
			@RequestParam(value = "configItemName", required = false) String  configItemName,
			@RequestParam(value = "configItemDesc", required = false) String  configItemDesc,
			@RequestParam(value = "value", required = false) String  value,
			@RequestParam(value = "code", required = false) String  code,
			@RequestParam(value = "enabled", required = false) String  enabled,
			@RequestParam(value = "ext1", required = false) String  ext1,
			@RequestParam(value = "configTypeId", required = false) Integer  configTypeId
			){
		Map<String, String> result= new HashMap<String,String>();
		String resultMsg = sysConfigService.createConfigItem(configItemName, configItemDesc, value, code, enabled, ext1, configTypeId);
		if("".equals(resultMsg)){
			result.put(Constants.RETURN_CODE, "0");
		}else{
			result.put(Constants.RETURN_CODE, "1");
		}
			
		result.put(Constants.RETURN_MSG, resultMsg);
		return result;
	}
	@RequestMapping(value="/updateConfigItem.do")
	@ResponseBody
	public Map<String,String> updateConfigItem(
			@RequestParam(value = "id", required = false) Integer  id,
			@RequestParam(value = "configItemName", required = false) String  configItemName,
			@RequestParam(value = "configItemDesc", required = false) String  configItemDesc,
			@RequestParam(value = "value", required = false) String  value,
			@RequestParam(value = "code", required = false) String  code,
			@RequestParam(value = "enabled", required = false) String  enabled,
			@RequestParam(value = "ext1", required = false) String  ext1,
			@RequestParam(value = "configTypeId", required = false) Integer  configTypeId
			){
		Map<String, String> result= new HashMap<String,String>();
		String resultMsg = sysConfigService.updateConfigItem(id, configItemName, configItemDesc, value, code, enabled, ext1, configTypeId);
		if("".equals(resultMsg)){
			result.put(Constants.RETURN_CODE, "0");
		}else{
			result.put(Constants.RETURN_CODE, "1");
		}
			
		result.put(Constants.RETURN_MSG, resultMsg);
		return result;
	}
}
