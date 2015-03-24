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
			var cgl01 = new Ext.Panel({
				layout : 'form',
				columnWidth : .5,
				anchor : '-20',
				border : true,
				items : [
				         {xtype:'textfield',fieldLabel:'告警编号0'},
				         {xtype:'textfield',fieldLabel:'告警编号1'}
				]
			});
			var cgl02 = new Ext.Panel({
				layout : 'form',
				columnWidth : .5,
				anchor : '-20',
				border : true,
				items : [
				         {xtype:'textfield',fieldLabel:'告警编号0'},
				         {xtype:'textfield',fieldLabel:'告警编号1'}
				]
			});			
			var fieldset01 = new Ext.form.FieldSet({
				collapsible: false,
				layout : 'column',
				anchor : '-20',
				autoHeight:false,
				borderStyle:'border 0 none',
				collapsed: false,
				items :[cgl01,cgl02]
			});
			
			var simple = new Ext.form.FormPanel({
				method: 'POST',
				autoScroll: true,
				frame:true,
				borderStyle:'border 0 none',
				defaultType: 'textfield',
				region:'center',
				margins:'1 1 1 1',
				border: false,
				labelWidth: 85, 
				itemCls:'x-form-label-nowrap',
				titleTipEnable:'true',
				buttonAlign:'center',
				items:[{
					
				}]
				buttons:[
	
				{text: '提交'},
			    {text: '保存为草稿'},
			    {text: '取消'}
				]
			});
			//simple.add(fieldset01);

			var viewport = new Ext.Viewport({
				layout: 'border',
				items: 
				[
				simple
				]
			});
			
	  });

	      		
	</script>
</head>
<body>

</body>
</html>
