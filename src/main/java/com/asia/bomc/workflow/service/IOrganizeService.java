package com.asia.bomc.workflow.service;

import java.util.Collection;

import org.json.JSONArray;
import org.json.JSONObject;

import com.asia.bomc.workflow.entity.Group;

public interface IOrganizeService {

	public JSONArray  getChildrenGroupJSON(String groupId);
	
}
