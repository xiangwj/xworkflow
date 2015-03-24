<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>配置管理</title>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	<link rel="stylesheet" type="text/css"	href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/ext-all.css" />
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/buttons.css" rel="stylesheet" />
	<style type="text/css">
	    html, body {
	        font:normal 12px verdana;
	        margin:0;
	        padding:0;
	        border:0 none;
	        overflow:hidden;
	        height:100%;
	    }
	    .add-btn {
	    background-image: url(${pageContext.request.contextPath}/css/images/add.gif) !important;
			}	
			.cls-btn {
	    background-image: url(${pageContext.request.contextPath}/css/images/fieldclean.gif) !important;
			}
			.edit-btn {
	    background-image: url(${pageContext.request.contextPath}/css/images/calculator_edit.gif) !important;
			}				
			.save-btn {
	    background-image: url(${pageContext.request.contextPath}/css/images/save.gif) !important;
			}
			.del-btn {
	    background-image: url(${pageContext.request.contextPath}/css/images/delete.gif) !important;
			}
			.enabled_row{
				color:green;
			}
			.disabled_row{
				color: red;
			}				
	</style>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ext-all-debug.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ux/TreeField.js"></script>
			

	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/SysConfigTreePanel.js"></script>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/NewConfigTypeWindow.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/EditConfigTypeWindow.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/ConfigItemGridPanel.js"></script>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/NewConfigItemWindow.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/EditConfigTypeWindow.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/EditConfigItemWindow.js"></script>	
	<script type="text/javascript">
		Ext.onReady(function(){
			Ext.QuickTips.init();
			var sysConfigTreePanel = new Ext.tree.TreePanel.x.SysConfigTreePanel({
				region:'west',
				baseUrl:'${pageContext.request.contextPath}',
				split:true,
				collapsible:true
			});
			var configItemGridPanel = new Ext.ux.grid.x.ConfigItemGridPanel({
				region:'center',
				baseUrl:'${pageContext.request.contextPath}',
				configTypeId:-1
			});
			sysConfigTreePanel.addClickObserver(configItemGridPanel);
			sysConfigTreePanel.firstClick(-1);
			var viewport = new Ext.Viewport({
				layout: 'border',
				items: 
				[
					sysConfigTreePanel,configItemGridPanel
				]
			});
			
	  });
	</script>
</head>
<body>

</body>
</html>
