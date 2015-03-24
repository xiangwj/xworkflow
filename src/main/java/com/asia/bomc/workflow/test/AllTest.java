package com.asia.bomc.workflow.test;

import java.io.StringWriter;
import java.util.List;

import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.util.StringUtils;
import org.junit.Test;

public class AllTest {

	@Test
	public void testSHA(){
        try {
        	String str="abcd1234";
        	System.out.println(new Sha256Hash(str).toBase64());


            
        } catch (Exception e) {
           e.printStackTrace();
        }	
	}
	@Test
	public void testVelocity(){
	       VelocityEngine engine = new VelocityEngine();   
	        engine.init();   
	        VelocityContext ctx = new VelocityContext();   
	        ctx.put("stringUtils", new StringUtils());   
	        ctx.put("comments", "this is a \n newline test");   
	        ctx.put("newline", "this");   
	        ctx.put("break", "that");   
	        //String template = "#set($comments = $stringUtils.replace($comments,$newline,$break))";   
	        String template = "#set($comments = $stringUtils.replace($comments,\"that\",\"this\"))";
	        template += "$comments";   
	        StringWriter writer = new StringWriter();   
	        engine.evaluate(ctx, writer, "", template);   
	        System.out.println(writer.toString());   	            		
	}
	@Test
	public void test(){
		try{
		String currentUser="dinglei";
		String sql= " SELECT *"
				   +" FROM (SELECT *"
				   +" FROM ITSM_CFG_ORGANIZATION"
				   +" CONNECT BY PRIOR ORG_PARENT_ID = ORG_ID"
				   +" START WITH ORG_ID = (SELECT ORG_ID"
				   +" FROM ITSM_CFG_ORG_USER"
				   +" WHERE PER_ID = '"+currentUser+"'"
				   +" AND ROWNUM = 1)"
				   +" ) A"
				   +" WHERE A.ORG_ID IN ("
				   +" SELECT ORG_ID"
				   +" FROM ITSM_CFG_ORGANIZATION"
				   +" WHERE ORG_PARENT_ID = '10032')";
		List<List<Object>> groups = getSelectResultBySql(sql);
		List<Object> groupR = groups.get(0);
		System.out.println(String.valueOf(groupR.get(0)));
		System.out.println(sql);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	public List<List<Object>> getSelectResultBySql(String selectSql){
		return null;
	}
	@Test
	public void teststr(){
		String s="CreateSrvReq";
		System.out.println(s.toLowerCase().indexOf("create1"));
	}
}
