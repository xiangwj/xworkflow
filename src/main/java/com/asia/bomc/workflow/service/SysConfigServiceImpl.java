package com.asia.bomc.workflow.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asia.bomc.workflow.dao.SysConfigDaoImp;
import com.asia.bomc.workflow.entity.ConfigItem;
import com.asia.bomc.workflow.entity.ConfigType;
import com.asia.bomc.workflow.utils.DateTimeUtil;
@Service(value="sysConfigService")
public class SysConfigServiceImpl implements ISysConfigService{
	@Resource(name="sysConfigDao")
	SysConfigDaoImp sysConfigDao;
	
	public SysConfigDaoImp getSysConfigDao() {
		return sysConfigDao;
	}

	public void setSysConfigDao(SysConfigDaoImp sysConfigDao) {
		this.sysConfigDao = sysConfigDao;
	}
	@Transactional
	public List<ConfigType> getSysConfigByQueryStr(String query){
		if(query==null)
			query="";
		List<ConfigType> lst = new ArrayList<ConfigType>();
		String jpql="SELECT CT FROM "+ConfigType.class.getName()+" CT WHERE CT.id!=-1 AND (CT.configTypeName LIKE:configTypeName OR CT.configTypeDesc LIKE:configTypeDesc)";
		Map<String,Object>	critals = new HashMap<String,Object>();
		critals.put("configTypeName", "%"+query.trim()+"%");
		critals.put("configTypeDesc", "%"+query.trim()+"%");
		lst = sysConfigDao.findByJpql(ConfigType.class, jpql, critals);
		return lst;
	}

	public Map<String,Object> getParentFromMap(List<Map<String,Object>> allConfigList,ConfigType configType){
		Map<String,Object> parentMap =null;
		for(Map<String,Object> configMap:allConfigList){
			if(Long.parseLong(String.valueOf(configMap.get("configTypeId")))==configType.getId().longValue()){
				parentMap = configMap;
				return parentMap;
			}
			if(configMap.get("children")!=null){
				List<Map<String,Object>> children = (List<Map<String,Object>>)configMap.get("children");
				for(Map<String,Object>child:children){
					parentMap = getParentFromMap(children,configType);
					if(parentMap!=null)
						return parentMap;
				}
			}
		}
		return parentMap;
	}
	@Transactional
	public List<Map<String,Object>> getSystreeMapByQuery(String query){
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
		List<ConfigType> lst = getSysConfigByQueryStr(query);
		for(ConfigType lsItem:lst){
			Map<String,Object> selfData = new HashMap<String,Object>();
			ConfigType self = sysConfigDao.findById(ConfigType.class, lsItem.getId());
			selfData.put("id", lsItem.getId());
			selfData.put("text", lsItem.getConfigTypeName());
			selfData.put("configTypeId", lsItem.getId());
			selfData.put("configTypeName", lsItem.getConfigTypeName());
			selfData.put("configTypeDesc", lsItem.getConfigTypeDesc());
			selfData.put("createdStamp", lsItem.getCreatedStamp()==null?"":DateTimeUtil.format(lsItem.getCreatedStamp(), "yyyy-MM-dd HH:mm:ss"));
			selfData.put("updatedStamp", lsItem.getUpdatedStamp()==null?"":DateTimeUtil.format(lsItem.getUpdatedStamp(), "yyyy-MM-dd HH:mm:ss"));
			if(self.getChildren().size()>0){
				selfData.put("leaf", false);
			}else{
				selfData.put("leaf", true);
			}
			
			Stack<Map<String,Object>> stack = new  Stack<Map<String,Object>>();
			while(self.getParentType()!=null && self.getParentType().getId().intValue()!=-1 ){
				Map<String,Object> parent = getParentFromMap(result ,self.getParentType());
				List<Map<String,Object>> children = null;
				if(parent!=null){
					children = (List<Map<String,Object>>)parent.get("children");
					if(children!=null){
						if(stack.size()>0)
							selfData = (Map<String,Object>)stack.pop();
						boolean inMap = false;
						for(Map<String,Object> el:children){
							if(Integer.parseInt(String.valueOf(el.get("configTypeId")))==self.getId().intValue()){
								inMap = true;
								break;
							}
						}
						if(inMap==false){
							children.add(selfData);
						}
					}else{
						children = new ArrayList<Map<String,Object>>();
						if(stack.size()>0)
							selfData = (Map<String,Object>)stack.pop();						
						children.add(selfData);
						parent.put("children", children);
					}
				}else{
					if(self.getParentType()!=null && self.getParentType().getId().intValue()!=-1){
						Map<String,Object> tmpParentData = new HashMap<String,Object>();
						tmpParentData.put("id",self.getParentType().getId());
						tmpParentData.put("text",self.getParentType().getConfigTypeName());
						tmpParentData.put("configTypeId",self.getParentType().getId());
						tmpParentData.put("configTypeName",self.getParentType().getConfigTypeName());
						tmpParentData.put("configTypeDesc",self.getParentType().getConfigTypeDesc());
						tmpParentData.put("createdStamp",self.getParentType().getCreatedStamp()==null?"":DateTimeUtil.format(self.getParentType().getCreatedStamp(), "yyyy-MM-dd HH:mm:ss"));
						tmpParentData.put("updatedStamp",self.getParentType().getUpdatedStamp()==null?"":DateTimeUtil.format(self.getParentType().getUpdatedStamp(), "yyyy-MM-dd HH:mm:ss"));
						tmpParentData.put("leaf",false);
						children = new ArrayList<Map<String,Object>>();
						if(stack.size()>0){
							selfData = (Map<String,Object>)stack.pop();
						}					
						children.add(selfData);
						tmpParentData.put("children", children);
						stack.push(tmpParentData);
					}
				}
				self = self.getParentType();
			}
			if(self.getParentType()!=null && self.getParentType().getId().intValue()==-1){
				boolean selfInList = false;
				for(Map<String,Object> map:result){
					if(Integer.parseInt(String.valueOf(map.get("configTypeId")))==self.getId().intValue()){
						selfInList = true;
						break;
					}	
				}
				if(selfInList == false){
					if(stack.size()>0)
						result.add(stack.pop());
					else
						result.add(selfData);
				}				
			}

		}
		fulfillTreeList(result);
		return result;
	}
	@Transactional
	public void fulfillTreeList(List<Map<String,Object>> list){
		for(Map<String,Object> lstItem:list){
			ConfigType itemEty = sysConfigDao.findById(ConfigType.class, new Integer(String.valueOf(lstItem.get("configTypeId"))));
			if(lstItem.get("children")==null){
				List<Map<String,Object>> children = new ArrayList<Map<String,Object>>();
				lstItem.put("children", children);
			}
			List<Map<String,Object>> childrenInItem = (List<Map<String,Object>>)lstItem.get("children");
			for(ConfigType cItemEty:itemEty.getChildren()){
				int i=0;
				for(i=0;i<childrenInItem.size();i++){
					if(cItemEty.getId().intValue()==Integer.parseInt(String.valueOf(childrenInItem.get(i).get("configTypeId"))))
						break;
				}
				if(i>=childrenInItem.size()){
					Map<String,Object> mapChildren = new HashMap<String,Object>();
					mapChildren.put("id", cItemEty.getId());
					mapChildren.put("text", cItemEty.getConfigTypeName());
					mapChildren.put("configTypeId", cItemEty.getId());
					mapChildren.put("configTypeName", cItemEty.getConfigTypeName()==null?"":cItemEty.getConfigTypeName());
					mapChildren.put("configTypeDesc", cItemEty.getConfigTypeDesc()==null?"":cItemEty.getConfigTypeDesc());
					mapChildren.put("createdStamp", cItemEty.getCreatedStamp()==null?"":DateTimeUtil.format(cItemEty.getCreatedStamp(), "yyyy-MM-dd HH:mm:ss"));
					mapChildren.put("updatedStamp", cItemEty.getUpdatedStamp()==null?"":DateTimeUtil.format(cItemEty.getUpdatedStamp(), "yyyy-MM-dd HH:mm:ss"));
					if(cItemEty.getChildren().size()>0){
						mapChildren.put("leaf", false);
					}else{
						mapChildren.put("leaf", true);
					}
					childrenInItem.add(mapChildren);
					fulfillTreeList(childrenInItem);	
				}
			}
		}
	}
	@Transactional
	public List<Map<String,Object>> getAllConfigTypeChildren(Integer nodeId){
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
		ConfigType self = sysConfigDao.findById(ConfigType.class, nodeId);
		Set<ConfigType> lstConfigType = self.getChildren();
		for(ConfigType configType:lstConfigType){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("id", configType.getId());
			row.put("text", configType.getConfigTypeName());
			row.put("configTypeId", configType.getId());
			row.put("configTypeName", configType.getConfigTypeName());
			row.put("configTypeDesc", configType.getConfigTypeDesc());
			if(configType.getChildren().size()>0)
				row.put("leaf", false);
			else
				row.put("leaf", true);
			List<Map<String,Object>> children = new ArrayList<Map<String,Object>>();
			children = getAllConfigTypeChildren(configType.getId());
			row.put("children",children);
			result.add(row);
		}
		return result;
	}
	@Transactional
	public String createSysConfig(String newConfigName,String newConfigDesc,Integer parentTypeId){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());
		String returnMessage = "";
		try{
		ConfigType parentType = sysConfigDao.findById(ConfigType.class, parentTypeId);
		ConfigType configType = new ConfigType();
		configType.setParentType(parentType);
		configType.setConfigTypeName(newConfigName);
		configType.setConfigTypeDesc(newConfigDesc);
		configType.setCreatedStamp(stamp);
		configType.setUpdatedStamp(stamp);
		sysConfigDao.persist(configType);
		}catch(Exception e){
			e.printStackTrace();
			returnMessage = e.getMessage();
		}
		return returnMessage;
	}
	@Transactional
	public ConfigType getConfigTypeById(Integer configTypeId){
		ConfigType configType = sysConfigDao.findById(ConfigType.class, configTypeId);
		return configType;
	}
	@Transactional
	public String  updateConfigType(Integer configTypeId,String configTypeName,String configTypeDesc,Integer parentTypeId){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());		
		String returnMessage = "";
		try{
			ConfigType parentConfig = sysConfigDao.findById(ConfigType.class, parentTypeId);
			ConfigType configType = sysConfigDao.findById(ConfigType.class, configTypeId);
			configType.setConfigTypeName(configTypeName);
			configType.setConfigTypeDesc(configTypeDesc);
			configType.setParentType(parentConfig);
			configType.setUpdatedStamp(stamp);
			sysConfigDao.merge(configType);
		}catch(Exception e){
			e.printStackTrace();
			returnMessage = e.getMessage();
		}
		return returnMessage;
	}
	@Transactional
	public long getConfigItemCount(Integer configTypeId,String query){
		Map<String,Object>	critals = new HashMap<String,Object>();
		critals.put("id",configTypeId);
		critals.put("configItemName", "%"+query.trim()+"%");
		critals.put("configItemDesc", "%"+query.trim()+"%");		
		String countjpql = "SELECT COUNT(CI) FROM "+ConfigType.class.getName()+" CT JOIN CT.configItems CI WHERE (CI.configItemName LIKE:configItemName OR CI.configItemDesc LIKE:configItemDesc) AND CT.id=:id";
		return sysConfigDao.findCount(countjpql, critals);
	}
	@Transactional
	public List<ConfigItem> getConfigItemList(Integer configTypeId,String query,  int start,int limit){
		List<ConfigItem> configItems = new ArrayList<ConfigItem>();
		String lstSql ="SELECT CI FROM "+ConfigType.class.getName()+" CT JOIN CT.configItems CI WHERE (CI.configItemName LIKE:configItemName OR CI.configItemDesc LIKE:configItemDesc) AND CT.id=:id";
		Map<String,Object>	critals = new HashMap<String,Object>();
		critals.put("id",configTypeId);
		critals.put("configItemName", "%"+query.trim()+"%");
		critals.put("configItemDesc", "%"+query.trim()+"%");
		configItems =  sysConfigDao.findTypedSubList(ConfigItem.class, lstSql, start, limit, critals);
		for(ConfigItem item:configItems){
			item.getConfigType().getId();
		}
		return configItems;
	}
	@Transactional
	public String createConfigItem(String configItemName,String configItemDesc,String value,String code,String enabled,String ext1,Integer configTypeId){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());
		String returnMessage = "";
		try{
		ConfigItem configItem = new ConfigItem();
		configItem.setConfigItemName(configItemName);
		configItem.setConfigItemDesc(configItemDesc);
		configItem.setValue(value);
		configItem.setCode(code);
		configItem.setEnabled(enabled);
		configItem.setExt1(ext1);
		configItem.setCreatedStamp(stamp);
		configItem.setUpdatedStamp(stamp);
		
		ConfigType configType = sysConfigDao.findById(ConfigType.class, configTypeId);
		configItem.setConfigType(configType);
		sysConfigDao.persist(configItem);
		}catch(Exception e){
			e.printStackTrace();
			returnMessage = e.getMessage();
		}
		return returnMessage;
	}
	@Transactional
	public String updateConfigItem(Integer id,String configItemName,String configItemDesc,String value,String code,String enabled,String ext1,Integer configTypeId){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());		
		String returnMessage="";
		try{
			ConfigItem configItem = sysConfigDao.findById(ConfigItem.class, id);
			configItem.setConfigItemName(configItemName);
			configItem.setConfigItemDesc(configItemDesc);
			configItem.setValue(value);
			configItem.setCode(code);
			configItem.setEnabled(enabled);
			configItem.setExt1(ext1);
			ConfigType configType = sysConfigDao.findById(ConfigType.class, configTypeId);
			configItem.setConfigType(configType);
			configItem.setUpdatedStamp(stamp);
			sysConfigDao.persist(configItem);		
		}catch(Exception e){
			returnMessage = e.getMessage();
		}
		return returnMessage;
	}
}
