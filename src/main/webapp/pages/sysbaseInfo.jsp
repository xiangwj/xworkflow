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
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ux/MySearchField.js"></script>	

        
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridSorter.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridColumnResizer.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridNodeUI.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridLoader.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGridColumns.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/ext-3.4.0/ux/treegrid/TreeGrid.js"></script>
	<script type="text/javascript">
		Ext.onReady(function(){
		Ext.QuickTips.init();

    var myTree = new Ext.ux.tree.TreeGrid({         
        region:"center",
        useArrows:true,   
   			listeners:{
   				/*'click' : function(node,e){
   					debugger;
   					alert(node.attributes.xid);
   				}*/ 
   			},
        columns:[
        
					{
						header: '名称',  
						dataIndex: 'name',
						width: 230,
						tooltip:'FAFAFAS'  
	        },
					{
						header: '描述',  
						dataIndex: 'description',
						width: 230  
	        },	  
					{
						header: 'ID',  
						dataIndex: 'xid',
						width: 230
						 
	        }
      
        ],
        tbar:['角色/权限',
        {xtype:'textfield',name:'queryStr',id:'queryStr'},
        {
        	xtype:'button',
        	text:'查询',
        	iconCls:'search',
        	handler:function(){
        		  var queryStr=Ext.getCmp("queryStr").getValue();
					    var nodes = {};    
					    Ext.Ajax.request({
					    	url: '${pageContext.request.contextPath}/role/getAllRoleList.do',
					    	params:{query:queryStr},
					    	success:function(response, opts){
					    		root.removeAll(true);
							    var nodes = {};    
							    nodes.children =Ext.decode(response.responseText);
							    appendChild(root, nodes);     		
					    	},
						   	failure: function(response, opts) {
						      alert('加载失败');
						   	}
					    	
							});	  		
        	}
        },
        {
        	xtype:'button',
        	text:'确定',
        	iconCls:'ok',
        	handler:function(){
              var b = myTree.getChecked();
               var checkid = new Array;// 存放选中id的数组
              for (var i = 0; i < b.length; i++) {
              	debugger;
                   checkid.push(b[i].attributes.xid);// 添加id到数组
              }
               alert(checkid.toString());        		
        	}
        },
        {
        	xtype:'button',
        	text:'取消',
        	iconCls:'cancel',
        	handler:function(){
              var b = myTree.getChecked();
               var checkid = new Array;// 存放选中id的数组
              for (var i = 0; i < b.length; i++) {
              	debugger;
                   checkid.push(b[i].attributes.xid);// 添加id到数组
              }
               alert(checkid.toString());        		
        	}
        }        
        ]   
    });      
    var root = new Ext.tree.TreeNode({    
        text: '根节点',    
        expanded: true,
        checked:false    
    });   
    myTree.setRootNode(root);    
    var nodes = {};    
    Ext.Ajax.request({
    	url: '${pageContext.request.contextPath}/role/getAllRoleList.do',
    	params:{query:null},
    	success:function(response, opts){
		    var nodes = {};    
		    nodes.children =Ext.decode(response.responseText);
		    appendChild(root, nodes);     		
    	},
	   	failure: function(response, opts) {
	      alert('加载失败');
	   	}
    	
		});    				    			
		  var viewport = new Ext.Viewport({
					layout: 'border',
					items: 
					[
						myTree
					]
			});

	  });
	  function appendChild(node, o) {    
	    if (o.children != null && o.children.length > 0) {    
	        for (var a = 0; a < o.children.length; a++) { 

	            var n = new Ext.tree.TreeNode({    
	                name:o.children[a].name,    
	                xid:o.children[a].xid,    
	                type:o.children[a].type,    
	                description:o.children[a].description,
	                iconCls:o.children[a].iconCls,    
	                checked:o.children[a].checked
	            });    
	            node.appendChild(n);    
	            appendChild(n, o.children[a]);    
	        }    
	    }    
		}
		function findRoleByQuery(queryStr){
		
		} 			 
	</script>
</head>
<body>

</body>
</html>
