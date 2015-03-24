<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>流程管理</title>
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
	    .workflow-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/workflow-icon.gif) !important;
		}	
		.monitor-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/monitor-icon.gif) !important;
		}
		.maintain-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/maintain-icon.gif) !important;
		}				
		.option-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/option-icon.png) !important;
		}
		.flow-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/flow-icon.png) !important;
		}
		.search-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/search-icon.png) !important;
		}
		.waitdo-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/waitdo-icon.gif) !important;
		}
		.other-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/other-icon.gif) !important;
		}
		.base-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/base-icon.gif) !important;
		}	
		.group-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/group-icon.gif) !important;
		}
		.flowop-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/flowop-icon.png) !important;
		}
		.flowmg-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/flowmg-icon.png) !important;
		}																
		.add-icon {
	    	background-image: url(${pageContext.request.contextPath}/css/images/add-icon.png) !important;
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
			

	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/NavigateTreePanel.js"></script>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/NavigateGridPanel.js"></script>
	<script type="text/javascript">
		Ext.onReady(function(){
			Ext.QuickTips.init();
			var navigateTreePanel = new Ext.tree.TreePanel.x.NavigateTreePanel({
				region:'west',
				baseUrl:'${pageContext.request.contextPath}',
				split:true,
				collapsible:true
			});

			var navigateGridPanel = new Ext.ux.grid.x.NavigateGridPanel({
				region:'center',
				baseUrl:'${pageContext.request.contextPath}'
			});
			var cg00 = new Ext.Panel({
				title:'我的待处理',
				region:'center',
		      	columnWidth:1.0,
		        layout: 'border',
		        items: 
		          [navigateGridPanel]
				});			
			var viewport = new Ext.Viewport({
				layout: 'border',
				items: 
				[
					navigateTreePanel,cg00
				]
			});
			navigateGridPanel.reload();
	  });
		function  window.onbeforeunload(){
			  
			  var url ="<%=request.getContextPath()%>/pages/cleansession.jsp";
			  //var url ="<%=request.getContextPath()%>/pages/alarmhander.jsp";
			  window.location.href=url;
			  window.open(url);
			  
			}
	      		
	</script>
</head>
<body>

</body>
</html>
