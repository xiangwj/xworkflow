<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>用户管理</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/ext-all.css" />
<style type="text/css">
html,body {
	font: normal 12px verdana;
	margin: 0;
	padding: 0;
	border: 0 none;
	overflow: hidden;
	height: 100%;
}

.add-btn {
	background-image:
		url(${pageContext.request.contextPath}/css/images/add.gif) !important;
}

.cls-btn {
	background-image:
		url(${pageContext.request.contextPath}/css/images/fieldclean.gif)
		!important;
}

.save-btn {
	background-image:
		url(${pageContext.request.contextPath}/css/images/save.gif) !important;
}

.del-btn {
	background-image:
		url(${pageContext.request.contextPath}/css/images/delete.gif)
		!important;
}

.enabled_row {
	color: green;
}

.disabled_row {
	color: red;
}
</style>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/ext-3.4.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/ext-3.4.0/ext-all.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/ext-3.4.0/ux/MySearchField.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/ext-3.4.0/ux/ux-all.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/pages/js/OrganizationTree.js"></script>
<script type="text/javascript">
		var form;
		var user_auth_panel;
		var user_disp_panel;
		var assignedPartyGrid;
		Ext.onReady(function(){
			/*树*/
			var treePanel = new Ext.ux.tree.OrganizationTree({
				id:'orginizetree',
				baseUrl:'${pageContext.request.contextPath}/organize/getAllOrgJson.do?groupId='			
			});
	    var viewport = new Ext.Viewport({
				layout: 'border',
				items: 
				[
					treePanel
				]
			});
			treePanel.root.expand();	  	
		});




	  
	</script>
</head>
<body>

</body>
</html>
