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
	<link rel="stylesheet" type="text/css"	href="${pageContext.request.contextPath}/ext-3.4.0/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/treegrid.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css"	href="${pageContext.request.contextPath}/css/main.css" />
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
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ext-all.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ux/MySearchField.js"></script>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ux/ux-all.js"></script>
	
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridSorter.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridColumnResizer.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridNodeUI.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridLoader.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridColumns.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGrid.js"></script>
        		
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/OrganizationTree.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/StuffGridPanel.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/UserDetailInfoPanel.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/UserAuthInfoPanel.js"></script>			
	<script type="text/javascript"	src="${pageContext.request.contextPath}/pages/js/UserPostInfoPanel.js"></script>
	<script type="text/javascript">
		Ext.onReady(function(){
			/*人员列表*/
			var stuffGridPanel = new Ext.ux.grid.x.StuffGridPanel({
				region:'center',
				id:'stuffGridPanel',
				baseUrl:'${pageContext.request.contextPath}'			
			});
			/*左侧树*/
			var treePanel = new Ext.ux.tree.x.OrganizationTree({
				region:'west',
				split:true,
				collapsible: true,
				id:'orginizetree',
				baseUrl:'${pageContext.request.contextPath}',
				clickInfoComponents:[stuffGridPanel]			
			});
			/*人员信息表单*/
			var userDetailInfoPanel = new Ext.ux.form.x.UserDetailInfoPanel({
				region:'center',
				baseUrl:'${pageContext.request.contextPath}'
			});
			var userDetailInfoPanel = new Ext.ux.form.x.UserDetailInfoPanel({
				region:'center',
				baseUrl:'${pageContext.request.contextPath}'
			});			
			/*人员权限配置*/
			var userAuthInfoPanel = new Ext.ux.form.x.UserAuthInfoPanel({
				baseUrl:'${pageContext.request.contextPath}'
			});
			/*人员岗位信息*/
			var userPostInfoPanel = new Ext.ux.form.x.UserPostInfoPanel({
				baseUrl:'${pageContext.request.contextPath}'
			});
			stuffGridPanel.addClickObserver(userDetailInfoPanel);
			stuffGridPanel.addClickObserver(userAuthInfoPanel);
			stuffGridPanel.addClickObserver(userPostInfoPanel);
		  var tabPanel = new Ext.TabPanel({
          region: 'north', 
          deferredRender: false,
          activeTab: 0,
          height:360,
        	items: 
          [
          	userDetailInfoPanel,
          	userAuthInfoPanel,
          	userPostInfoPanel 
          ]
	    });	 			
		  var viewport = new Ext.Viewport({
					layout: 'border',
					items: 
					[
						treePanel,
						{
						    title: 'Center Region',
						    region: 'center',     
						    xtype: 'container',
						    layout: 'border',
						    split:true,
						    collapsible: true,
						    margins: '2 2 2 0',
						    items:[tabPanel,stuffGridPanel]
						}
					]
			});
			treePanel.root.expand();
	  });			 
	</script>
</head>
<body>

</body>
</html>
