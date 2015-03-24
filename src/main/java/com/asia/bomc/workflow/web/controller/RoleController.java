package com.asia.bomc.workflow.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asia.bomc.workflow.entity.SecurityPermission;
import com.asia.bomc.workflow.entity.SecurityRole;
import com.asia.bomc.workflow.service.IRoleService;

@Controller()
@RequestMapping("/role")
public class RoleController {
	@Resource(name = "roleService")
	private IRoleService roleService;
	
	public IRoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}

	@RequestMapping(value = "/getAllRoleList.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public List<Map<String, Object>> getRoleList(
			@RequestParam(value = "query", required = false) String query,
			HttpServletRequest req) {

		List<Map<String,Object>> roleList =  new ArrayList<Map<String,Object>>();
			query = query==null?"":query.trim();
			List<SecurityRole> list = roleService.getRoleByQueryStr(query);
			for(SecurityRole role:list){
				Map<String,Object> rowData = new HashMap<String,Object>();
				rowData.put("type","role");
				rowData.put("xid",role.getSecurityRoleId());
				rowData.put("name",role.getSecurityRoleName()==null?"":role.getSecurityRoleName());
				rowData.put("description", role.getSecurityRoleDesc());
				rowData.put("iconCls", "task-folder");
				rowData.put("checked", false);
				Set<SecurityPermission> permissions = role.getPermissions();
				if(permissions.size()>0){
					List<Map<String,Object>> children = new ArrayList<Map<String,Object>>();
					rowData.put("expanded",true);
					for(SecurityPermission permission:permissions){
						Map<String,Object> child = new HashMap<String,Object>();
						child.put("type", "permission");
						child.put("xid",permission.getPermissionId());
						child.put("name",permission.getPermissionName()==null?"":permission.getPermissionName());
						child.put("description", permission.getDescription());
						child.put("leaf", true);
						rowData.put("iconCls", "'task");
						children.add(child);
					}
					rowData.put("children", children);
					rowData.put("expanded", true);
				}else{
					rowData.put("leaf",true);
				}
				roleList.add(rowData);
				
			}
		
		return roleList;
	}

}
