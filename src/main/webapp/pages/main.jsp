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
		<script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/lib/ux/mif/miframe-debug.js"></script>
		<script type="text/javascript">

		   function menuItemClick(source,menuitem,e){
			 		Ext.getCmp("mainframe").setSrc(source.url);
		   }
		   
		   Ext.onReady(function(){
				var mainMenu;	
				var menu ; 
				var item ;
				var tb = new Ext.Toolbar();
				
				mainMenu =  	new Ext.menu.Menu();
				item = new Ext.menu.Item();
				item.text='组织管理';
				item.url='${pageContext.request.contextPath}/pages/userManager.jsp';
				item.addListener("click",menuItemClick);
				mainMenu.addItem(item);
				tb.add({text:'权限角色',xtype:'splitbutton',menu:mainMenu});  	
			 
			 	mainMenu = new Ext.menu.Menu();
			 	menu = new Ext.menu.Menu();
			 
			  item = new Ext.menu.Item();
			 	item.text='待办';
			 	menu.addItem(item);
				
				item = new Ext.menu.Item();			 
				item.text='审批';
				item.url='http://www.sina.com.cn';
				menu.addItem(item);
				
				item.addListener("click",menuItemClick);
				item = new Ext.menu.Item();
				item.text='查询';
				menu.addItem(item);
					 
				
				item = new Ext.menu.Item();
				item.url='http://www.online.sh.cn';
				item.menu = menu;
				item.text='工单管理';
				item.addListener("click",menuItemClick);
				item.iconCls='add16';
				mainMenu.addItem(item);
			
				tb.add({text:'中心ETS',xtype:'splitbutton',menu:mainMenu});  
			 
			
				var viewport = new Ext.Viewport({
			           layout:'border',
			           items:
			           	[
							{
								region:'north',
								id:'north-panel',
								height: 70,
								margins:'1 1 1 1',
								bodyStyle: 'background:#ffc; padding:0px;',
								html:'<img src="${pageContext.request.contextPath}/css/images/0.jpg" width="100%" height="70px"></img>'
							},
				            {
								layout:'border',
								region:'center',
				                id:'center-panel',
				                tbar:[tb],
				                items:[{
				                	region:'center',
				                	xtype:'iframepanel',
				                	id:'mainframe',
				                	border:true,
				                	defaultSrc: 'about:blank', 
				                	autoHeight:false
				                }]
				            },
				            {
				                region:'south',
				                id:'south-panel',
				                margins:'1 1 1 1',
				                height:25
				            }				            				            
			            ]
			    });
		   });
		</script>		
	</head>
	<body>
	</body>
</html>	