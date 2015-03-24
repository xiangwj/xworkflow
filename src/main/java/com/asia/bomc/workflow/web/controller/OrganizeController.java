package com.asia.bomc.workflow.web.controller;

import javax.annotation.Resource;

import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asia.bomc.workflow.service.IOrganizeService;

@Controller()
@RequestMapping("/organize")
public class OrganizeController {

	@Resource(name = "organizeService")
	private IOrganizeService organizeService;

	@RequestMapping(value = "/getAllOrgJson.do", method = { RequestMethod.GET,RequestMethod.POST })
	@ResponseBody
	public String getChidrenGroupJson(@RequestParam(value="groupId",required=true)String groupId) {
		JSONArray children = new JSONArray();
		children = organizeService.getChildrenGroupJSON(groupId);
		System.out.println(children.toString());
		return children.toString();
	}

}
