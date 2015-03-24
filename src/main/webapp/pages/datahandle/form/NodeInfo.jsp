<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html  
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/ext-all.css" />
		<style type="text/css">
			.handle32 {
			    background-image:  url(${pageContext.request.contextPath}/css/images/handle16.png) !important;
			}
			.close32 {
			    background-image:  url(${pageContext.request.contextPath}/css/images/close16.png) !important;

			}						
		</style>
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ext-all.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/IFrameComponent.js"></script>
		<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/HandleInfoGridPanel.js"></script>
		<script type="text/javascript">
		var dealUrl="${pageContext.request.contextPath}/pages/datahandle/form/oneform.jsp";
		Ext.onReady(function() {
			Ext.QuickTips.init();
			var formView = new Ext.Panel({
				region:'center',
				id:'formView',
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				tbar:[
						
							{
				                text: '处理',
				                iconCls: 'handle32',
				                scale: 'large'
				            },
				            '-', 
							{
				                text: '关闭',
				                iconCls: 'close32',
				                scale: 'large'
				            }				            
										      
				],				
				items:[
					new Ext.ux.IFrameComponent({
						url:dealUrl,
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});
			var handleViewUrl="${pageContext.request.contextPath}/pages/datahandle/form/HandleInfo.jsp";
			var handleInfoView = new Ext.Panel({
				region:'center',
				title:'处理信息',
				id:'handleInfoView',
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				items:[
					new Ext.ux.IFrameComponent({
						url:handleViewUrl,
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});			
			
			var attachefileInfoView = new Ext.Panel({
				region:'center',
				title:'附件列表',
				id:'attachefileInfoView',
				border:false,
				bodyStyle:"background-color: #fafbfc",
				buttonAlign:"center",
				layout:'border',
				items:[
					new Ext.ux.IFrameComponent({
						url:handleViewUrl,
						autoScroll:true,
						region:'center',
						closable:false
					})				
				]
			});				
			
			var taskHandleTab = new Ext.TabPanel({
				height :250,
				region:'south',
				id:'center-panel',
				activeTab: 0,
				border:false,
				items:[
					handleInfoView,
					attachefileInfoView
				]
			});				
			var viewport = new Ext.Viewport({
				layout:'border',
				items:[formView,taskHandleTab]
			});
		},this,{delay:100});	
		</script>
	</head>
	<body>
	</body>
</html>	