package com.asia.bomc.workflow.service;

import java.util.List;
import java.util.Map;

import com.asia.bomc.workflow.entity.SecurityRole;
import com.asia.bomc.workflow.entity.UserLogin;

public interface IUserService {
	public List<UserLogin> findByUserName(String userName);

	public List<UserLogin> findUserList(String groupId, String userloginId,
			String enabled, int start, int limit);

	public long findUserListCount(String groupId, String userloginId,
			String enabled);

	public Map<String, Object> getUserListForRequest(String groupId,
			String userloginId, String enabled, String query, int start,
			int limit);
	public Map<String, Object> createUser(String userLoginId, String firstName,
			String mobileNo, String email, String validDate, String expireDate,
			String gender, String enabled, List<Integer> assignedGroup);	
	public Map<String, Object> updateUser(Integer partyId, String firstName,
			String mobileNo, String email, String validDate, String expireDate,
			String gender, String enabled, List<Integer> assignedGroup);
	public UserLogin getUserByParyId(Integer partyId);
	public Map<String, Object> getUserMapInfoByParyId(Integer partyId);	
	public Map<String, List<Map<String,Object>>> getUserKeyValueMapInfoByParyId(Integer partyId);
	public Map<String, Object> getUserRoleMapInfoByParyId(Integer partyId, int start, int limit);
	public Map<String,String> addUserRole(Integer userPartyId, String roleId);
	public Map<String,Object> getPermissionsByRoleId(String roleId,int start,int limit);
	public Map<String,Object> addSecurityRoleToUser(Integer userPartyId,List<String>roleIds);
	public Map<String,Object> delSecurityRoleToUser(Integer userPartyId,String roleId);
	public Map<String, Object> getUserPositonByParyId(Integer partyId,int start, int limit);
	public Map<String,Object> delOnePostionOfUser(Integer partyId,String positionId);
	public Map<String,Object> getPositionByQuery(String query,int start,int limit);
	public Map<String,Object> addPositionToUser(Integer userPartyId,List<String>positionIds);
	public List<SecurityRole> getRolesByUserParyId(Integer partyId);
}
