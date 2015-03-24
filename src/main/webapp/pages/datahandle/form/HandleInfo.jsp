<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/ext-all.css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ext-all.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/IFrameComponent.js"></script>
		<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/HandleInfoGridPanel.js"></script>
		<script type="text/javascript">
		
		Ext.onReady(function() {
			var handleInfoGridPanel = new Ext.ux.grid.x.HandleInfoGridPanel({
				region:'center',
				baseUrl:'${pageContext.request.contextPath}'
			});
			handleInfoGridPanel.reload();
			var viewport = new Ext.Viewport({
				layout:'border',
				items:[handleInfoGridPanel]
			});
		},this,{delay:100});	
		</script>
	</head>
	<body>
	</body>
</html>	