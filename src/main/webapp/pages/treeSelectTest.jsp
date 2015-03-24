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
				
	</style>	
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ext-all.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/ext-3.4.0/ux/TreeField.js"></script>
	<script type="text/javascript">

      
    
       
 
		Ext.onReady(function(){
			var comboxWithTree = new Ext.form.TreeField({
				rootVisible:true,
				hiddenName:'typeId',
				id:'typeName',
				displayField : 'text',
				valueField: 'id',
				fieldLabel:'配置名',
				/*labelSeparator: ':' + '&nbsp;&nbsp;<img src="'+ Ext.NEEDED_IMAGE_URL + '"/>',*/
				emptyText:'请选择父节点...',  
				listWidth:200, 
				listHeight:200,  
				readOnly:false,
				dataUrl:'${pageContext.request.contextPath}/sysConfig/getSysConfigTreeByNodeId.do',  
				allowBlank : false, 
				blankText    :'请选择父节点',
  			treeRootConfig : {      
        	id : '-1',      
        	text : 'root',      
        	draggable:false     
  			},				   
        listeners:{   
            select:{   
                fn: function(cob){   
                    var rvtext = cob.getRawValue();   
                    var rvid = cob.getValue();   
                    if(rvid.length!=0){   
                        formPanel.getForm().findField("typeName").setRawValue(rvtext);
                    }   
                }   
            }
        }			
			});
			
			var formPanel = new Ext.form.FormPanel({
				region:'center',
				labelWidth: 75,
				frame:true,
				bodyStyle:'padding:5px 5px 0',
				bodyStyle:'padding:5px 5px 0',
				defaultType: 'textfield',
				labelAlign : 'right',
				items:[
				comboxWithTree,
				{
					xtype:'button',text:'test',
					handler:function(){
						var node = comboxWithTree.tree.getNodeById('5');
						comboxWithTree.select(node);							
					}
				}	
				]
			});
			
			 
		  var viewport = new Ext.Viewport({
					layout: 'border',
					items: 
					[
						formPanel
					]
			});
			
			comboxWithTree.tree.on("expandnode",	function(node){	
					if(node.id=='5'){
						 comboxWithTree.select(node);	
					}
				}
			)
			comboxWithTree.tree.expandAll();	
	  });			 
	</script>
</head>
<body>

    
</body>
</html>
