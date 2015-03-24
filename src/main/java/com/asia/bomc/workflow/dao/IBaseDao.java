package com.asia.bomc.workflow.dao;

import java.util.List;
import java.util.Map;

public interface IBaseDao {
	public void persist(Object entity);

	public <T> T merge(T entity);

	public void remove(Object entity);

	public <T> T findById(Class<T> entityClass, Object primaryKey);

	public <T> List<T> findByJpql(Class<T> entityClass, String jpql,
			Map<String, Object> critals);
	public <T> List<T> findall(Class<T> entityClass); 
	public List findSubList(String sql,int start,int limit);
	public long findCount(String sql);
	
}
