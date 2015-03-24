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
		<script type="text/javascript">

		var dealUrl="${pageContext.request.contextPath}/pages/datahandle/form/NodeInfo.jsp";

		Ext.onReady(function() {
			Ext.QuickTips.init();
			var task_node_view = new Ext.Panel({
				id:'task_node_view',
				title: '数据批处理',
				//frame:true,
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				items:[
					new Ext.ux.IFrameComponent({
						url:dealUrl,
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});
			var flashurl="${pageContext.request.contextPath}/pages/datahandle/form/NodeInfo2.jsp";
			var node_history_view = new Ext.Panel({
				id:'node_history_view',
				title: '历史节点信息',
				//frame:true,
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				items:[
					new Ext.ux.IFrameComponent({
						url:flashurl,
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});
			
			var flow_chart_view = new Ext.Panel({
				id:'flow_chart_view',
				title: '流程图',
				//frame:true,
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				items:[
					new Ext.ux.IFrameComponent({
						url:'${pageContext.request.contextPath}/pages/datahandle/form/workflowchart.jsp',
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});			
			
			var taskTab = new Ext.TabPanel({
				region:'center',
				id:'center-panel',
				activeTab: 0,
				border:false,
				items:[
					task_node_view,node_history_view,flow_chart_view
				]
			});				
			var viewport = new Ext.Viewport({
				layout:'border',
				items:[taskTab]
			});
		},this,{delay:100});	
		</script>
	</head>
	<body>
	</body>
</html>	