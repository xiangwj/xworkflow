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
<!-- <base href="<%=basePath%>">-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/css/images/sync.ico">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/main.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.3.5/jquery.min.js"></script>
<style type="text/css">
body {
	line-height: 22px;
	font-family: "幼圆";
	font-size: 14px;
	text-align: center;
}

.leftimgdiv {
	margin-top: 5px;
	margin-left: 5px;
	height: auto;
	float: left;
}

.middiv {
	margin-top: 5px;
	margin-left: 5px;
	margin-right: auto;
	margin-bottom: 5px;
	height: 300px;
	width: 400px;
	float: left;
}

.leftdiv {
	margin-top: 5px;
	margin-left: 1px;
	height: auto;
	float: left;
	border: 1px solid #cccccc;
	padding: 5px;
}

.rightdiv {
	margin-top: 5px;
	margin-right: 2px;
	margin-bottom: 5px;
	margin-left: 5px;
	height: 507px;
	width: 314px;
	float: right;
	border: 1px solid #cccccc;
	padding: 0px;
}

.bottomdiv {
	margin-top: 5px;
	margin-bottom: 5px;
	margin-left: atuo;
	margin-right: atuo;
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
	padding-left: 5px;
	width: 940px;
	height: auto;
	border: 1px solid #cccccc;
	text-align: center;
}

.centerdiv {
	margin-top: 3px;
	margin-right: 3px;
	margin-bottom: 3px;
	margin-left: 3px;
	height: 400px;
	border: 1px solid #cccccc;
}

.centerdiv th {
	width: 50px;
	color: #666;
	font-weight: normal;
	font-size: 13px;
}

.logintitle {
	width: 415px;
	height: 25px;
	text-align: left;
	margin-top: 8px;
}

.logintitlespan {
	width: 200px;
	filter: alpha(opacity =  100);
	font-family: "幼圆";
	font-size: 13px;
	text-decoration: none;
	font-weight: bold;
}

.IChk {
	height: 26px;
	color: #555;
}
</style>
</head>
<body>
	<div class="bodydiv">
		<div class="pagebannerdiv" id="pagebannerdiv">
			<img
				src="${pageContext.request.contextPath}/css/images/login_cont.jpg"
				style="width: 932px; height: 200px; padding: 0px;" />
		</div>

		<div class="centerdiv">
			<div class="leftimgdiv"></div>
			<div class="logininputdiv">
				<div class="logintitle">
					<span class="logintitlespan">&nbsp;&nbsp;系统登录</span> <span
						class="logintitlespan"></span>
				</div>
				<sf:form method="post" modelAttribute="loginForm"
					commandName="loginForm"
					action="${pageContext.request.contextPath}/user/login.do">
					<table>
						<tr>
							<td colspan="3" class="IChk"><span class="errorMsg"
								style="display: none;">这里是输入错误信息的地方</span></td>
						</tr>
						<tr height="35px">
							<th>用户名</th>
							<td class="w255px"><sf:input path="userName" cssClass="textinput" maxlength="20" tabindex="1"/></td>
							<td></td>
						</tr>
						<tr>
						<th></th>
						<td><sf:errors path="userName"/></td>
						<td></td>
						</tr>
						<tr height="35px">
							<th>密&nbsp;&nbsp;码</th>
							<td><sf:password path="password" maxlength="32"
								tabindex="3" cssClass="textinput"/></td>
							<td><a href="#" class="aline" id="toResetPasswordPage">修改密码</a>
							</td>
						</tr>
						<tr>
						<th></th>
						<td><sf:errors path="password"/></td>
						<td></td>
						</tr>
						
						<tr height="35px">
							<th>验证码1</th>
							<td><sf:input path="verifyCode" maxlength="4" tabindex="4"/></td>
							<td></td>
						</tr>
						<tr>
						<th></th>
						<td><sf:errors path="verifyCode" /></td>
						<td></td>
						</tr>						
						<tr height="35px">
							<th></th>
							<td style="padding: 0px; text-align: left;" colspan="2"><img
								id="loginVerifyCodeImg"
								src="${pageContext.request.contextPath}/css/images/verifyCode.jpg" />&nbsp;&nbsp;<a
								id="refreshVerifyCode" href="#" class="aline">看不清楚，换一个？</a></td>
						</tr>

						<tr height="70px">
							<th></th>
							<td nowrap="nowrap" style="padding: 0px; text-align: left;"
								colspan="2"><input name="" id="loginBtn" type="submit"
								value="" class="IbtnSub"
								onmouseover="this.className = 'IbtnSub_over'"
								onmouseout="this.className = 'IbtnSub'" tabindex="5" /> <a
								href="#" class="aline" id="toResetPasswordPage"></a></td>

						</tr>
					</table>
					<p>
						<input type="hidden" name="actionType" value="submit" />

					</p>
				</sf:form>
			</div>
		</div>
	</div>

</body>
</html>