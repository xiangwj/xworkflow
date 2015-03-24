<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/ext-3.4.0/resources/css/ext-all.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext-3.4.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext-3.4.0/ext-all.js"></script>
</head>
<body>
	<!--<c:if test="${errorMessage != null}">
		<p class="error">${errorMessage}</p>
	</c:if>-->
	<!--<sf:form method="post" modelAttribute="loginForm"
		commandName="loginForm"
		action="${pageContext.request.contextPath}/user/login.do">
		用户名：<sf:input path="userName" />
		<sf:errors path="userName" />
		<br />
		密码:<sf:password path="password" />
		<sf:errors path="password" />
		<br />
		<input type="submit" value="提交">
	</sf:form>-->
    <center>
        <div id="login-box" class="x-panel">
            <div class="x-panel-header">Sencha Subscription Support</div>
            <div class="x-panel-body" id="form-ct">
                <div id="info-box">
                    <div id="msg-ct" class="x-form-invalid-msg"></div>
                    <div id="instructions-ct">
                        <p>Please provide your email and password to sign in.</p>
                        <p>&nbsp;</p>
                        <p>If you experience trouble logging in email us at <a href="mailto:support@sencha.com">support@sencha.com</a>..</p>
                    </div>
                </div>

                <div id="left-box">
                    <img id="logo" src="assets/images/logo-sencha.png" />
                    <p><a href="https://www.sencha.com/store/" target="_blank">Get a Subscription</a></p>
                    <p><a href="activate.php">Activate Subscription</a></p>
                    <p><a href="assist.php" target="_blank">Forgot password?</a></p>
                </div>
                <div id="form-box" class="x-plain">
                    <div class="x-plain-body"></div>
                </div>
            </div>
        </div>
    </center>	
</body>
</html>