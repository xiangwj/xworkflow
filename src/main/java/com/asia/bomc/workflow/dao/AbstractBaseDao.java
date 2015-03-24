package com.asia.bomc.workflow.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.jpa.JpaTemplate;

public abstract class AbstractBaseDao implements IBaseDao {

	public EntityManager em;


	public void persist(Object entity) {
		em.persist(entity);
	}

	public <T> T merge(T entity) {
		return em.merge(entity);
	}

	public void remove(Object entity) {
		em.remove(entity);
	}

	public <T> T findById(Class<T> entityClass, Object primaryKey) {
		return em.find(entityClass, primaryKey);
	}

	public <T> List<T> findByJpql(Class<T> entityClass, String jpql,
			Map<String, Object> critals) {
		TypedQuery<T> query = em.createQuery(jpql, entityClass);
		if (critals != null) {
			for (String key : critals.keySet())
				query.setParameter(key, critals.get(key));
		}
		return query.getResultList();
	}


	public <T> List<T> findall(Class<T> entityClass) {
		TypedQuery<T> query = em.createQuery(
				"SELECT en FROM " + entityClass.getName()+" en", entityClass);
		return query.getResultList();
	}
	public List findSubList(String sql,int start,int limit){
		
		Query query =em.createQuery(sql);
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.getResultList();
	}
	
	public long findCount(String sql){
		Query query =em.createQuery(sql);
		return ((Long)query.getSingleResult()).longValue();
	}
	public long findCount(String sql,Map<String, Object> critals){
		Query query =em.createQuery(sql);
		if (critals != null) {
			for (String key : critals.keySet())
				query.setParameter(key, critals.get(key));
		}
		return ((Long)query.getSingleResult()).longValue();
	}	
	public<T> List findTypedSubList(Class<T> entityClass,String sql,int start,int limit){
		TypedQuery<T> query = em.createQuery(sql, entityClass);		
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.getResultList();
	}
	public<T> List findTypedSubList(Class<T> entityClass,String sql,int start,int limit,Map<String, Object> critals){
		TypedQuery<T> query = em.createQuery(sql, entityClass);	
		if (critals != null) {
			for (String key : critals.keySet())
				query.setParameter(key, critals.get(key));
		}		
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.getResultList();
	}
	public EntityManager getEntityManager() {
		return em;
	}

	@PersistenceContext(name = "entityManagerFactory")
	public void setEntityManager(EntityManager em) {
		JpaTemplate tp = new JpaTemplate();
		JdbcTemplate tp1 = new JdbcTemplate();
		this.em = em;
	}


}
