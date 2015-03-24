package com.asia.bomc.workflow.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asia.bomc.workflow.dao.UserDaoImp;
import com.asia.bomc.workflow.entity.Group;
import com.asia.bomc.workflow.entity.SecurityPermission;
import com.asia.bomc.workflow.entity.SecurityPosition;
import com.asia.bomc.workflow.entity.SecurityRole;
import com.asia.bomc.workflow.entity.UserLogin;
import com.asia.bomc.workflow.entity.UserLoginPositionAssoc;
import com.asia.bomc.workflow.entity.UserLoginPositionAssocPK;
import com.asia.bomc.workflow.entity.UserLoginRoleAssoc;
import com.asia.bomc.workflow.entity.UserLoginRoleAssocPK;
import com.asia.bomc.workflow.exception.UserUpdateException;
import com.asia.bomc.workflow.utils.Constants;
@Service(value = "userService")
public class UserServiceImpl implements IUserService {

	
	
	@Resource(name = "userDao")
	private UserDaoImp userDao;


	public List<UserLogin> findByUserName(String userName) {
		return userDao.findByUserName(userName);
	}

	public void setUserDao(UserDaoImp userDao) {
		this.userDao = userDao;
	}


	@Transactional
	
	public List<UserLogin> findUserList(String groupId, String userloginId,
			String enabled, int start, int limit) {
		String jpql = "SELECT ur from " + UserLogin.class.getName() + " ur ";
		if (groupId != null && !"".equals(groupId.trim())) {
			jpql = jpql + " LEFT JOIN  ur.groups gp ";
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE gp.partyId='" + groupId.trim() + "'";
			else
				jpql = jpql + " AND gp.partyId='" + groupId.trim() + "'";
		}
		if (userloginId != null && !"".equals(userloginId)) {
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE ur.userLoginId like'%"
						+ userloginId.trim() + "%'";
			else
				jpql = jpql + " AND ur.userLoginId like'%" + userloginId.trim()
						+ "%'";
		}
		if (enabled != null && !"".equals(enabled.trim())) {
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE ur.enabled='" + enabled.trim() + "'";
			else
				jpql = jpql + " AND ur.enabled='" + enabled.trim() + "'";
		}
		return userDao.findTypedSubList(UserLogin.class, jpql, start, limit);
	}

	
	public long findUserListCount(String groupId, String userloginId,
			String enabled) {
		String jpql = "SELECT COUNT(ur) from " + UserLogin.class.getName()
				+ " ur   ";
		if (groupId != null && !"".equals(groupId.trim())) {
			jpql = jpql + " LEFT JOIN  ur.groups gp ";
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE gp.partyId='" + groupId.trim() + "'";
			else
				jpql = jpql + " AND gp.partyId='" + groupId.trim() + "'";
		}
		if (userloginId != null && !"".equals(userloginId)) {
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE ur.userLoginId like'%"
						+ userloginId.trim() + "%'";
			else
				jpql = jpql + " AND ur.userLoginId like'%" + userloginId.trim()
						+ "%'";
		}
		if (enabled != null && !"".equals(enabled.trim())) {
			if (jpql.indexOf(" WHERE ") == -1)
				jpql = jpql + " WHERE ur.enabled='" + enabled.trim() + "'";
			else
				jpql = jpql + " AND ur.enabled='" + enabled.trim() + "'";
		}
		return userDao.findCount(jpql);
	}

	@Transactional
	public Map<String, Object> getUserListForRequest(String groupId,
			String userloginId, String enabled, String query, int start,
			int limit) {

		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> persons = new ArrayList<Map<String, Object>>();
		List<UserLogin> userLst = findUserList(groupId, userloginId, enabled,
				start, limit);
		long userCount = findUserListCount(groupId, userloginId, enabled);

		for (UserLogin user : userLst) {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Map<String, Object> row = new HashMap<String, Object>();
			row.put("partyId", user.getId());
			row.put("userLoginId", user.getUserLoginId());
			row.put("firstName", user.getFirstName());
			row.put("enabled", user.getEnabled());
			row.put("mobileNo", user.getMobileNo());
			row.put("email", user.getEmail());
			row.put("validDate",
					user.getValidDate() == null ? "" : df.format(user
							.getValidDate()));
			row.put("expireDate",
					user.getExpireDate() == null ? "" : df.format(user
							.getExpireDate()));
			row.put("createdStamp",
					user.getCreatedStamp() == null ? "" : df.format(user
							.getCreatedStamp()));
			row.put("updatedStamp",
					user.getUpdatedStamp() == null ? "" : df.format(user
							.getUpdatedStamp()));
			row.put("gender", user.getGender());
			String strGroups = "";
			Set<Group> groups = user.getGroups();
			List<Map<String, String>> grouprecords = new ArrayList<Map<String, String>>();
			for (Group group : groups) {
				strGroups = strGroups.equals("") ? group.getGroupName()
						: strGroups + "," + group.getGroupName();
				Map<String, String> grouprecord = new HashMap<String, String>();
				grouprecord.put("partyId", String.valueOf(group.getPartyId()));
				grouprecord.put("groupName", group.getGroupName());
				grouprecords.add(grouprecord);
			}

			row.put("grouprecords", grouprecords);
			row.put("groups", strGroups);
			persons.add(row);
		}

		result.put("totalCount", userCount);
		result.put("person", persons);
		return result;
	}

	@Transactional
	public Map<String, Object> createUser(String userLoginId, String firstName,
			String mobileNo, String email, String validDate, String expireDate,
			String gender, String enabled, List<Integer> assignedGroup) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "新建成功";
		String pk = "";
		try {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			long count = userDao.findCount("SELECT COUNT(ur) FROM "
					+ UserLogin.class.getName() + " ur WHERE ur.userLoginId='"
					+ userLoginId.trim() + "'");
			if (count > 0)
				throw new UserUpdateException("【用户名】重复");
			UserLogin userLogin = new UserLogin();
			userLogin.setUserLoginId(userLoginId.trim());
			userLogin.setFirstName(firstName.trim());
			userLogin.setGender(gender);
			userLogin.setEnabled(enabled.trim());
			userLogin.setMobileNo(mobileNo.trim());
			userLogin.setEmail(email.trim());
			userLogin.setValidDate(Timestamp.valueOf(validDate.trim()));
			userLogin.setExpireDate(Timestamp.valueOf(expireDate.trim()));
			userLogin
					.setCreatedStamp(new Timestamp(System.currentTimeMillis()));
			userLogin
					.setUpdatedStamp(new Timestamp(System.currentTimeMillis()));
			userDao.persist(userLogin);
			for (Integer groupId : assignedGroup) {
				Group group = userDao.em.getReference(Group.class, groupId);
				group.addUser(userLogin);
				userDao.persist(group);
			}
			pk = String.valueOf(userLogin.getId());
		} catch (Exception e) {
			e.printStackTrace();
			success = false;
			msg = "新建失败<br>失败信息为:" + e.getMessage();
		}
		result.put("success", success);
		result.put("msg", msg);
		result.put("pk", pk);
		return result;
	}

	@Transactional
	public Map<String, Object> updateUser(Integer partyId, String firstName,
			String mobileNo, String email, String validDate, String expireDate,
			String gender, String enabled, List<Integer> assignedGroup) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "更新成功";
		String pk = "";
		try {
			UserLogin userLogin = userDao.findById(UserLogin.class, partyId);
			userLogin.setFirstName(firstName);
			userLogin.setMobileNo(mobileNo);
			userLogin.setEmail(email);
			userLogin.setValidDate(Timestamp.valueOf(validDate));
			userLogin.setExpireDate(Timestamp.valueOf(expireDate));
			userLogin.setGender(gender);
			userLogin.setEnabled(enabled);
			Map critals = new HashMap();
			critals.put("partyId", userLogin.getId());
			List<Group> groups = userDao
					.findByJpql(
							Group.class,
							"SELECT gr FROM "
									+ Group.class.getName()
									+ " gr LEFT JOIN  gr.users ur WHERE ur.id=:partyId",
							critals);
			for (Group group : groups) {
				group.remove(userLogin);
				userDao.merge(group);
			}
			Map crital1 = new HashMap();
			crital1.put("partyIds", assignedGroup);
			List<Group> wtAssignedGroup = userDao.findByJpql(Group.class,
					"SELECT gr FROM " + Group.class.getName()
							+ " gr WHERE gr.partyId IN :partyIds", crital1);
			for (Group group : wtAssignedGroup) {
				group.addUser(userLogin);
				userDao.merge(group);
			}
			userDao.merge(userLogin);
			pk = String.valueOf(userLogin.getId());
		} catch (Exception e) {
			e.printStackTrace();
			success = false;
			msg = "更新失败\n失败信息为:" + e.getMessage();
		}
		result.put("success", success);
		result.put("msg", msg);
		result.put("pk", pk);
		return result;
	}

	@Transactional
	public UserLogin getUserByParyId(Integer partyId) {
		UserLogin userLogin = userDao.findById(UserLogin.class, partyId);
		Set<Group> groups = userLogin.getGroups();
		for (Group group : groups) {
			group.getGroupName();
		}
		return userLogin;
	}

	@Transactional
	public Map<String, Object> getUserMapInfoByParyId(Integer partyId) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, Object> result = new HashMap<String, Object>();

		UserLogin userLogin = userDao.findById(UserLogin.class, partyId);
		result.put("id", userLogin.getId());
		result.put("userLoginId", userLogin.getUserLoginId());
		result.put("firstName", userLogin.getFirstName());
		result.put("password", userLogin.getPassword());
		result.put("enabled", userLogin.getEnabled());
		result.put("mobileNo", userLogin.getMobileNo());
		result.put("email", userLogin.getEmail());
		result.put(
				"validDate",
				userLogin.getValidDate() == null ? "" : df.format(userLogin
						.getValidDate()));
		result.put(
				"expireDate",
				userLogin.getExpireDate() == null ? "" : df.format(userLogin
						.getExpireDate()));
		result.put("createdStamp", userLogin.getCreatedStamp() == null ? ""
				: df.format(userLogin.getCreatedStamp()));
		result.put("updatedStamp", userLogin.getUpdatedStamp() == null ? ""
				: df.format(userLogin.getUpdatedStamp()));
		result.put("gender", userLogin.getGender());
		String strGroups = "";
		Set<Group> groups = userLogin.getGroups();
		List<Map<String, String>> grouprecords = new ArrayList<Map<String, String>>();
		for (Group group : groups) {
			strGroups = strGroups.equals("") ? group.getGroupName() : strGroups
					+ "," + group.getGroupName();
			Map<String, String> grouprecord = new HashMap<String, String>();
			grouprecord.put("partyId", String.valueOf(group.getPartyId()));
			grouprecord.put("groupName", group.getGroupName());
			grouprecords.add(grouprecord);
		}
		result.put("grouprecords", grouprecords);

		return result;
	}

	@Transactional
	public Map<String, List<Map<String, Object>>> getUserKeyValueMapInfoByParyId(
			Integer partyId) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String, Object>>>();

		List<Map<String, Object>> records = new ArrayList<Map<String, Object>>();
		Map<String, Object> record = null;
		UserLogin userLogin = userDao.findById(UserLogin.class, partyId);

		record = new HashMap<String, Object>();
		record.put("key", "id");
		record.put("keydesc", "用户编号");
		record.put("value", userLogin.getId() == null ? "" : userLogin.getId());
		record.put("valuedesc",
				userLogin.getId() == null ? "" : userLogin.getId());
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "userLoginId");
		record.put("keydesc", "登陆名");
		record.put(
				"value",
				userLogin.getUserLoginId() == null ? "" : userLogin
						.getUserLoginId());
		record.put("valuedesc", userLogin.getUserLoginId() == null ? ""
				: userLogin.getUserLoginId());
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "firstName");
		record.put("keydesc", "姓名");
		record.put(
				"value",
				userLogin.getFirstName() == null ? "" : userLogin
						.getFirstName());
		record.put("valuedesc", userLogin.getFirstName() == null ? ""
				: userLogin.getFirstName());
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "enabled");
		record.put("keydesc", "是否有效");
		String enabled = userLogin.getEnabled() == null ? "" : userLogin
				.getEnabled();
		String enableddesc = enabled.equals("Y") ? "是" : "否";
		record.put("value", enabled);
		record.put("valuedesc", enableddesc);
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "mobileNo");
		record.put("keydesc", "手机号码");
		record.put("value", userLogin.getMobileNo());
		record.put("valuedesc", userLogin.getMobileNo());
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "email");
		record.put("keydesc", "email");
		record.put("value", userLogin.getEmail());
		record.put("valuedesc", userLogin.getEmail());
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "validDate");
		record.put("keydesc", "生效时间");
		record.put(
				"value",
				userLogin.getValidDate() == null ? "" : df.format(userLogin
						.getValidDate()));
		record.put(
				"valuedesc",
				userLogin.getValidDate() == null ? "" : df.format(userLogin
						.getValidDate()));
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "expireDate");
		record.put("keydesc", "失效时间");
		record.put(
				"value",
				userLogin.getValidDate() == null ? "" : df.format(userLogin
						.getValidDate()));
		record.put(
				"valuedesc",
				userLogin.getExpireDate() == null ? "" : df.format(userLogin
						.getExpireDate()));
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "createdStamp");
		record.put("keydesc", "创建时间");
		record.put(
				"value",
				userLogin.getCreatedStamp() == null ? "" : df.format(userLogin
						.getCreatedStamp()));
		record.put(
				"valuedesc",
				userLogin.getCreatedStamp() == null ? "" : df.format(userLogin
						.getCreatedStamp()));
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "updatedStamp");
		record.put("keydesc", "更新时间");
		record.put(
				"value",
				userLogin.getUpdatedStamp() == null ? "" : df.format(userLogin
						.getUpdatedStamp()));
		record.put(
				"valuedesc",
				userLogin.getUpdatedStamp() == null ? "" : df.format(userLogin
						.getUpdatedStamp()));
		records.add(record);

		record = new HashMap<String, Object>();
		record.put("key", "gender");
		record.put("keydesc", "性别");
		String gender = userLogin.getGender() == null ? "" : userLogin
				.getGender();
		String genderdesc = gender.equals("M") ? "男" : "女";
		record.put("value", gender);
		record.put("valuedesc", genderdesc);
		records.add(record);

		String strGroupNames = "";
		String strGroupIds = "";
		Set<Group> groups = userLogin.getGroups();
		for (Group group : groups) {
			strGroupIds = strGroupIds.equals("") ? String.valueOf(group
					.getPartyId()) : strGroupIds + ","
					+ String.valueOf(group.getPartyId());
			strGroupNames = strGroupNames.equals("") ? group.getGroupName()
					: strGroupNames + "," + group.getGroupName();
		}
		record = new HashMap<String, Object>();
		record.put("key", "gender");
		record.put("keydesc", "所属组织");
		record.put("value", strGroupIds);
		record.put("valuedesc", strGroupNames);
		records.add(record);

		result.put("values", records);
		return result;
	}

	@Transactional
	public Map<String, Object> getUserRoleMapInfoByParyId(
			Integer partyId, int start, int limit) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> records = new ArrayList<Map<String, Object>>();
		Map<String, Object> record = null;
		UserLogin userLogin = userDao.findById(UserLogin.class, partyId);

		Set<UserLoginRoleAssoc> userLoginRoleAssocs = userLogin
				.getUserLoginRoleAssocs();
		int pt=0;
		int se=0;
		for (UserLoginRoleAssoc userLoginRoleAssoc : userLoginRoleAssocs) {
			if(pt>=start && pt<start+limit){
			SecurityRole role = userLoginRoleAssoc.getRole();
			record = new HashMap<String, Object>();
			record.put("roleId", role.getSecurityRoleId());
			record.put("roleName", role.getSecurityRoleName()==null?"":role.getSecurityRoleName());
			record.put("roleDesc", role.getSecurityRoleDesc()==null?"":role.getSecurityRoleDesc());
			String createdStamp = role.getCreatedStamp() == null ? "" : df
					.format(role.getCreatedStamp());
			String updatedStamp = role.getUpdatedStamp() == null ? "" : df
					.format(role.getUpdatedStamp());
			record.put("createdStamp", createdStamp);
			record.put("updatedStamp", updatedStamp);
			records.add(record);
			}
			pt++;
		}
		result.put(Constants.TOTAL_COUNT, userLoginRoleAssocs.size());
		result.put(Constants.RECORDS, records);
		return result;
	}

	@Transactional
	public Map<String,String> addUserRole(Integer userPartyId, String roleId) {
		Map<String,String> result = new HashMap<String,String>();
		String returncode="0";
		String message = "";
		try{
			UserLoginRoleAssocPK pk = new UserLoginRoleAssocPK(userPartyId, roleId);
			UserLogin userLogin = userDao.findById(UserLogin.class, userPartyId);
			if(userLogin==null)
				throw new Exception("传入用户不存在");
			SecurityRole role = userDao.findById(SecurityRole.class, roleId);
			if(role==null)
				throw new Exception("传入权限不存在");
			UserLoginRoleAssoc assoc = userDao.findById(UserLoginRoleAssoc.class, pk);
			if(assoc!=null)
				throw new Exception("该用户权限映射已存在");
			UserLoginRoleAssoc userLoginRoleAssoc = new UserLoginRoleAssoc();
			userLoginRoleAssoc.setId(pk);
			userDao.persist(userLoginRoleAssoc);
		}catch(Exception e){
			returncode="1";
			message = e.getMessage();
		}
		result.put(Constants.RETURN_CODE, returncode);
		result.put(Constants.RETURN_MSG, message);
		return result;
	}
	@Transactional
	public Map<String,Object> getPermissionsByRoleId(String roleId,int start,int limit){
		Map<String,Object> result = new HashMap<String,Object>();
		List<SecurityPermission> permissions = new ArrayList<SecurityPermission>();
		long count = userDao.findCount("SELECT COUNT(pr) from "+SecurityPermission.class.getName()+" pr LEFT JOIN  pr.roles rl where rl.securityRoleId='"+roleId+"'");
		permissions = userDao.findSubList("SELECT pr from "+SecurityPermission.class.getName()+" pr LEFT JOIN  pr.roles rl where rl.securityRoleId='"+roleId+"'", start, limit);
		result.put(Constants.TOTAL_COUNT, count);
		result.put(Constants.RECORDS, permissions);
		return result;
	}
	@Transactional
	public Map<String,Object> addSecurityRoleToUser(Integer userPartyId,List<String>roleIds){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());
		Map<String,Object> result = new HashMap<String,Object>();
		UserLogin userLogin = userDao.findById(UserLogin.class, userPartyId);
		Set<UserLoginRoleAssoc> userRoleAssocs = userLogin.getUserLoginRoleAssocs();
		String returncode="0";
		String message="";
		try{
			for(String roleId:roleIds){
				boolean contains = false;
				for(UserLoginRoleAssoc assoc:userRoleAssocs){
					if(assoc.getId().getRoleId().equals(roleId)){
						contains = true;
						break;
					}	
				}
				if(contains==false){
					UserLoginRoleAssocPK pk = new UserLoginRoleAssocPK();
					pk.setRoleId(roleId);
					pk.setUserPartyId(userPartyId);
					UserLoginRoleAssoc newassoc = new UserLoginRoleAssoc();
					newassoc.setId(pk);
					newassoc.setCreatedStamp(stamp);
					newassoc.setUpdatedStamp(stamp);
					userDao.persist(newassoc);
					userRoleAssocs.add(newassoc);
				}
			}
		}catch(Exception e){
			returncode ="1";
			message = e.getMessage();
			e.printStackTrace();
		}
		result.put(Constants.RETURN_CODE, returncode);
		result.put(Constants.RETURN_MSG, message);
		return result;
	}
	@Transactional
	public Map<String,Object> delSecurityRoleToUser(Integer userPartyId,String roleId){
		Map<String,Object> result = new HashMap<String,Object>();
		UserLogin userLogin = userDao.findById(UserLogin.class, userPartyId);
		Set<UserLoginRoleAssoc> userRoleAssocs = userLogin.getUserLoginRoleAssocs();
		String returncode="0";
		String message="";
		try{
			for(UserLoginRoleAssoc assoc:userRoleAssocs){
				if(assoc.getId().getRoleId().equals(roleId)){
					userDao.remove(assoc);
					userRoleAssocs.remove(userDao);
					break;
				}	
			}
		}catch(Exception e){
			returncode ="1";
			message = e.getMessage();
			e.printStackTrace();
		}
		result.put(Constants.RETURN_CODE, returncode);
		result.put(Constants.RETURN_MSG, message);
		return result;
	}
	@Transactional
	public Map<String, Object> getUserPositonByParyId(Integer partyId,int start, int limit){
		
		long count=0;
		String selJpql="SELECT UP FROM "+UserLoginPositionAssoc.class.getName()+" UP WHERE UP.id.userPartyId="+partyId+" ORDER BY UP.updatedStamp DESC";
		String couJpql="SELECT COUNT(*) FROM "+UserLoginPositionAssoc.class.getName()+" UP WHERE UP.id.userPartyId="+partyId;
		
		Map<String, Object> result = new HashMap<String, Object>();		
		List<UserLoginPositionAssoc> lst = new ArrayList<UserLoginPositionAssoc>();
		try{
			count = userDao.findCount(couJpql);
			lst = userDao.findTypedSubList(UserLoginPositionAssoc.class,selJpql, start, limit);
			for(UserLoginPositionAssoc assoc:lst)
				assoc.getSecurityPosition().getPositionId();
		}catch(Exception e){
			e.printStackTrace();
			
		}
	    result.put(Constants.TOTAL_COUNT,count);
	    result.put(Constants.RECORDS, lst);
		return result;
	}
	@Transactional
	public Map<String,Object> delOnePostionOfUser(Integer partyId,String positionId){
		String returncode="0";
		String message="";
		Map<String,Object> result = new HashMap<String,Object>();
		UserLoginPositionAssocPK pk = new UserLoginPositionAssocPK(partyId,positionId);
		try{
			userDao.remove(userDao.em.getReference(UserLoginPositionAssoc.class, pk));
		}catch(Exception e){
			returncode="1";
			message = e.getMessage();
			e.printStackTrace();
		}
		result.put(Constants.RETURN_CODE, returncode);
		result.put(Constants.RETURN_MSG,message);
		return result;
	}
	@Transactional
	public Map<String,Object> getPositionByQuery(String query,int start,int limit){
		long count = 0;
		List<SecurityPosition> lst = new ArrayList<SecurityPosition>();

		Map<String,Object> result = new HashMap<String,Object>();
		
		String countjpql ="SELECT COUNT(PN) FROM "+SecurityPosition.class.getName()+" PN WHERE PN.positionId LIKE:query OR PN.positionName LIKE:query OR  PN.positionDesc LIKE:query";
		String selecjpql ="SELECT PN FROM "+SecurityPosition.class.getName()+" PN WHERE PN.positionId LIKE:query OR PN.positionName LIKE:query OR  PN.positionDesc LIKE:query ORDER BY PN.updatedStamp DESC";
		
		try{
			Map<String,Object> critals = new HashMap<String,Object>();
			critals.put("query", "%"+query+"%");
			count = userDao.findCount(countjpql, critals);
			lst = userDao.findTypedSubList(SecurityPosition.class, selecjpql, start, limit, critals);
		}catch(Exception e){
			e.printStackTrace();
		}
		result.put(Constants.TOTAL_COUNT, count);
		result.put(Constants.RECORDS,lst);
		return result;
	}
	@Transactional
	public Map<String,Object> addPositionToUser(Integer userPartyId,List<String>positionIds){
		Calendar cal = Calendar.getInstance();
		Timestamp stamp = new Timestamp(cal.getTimeInMillis());
		Map<String,Object> result = new HashMap<String,Object>();
		UserLogin userLogin = userDao.findById(UserLogin.class, userPartyId);
		Set<UserLoginPositionAssoc> assocs = userLogin.getUserLoginPositionAssoc();
		String returncode="0";
		String message="";
		try{
			for(String positionId:positionIds){
				boolean contains = false;
				for(UserLoginPositionAssoc assoc:assocs){
					if(assoc.getId().getPositionId().equals(positionId)){
						contains = true;
						break;
					}	
				}
				if(contains==false){
					UserLoginPositionAssocPK pk = new UserLoginPositionAssocPK();
					pk.setPositionId(positionId);
					pk.setUserPartyId(userPartyId);
					UserLoginPositionAssoc newassoc = new UserLoginPositionAssoc();
					newassoc.setId(pk);
					newassoc.setCreatedStamp(stamp);
					newassoc.setUpdatedStamp(stamp);
					userDao.persist(newassoc);
					assocs.add(newassoc);
				}
			}
		}catch(Exception e){
			returncode ="1";
			message = e.getMessage();
			e.printStackTrace();
		}
		result.put(Constants.RETURN_CODE, returncode);
		result.put(Constants.RETURN_MSG, message);
		return result;
	}	
	@Transactional

	public List<SecurityRole> getRolesByUserParyId(Integer partyId) {

		List <SecurityRole>roles = new ArrayList<SecurityRole>();

		UserLogin userLogin = userDao.findById(UserLogin.class, partyId);
		Set<UserLoginRoleAssoc> userRoleAssocs=userLogin.getUserLoginRoleAssocs();
		for(UserLoginRoleAssoc userRoleAssoc:userRoleAssocs)
		{
			roles.add(userRoleAssoc.getRole());
			
		}

		return roles;
	}
}
