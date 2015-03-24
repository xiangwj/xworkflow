<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<body>
	<form action="${pageContext.request.contextPath}/test/login.do">
		用户名<input type="text"  name="username"/><br>
		密码<input type="text"  name="password"/><br>
		<input type="submit" value="提交">
	</form>
	<img src="${pageContext.request.contextPath}/pages/test/00.jpg" alt="" />
</body>
</html>