package com.asia.bomc.workflow.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.asia.bomc.workflow.entity.UserLogin;
@Component(value="userDao")
public class UserDaoImp extends AbstractBaseDao {

	/*public UserLogin findByUserName(String userName){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("userLoginId", userName);
		return findById(UserLogin.class, userName);
		
	}*/
	public List<UserLogin> findByProince(String privincename){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("userLoginId", "");
		
		List<UserLogin> lst = findByJpql(UserLogin.class, "", params);
		return lst;
	}
	public List<UserLogin> findByUserName(String userName){
		Map param = new HashMap();
		param.put("userLoginId", userName.trim());
		List<UserLogin> lst =findByJpql(UserLogin.class,"SELECT UR FROM "+UserLogin.class.getName()+" UR WHERE UR.userLoginId=:userLoginId",param);
		return lst;
	}
}
