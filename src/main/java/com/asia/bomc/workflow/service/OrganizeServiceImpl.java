package com.asia.bomc.workflow.service;

import java.util.Collection;

import javax.annotation.Resource;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asia.bomc.workflow.dao.OrginizeDaoImp;
import com.asia.bomc.workflow.entity.Group;

@Service(value = "organizeService")
public class OrganizeServiceImpl implements IOrganizeService {
	@Resource(name = "orginizeDao")
	private OrginizeDaoImp orginizeDao;

	public OrginizeDaoImp getOrginizeDao() {
		return orginizeDao;
	}

	public void setOrginizeDao(OrginizeDaoImp orginizeDao) {
		this.orginizeDao = orginizeDao;
	}

	
	@Transactional
	public JSONArray getChildrenGroupJSON(String groupId) {
		Group group = orginizeDao.findById(Group.class, new Integer(groupId));
		JSONArray jChildren = new JSONArray();
		if (group.getChildren().size() > 0) {
			Collection<Group> childen = group.getChildren();
			for (Group child : childen) {
				JSONObject jChild = new JSONObject();
				jChild.put("id", child.getPartyId());
				jChild.put("text", child.getGroupName());
				if (child.getChildren().size() > 0)
					jChild.put("leaf", false);
				else
					jChild.put("leaf", true);
				jChildren.put(jChild);
			}
		}
		return jChildren;
	}

}
