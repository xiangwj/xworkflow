package com.asia.bomc.workflow.web.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



//import org.apache.commons.httpclient.Header;
//import org.apache.commons.httpclient.HttpClient;
//import org.apache.commons.httpclient.HttpMethod;
//import org.apache.commons.httpclient.HttpURL;
//import org.apache.commons.httpclient.methods.GetMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asia.bomc.workflow.entity.SecurityPermission;
import com.asia.bomc.workflow.entity.SecurityPosition;
import com.asia.bomc.workflow.entity.UserLoginPositionAssoc;
import com.asia.bomc.workflow.service.IOrganizeService;
import com.asia.bomc.workflow.service.ITestService;
import com.asia.bomc.workflow.service.IUserService;
import com.asia.bomc.workflow.utils.Constants;
import com.asia.bomc.workflow.utils.DateTimeUtil;
import com.asia.bomc.workflow.utils.SpringContextUtil;

@Controller()
@RequestMapping("/user")
public class UserController {

	@Resource(name = "organizeService")
	private IOrganizeService organizeService;
	@Resource(name = "userService")
	private IUserService userService;

	@RequestMapping(value = "/getUserList.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getUserList(
			@RequestParam(value = "groupId", required = false) String groupId,
			@RequestParam(value = "userloginId", required = false) String userloginId,
			@RequestParam(value = "enabled", required = false) String enabled,
			@RequestParam(value = "query", required = false) String query,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit) {
		groupId = groupId == null ? "" : groupId.trim();
		userloginId = userloginId == null ? "" : userloginId.trim();
		enabled = enabled == null ? "" : enabled.trim();
		query = query == null ? "" : query.trim();
		try{
		ITestService test =(ITestService) SpringContextUtil.getBean("TestService");
		test.test();
		System.out.println("hahaha");
		}catch(Exception e){
			e.printStackTrace();
		}
		return userService.getUserListForRequest(groupId, userloginId, enabled,
				query, start, limit);
	}

	@RequestMapping(value = "/updateUser.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> updateUser(
			@RequestParam(value = "editmode", required = false) String editmode,
			@RequestParam(value = "partyId", required = false) Integer partyId,
			@RequestParam(value = "userLoginId", required = false) String userLoginId,
			@RequestParam(value = "firstName", required = false) String firstName,
			@RequestParam(value = "mobileNo", required = false) String mobileNo,
			@RequestParam(value = "email", required = false) String email,
			@RequestParam(value = "validDate", required = false) String validDate,
			@RequestParam(value = "expireDate", required = false) String expireDate,
			@RequestParam(value = "gender", required = false) String gender,
			@RequestParam(value = "enabled", required = false) String enabled,
			@RequestParam(value = "assignedGroup", required = false) List<Integer> assignedGroup) {
		Map<String, Object> result = new HashMap<String, Object>();

		if ("newrecord".equals(editmode.trim()) || "".equals(editmode.trim()))
			result = userService.createUser(userLoginId, firstName, mobileNo,
					email, validDate, expireDate, gender, enabled,
					assignedGroup);
		if ("editrecord".equals(editmode.trim())) {
			result = userService.updateUser(partyId, firstName, mobileNo,
					email, validDate, expireDate, gender, enabled,
					assignedGroup);
		}
		return result;
	}

	@RequestMapping(value = "/getUserByParyId.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getUserByParyId(
			@RequestParam(value = "partyId", required = false) Integer partyId) {
		Map<String, Object> result = userService
				.getUserMapInfoByParyId(partyId);

		return result;
	}

	@RequestMapping(value = "/getUserKeyValueMapInfoByParyId.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, List<Map<String, Object>>> getUserKeyValueMapInfoByParyId(
			@RequestParam(value = "partyId", required = false) Integer partyId) {
		Map<String, List<Map<String, Object>>> result = userService
				.getUserKeyValueMapInfoByParyId(partyId);
		return result;
	}

	@RequestMapping(value = "/addUserRole.do", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public Map<String, String> addUserRole(
			@RequestParam(value = "userPartyId", required = false) Integer userPartyId,
			@RequestParam(value = "roleId", required = false) String roleId) {
		userService.addUserRole(userPartyId, roleId);
		Map<String, String> result = new HashMap<String, String>();
		result.put("returncode", "0");
		return result;
	}

	@RequestMapping(value = "/getUserRoleList.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getUserRoleList(
			@RequestParam(value = "partyId", required = false) Integer partyId,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit) {
		Map<String, Object> result = userService.getUserRoleMapInfoByParyId(
				partyId, start, limit);
		return result;
	}

	@RequestMapping(value = "/getSecurityPermissions.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getSecurityPermissions(
			@RequestParam(value = "roleId", required = false) String roleId,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit) {
		String strFromt = "yyyy-MM-dd HH:mm:ss";
		Map<String, Object> result0 = userService.getPermissionsByRoleId(
				roleId, start, limit);
		Map<String, Object> result = new HashMap<String, Object>();
		List<SecurityPermission> permissions = (List<SecurityPermission>) result0
				.get(Constants.RECORDS);
		List<Map> records = new ArrayList<Map>();
		for (SecurityPermission permission : permissions) {
			Map record = new HashMap();
			record.put("permissionId", permission.getPermissionId());
			record.put("description", permission.getDescription());
			record.put("createdStamp",
					DateTimeUtil.format(permission.getCreatedStamp(), strFromt));
			record.put("updatedStamp",
					DateTimeUtil.format(permission.getUpdatedStamp(), strFromt));
			records.add(record);
		}
		result.put(Constants.RECORDS, records);
		result.put(Constants.TOTAL_COUNT, Long.parseLong(String.valueOf(result0
				.get(Constants.TOTAL_COUNT))));
		return result;
	}
	@RequestMapping(value = "/addSecurityRoleToUser.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> addSecurityRoleToUser(
			@RequestParam(value = "userPartyId", required = false) Integer userPartyId,
			@RequestParam(value = "roleIds", required = false) List<String> roleIds
			){
		Map<String, Object> result = new HashMap<String, Object>();
		result = userService.addSecurityRoleToUser(userPartyId, roleIds);
		return result;
		
	}
	@RequestMapping(value = "/delSecurityRoleToUser.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> addSecurityRoleToUser(
			@RequestParam(value = "userPartyId", required = false) Integer userPartyId,
			@RequestParam(value = "roleId", required = false) String roleId
			){
		Map<String, Object> result = new HashMap<String, Object>();
		result = userService.delSecurityRoleToUser(userPartyId, roleId);
		return result;
		
	}
	@RequestMapping(value = "/getUserPositonByParyId.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getUserPositonByParyId(
			@RequestParam(value = "partyId", required = false) Integer partyId,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit
			){
		Map<String, Object> result0 = new HashMap<String, Object>();
		result0 = userService.getUserPositonByParyId(partyId, start, limit);
		List<Map<String,Object>> records = new ArrayList<Map<String,Object>>();
		List<UserLoginPositionAssoc> positions = (List<UserLoginPositionAssoc>)result0.get(Constants.RECORDS);
		for(UserLoginPositionAssoc position:positions){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("positionId", position.getSecurityPosition().getPositionId());
			row.put("positionName", position.getSecurityPosition().getPositionName());
			row.put("positionDesc", position.getSecurityPosition().getPositionDesc());
			row.put("createdStamp", DateTimeUtil.format(position.getSecurityPosition().getCreatedStamp(),"yyyy-MM-dd HH:mm:ss"));
			row.put("updatedStamp", DateTimeUtil.format(position.getSecurityPosition().getUpdatedStamp(),"yyyy-MM-dd HH:mm:ss"));
			records.add(row);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(Constants.TOTAL_COUNT, result0.get(Constants.TOTAL_COUNT));
		result.put(Constants.RECORDS,records);
		return result;
		
	}	
	@RequestMapping(value = "/delOnePostionOfUser.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> delOnePostionOfUser(
			@RequestParam(value = "partyId", required = false) Integer partyId,
			@RequestParam(value = "positionId", required = false) String positionId
			){
		Map<String, Object> result;
		result = userService.delOnePostionOfUser(partyId, positionId);
		return result;
	}
	
	@RequestMapping(value = "/getPositionByQuery.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> getPositionByQuery(
			@RequestParam(value = "query", required = false) String query,
			@RequestParam(value = "start", required = false) int start,
			@RequestParam(value = "limit", required = false) int limit
			){
		Map<String, Object> result0 = new HashMap<String, Object>();
		result0 = userService.getPositionByQuery(query, start, limit);
		List<Map<String,Object>> records = new ArrayList<Map<String,Object>>();
		List<SecurityPosition> positions = (List<SecurityPosition>)result0.get(Constants.RECORDS);
		for(SecurityPosition position:positions){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("positionId", position.getPositionId());
			row.put("positionName", position.getPositionName());
			row.put("positionDesc", position.getPositionDesc());
			row.put("createdStamp", DateTimeUtil.format(position.getCreatedStamp(),"yyyy-MM-dd HH:mm:ss"));
			row.put("updatedStamp", DateTimeUtil.format(position.getUpdatedStamp(),"yyyy-MM-dd HH:mm:ss"));
			records.add(row);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(Constants.TOTAL_COUNT, result0.get(Constants.TOTAL_COUNT));
		result.put(Constants.RECORDS,records);
		return result;
	}
	@RequestMapping(value = "/addPositionToUser.do", method = {
			RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> addPositionToUser(
			@RequestParam(value = "userPartyId", required = false) Integer userPartyId,
			@RequestParam(value = "positionIds", required = false) List<String> positionIds
			){
		Map<String, Object> result = new HashMap<String, Object>();
		result = userService.addPositionToUser(userPartyId, positionIds);
		return result;
		
	}
	@RequestMapping(value = "/getfile.do", method = {
			RequestMethod.GET, RequestMethod.POST })	
	public void getfile(HttpServletRequest req,HttpServletResponse response){
		/*OutputStream out = null;
		try{
		out = response.getOutputStream();
		HttpClient client = new DefaultHttpClient();
		HttpUriRequest urirequest = new HttpGet("http://workflow.bomc.sh.cmcc:48080/servicecenter/control/ViewSimpleContent?contentId=183634");

		HttpResponse response0 = client.execute(urirequest);
		HttpEntity entity = response0.getEntity();
        for(Iterator it = response0.headerIterator();it.hasNext();){
        	String head =it.next().toString();
        	response.setHeader(head.split(":")[0], head.split(":")[1]);
        }
        streamContent(out, entity.getContent(), 1024);
        out.flush();
        out.close();
        } catch (IOException e) {
            e.printStackTrace();
   
        }finally{
        	try{out.close();}catch(Exception e){e.printStackTrace();}
        }*/
		/*OutputStream out = null;
		try{
			out = response.getOutputStream();
			HttpMethod method= new GetMethod();
			method.setURI(new HttpURL("http://10.10.141.201:58080/servicesupport/control/ViewSimpleContent?contentId=58324"));
			HttpClient client  = new  HttpClient();
			client.executeMethod(method);
			Header[] heads = method.getResponseHeaders();
			for(Header head:heads){
				String headstr = head.toString();
				headstr= headstr.replaceAll("%20"," ");
				response.setHeader(headstr.split(":")[0], headstr.split(":")[1]);
			}
	        streamContent(out,method.getResponseBodyAsStream(), 1024);
	        out.flush();
	        out.close();		
		}catch(Exception e){
			try{out.close();}catch(Exception e1){e1.printStackTrace();}
		}
	
		*/
	}
    public  void streamContent(OutputStream out, InputStream in, int length) throws IOException {
        int bufferSize = 512; 
        if (out == null) {
            throw new IOException("Attempt to write to null output stream");
        }
        if (in == null) {
            throw new IOException("Attempt to read from null input stream");
        }
        if (length == 0) {
            throw new IOException("Attempt to write 0 bytes of content to output stream");
        }
        BufferedOutputStream bos = new BufferedOutputStream(out, bufferSize);
        BufferedInputStream bis = new BufferedInputStream(in, bufferSize);
        byte[] buffer = new byte[length];
        int read = 0;
        try {
            while ((read = bis.read(buffer, 0, buffer.length)) != -1) {
                bos.write(buffer, 0, read);
            }
        } catch (IOException e) {

            bis.close();
            bos.close();
            throw e;
        } finally {
            if (bis != null) {
                bis.close();
            }
            if (bos != null) {
                bos.flush();
                bos.close();
            }
        }
    }	
}