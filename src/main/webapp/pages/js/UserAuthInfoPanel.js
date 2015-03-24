Ext.ns('Ext.ux.form.x');
Ext.ux.form.x.UserAuthInfoPanel = Ext.extend(Ext.FormPanel,{
	title:'用户授权',
	userPropertiesGrid:null,
	userRoleGrid:null,
	permissionGrid:null,
	selRoleWin:null,
	roleSearchTree:null,
	baseUrl:'',
  layout: {type: 'hbox',align: 'stretch'},
	autoScroll:true,
	userpartyId:-1,	
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		Ext.ux.form.x.UserAuthInfoPanel.superclass.constructor.call(this, config);
	},
	
	initComponent: function(){
		Ext.ux.form.x.UserAuthInfoPanel.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	
	notify:function(record,that){
		that.userpartyId=record.data.partyId;
		that.userPropertiesGrid.store.setBaseParam("partyId", record.data.partyId);
		that.userPropertiesGrid.store.load();
		that.userRoleGrid.store.setBaseParam("partyId", record.data.partyId);
		that.userRoleGrid.store.load();
		that.permissionGrid.store.removeAll();
	},
	initEvents : function(){
		Ext.ux.form.x.UserAuthInfoPanel.superclass.initEvents.call(this);
	},
	buildAll:function(that){
		var userPropertiesStrore =  new Ext.data.JsonStore({
			root:'values',
			fields:['key','keydesc','value','valuedesc'],
			baseParams:{partyId:''},
	    proxy: new Ext.data.HttpProxy({
	        url: that.baseUrl+'/user/getUserKeyValueMapInfoByParyId.do'
	    })  							
		});
		var userPropertiesGrid = new Ext.grid.GridPanel({
			border:true,
			store: userPropertiesStrore,
			name:'userPropertiesGrid',
			title:'用户资料',
			flex: 0.75,
			margins:"5 0 5 5",
			columns:[
				        {
	                id       :'keydesc',
	                header   :'属性名', 
	                width    :100, 
	                sortable :false, 
	                dataIndex:'keydesc'
				        },
				        {
	                id			 :'valuedesc',
	                header   : '属性值', 
	                width    : 150, 
	                sortable : true, 
	                dataIndex: 'valuedesc'
				        }
				      ],
    	stripeRows: true,
    	stateful: true
  	});
		that.add(userPropertiesGrid);
		that.userPropertiesGrid = userPropertiesGrid;
		
		var userRoleStore =  new Ext.data.JsonStore({
			root:'records',
			totalProperty: 'totalCount',
			idProperty: 'roleId',
			remoteSort: true,
			autoScroll:true,
			fields:['roleId','roleName','roleDesc','createdStamp','createdStamp','updatedStamp'],
			baseParams:{start:0,limit:25,partyId:''},
		  proxy: new Ext.data.HttpProxy({
		        url: that.baseUrl+'/user/getUserRoleList.do'
		  })
		});
		var userRoleGrid = new Ext.grid.GridPanel({
			border:true,
			store: userRoleStore,
			name:'userRoleGrid',
			title:'用户角色',
			margins:"5 0 5 5",
			columns:[
								{
				        	header:'操作',
				        	id:'ope',
	                xtype: 'actioncolumn',
	                width: 50,
				          items: 
				                [
					                {
					                    icon   : that.baseUrl+'/css/images/delete.gif', 
					                    tooltip: '删除',
					                    handler: function(grid, rowIndex, colIndex) 
					                    {
					                       that.deleteUserRole(grid, rowIndex, colIndex,that); 
					                    }
				                	}
				                ]
				        },	        
				        {
	                id			 :'roleName',
	                header   : '角色名称', 
	                width    : 100, 
	                sortable : true, 
	                dataIndex: 'roleName'
				        },
				        {
	                id			 :'roleDesc',
	                header   : '角色描述', 
	                width    : 190, 
	                sortable : true, 
	                dataIndex: 'roleDesc'
				        }				        
				      ],
			bbar:[
				new Ext.PagingToolbar({
			      pageSize: 10,
			      store: this.store,
			      displayInfo: true,
			      displayMsg: 'Displaying topics {0} - {1} of {2}',
			      emptyMsg: ""
			  }),
			  {
			  	xtype:'button',
			  	iconCls: 'add-btn',
			  	text:'添加',
			  	handler:function(b,e){
    				if(that.userpartyId==-1){
    					Ext.Msg.show({ title:'警告',  msg:'您没有选择用户', buttons: Ext.Msg.OK,icon: Ext.MessageBox.WARNING});
    				}else{	
    					that.selRoleWin.show(that);
    				}
    			}	
    		}
			  ], 				      
    	stripeRows: true,
    	flex:1 
		});
		that.add(userRoleGrid);
		that.userRoleGrid = userRoleGrid;
		
		var permissionStore =  new Ext.data.JsonStore({
			root:'records',
			idProperty: 'roleId',
			totalProperty:'totalCount',
			remoteSort: true,
			autoScroll:true,
			fields:['permissionId','description','createdStamp','updatedStamp'],
			baseParams:{start:0,limit:10,roleId:''},
		  proxy: new Ext.data.HttpProxy({
		        url: that.baseUrl+'/user/getSecurityPermissions.do'
		  })
		});
		var permissionGrid = new Ext.grid.GridPanel({
			border:true,
			store: permissionStore,
			name:'permissionGrid',
			title:'角色-权限',
			autoWidth:true,
			flex:1,
			margins:"5 5 5 5",
			columns:[
				        {
	                id       :'permissionId',
	                header   :'权限ID', 
	                width    :100, 
	                sortable :false, 
	                dataIndex:'permissionId'
				        },
				        {
	                id			 :'description',
	                header   : '权限名称', 
	                width    : 220, 
	                sortable : true, 
	                dataIndex: 'description'
				        }
				      ],
	    stripeRows: true,
			bbar:[
					new Ext.PagingToolbar({
				      pageSize: 10,
				      store: permissionStore,
				      displayInfo: true,
				      displayMsg: 'Displaying topics {0} - {1} of {2}',
				      emptyMsg: ""
				  })
				  ]    
		});
		that.add(permissionGrid);	
		that.permissionGrid = permissionGrid;
		
		userRoleGrid.on('rowclick',function(grid,rowIndex,e){
			var record =grid.store.getAt(rowIndex);
			permissionGrid.store.setBaseParam("roleId", record.data.roleId);
			permissionGrid.store.load();
		});
		
		/*权限添加弹出窗口*/
    var roleSearchRoot = new Ext.tree.TreeNode({    
        text: '根节点',    
        expanded: true,
        checked:false    
    });		
		var roleSearchTree = new Ext.ux.tree.TreeGrid({
			region:"center",
			useArrows:true,
 			listeners:{
 				/*'click' : function(node,e){
 					alert(node.attributes.xid);
 				}*/ 
 			},
			columns:[
				{
					header: '名称',  
					dataIndex: 'name',
					width: 230
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
      tbar:[
      '角色/权限',
      {xtype:'textfield',name:'roleSearchTree_QueryStr',id:'roleSearchTree_QueryStr'},
      {
      	xtype:'button',
      	text:'查询',
      	iconCls:'search',
      	handler:function(){
      		var queryStr=Ext.getCmp("roleSearchTree_QueryStr").getValue();
					var nodes = {};    
					Ext.Ajax.request({
				    	url: that.baseUrl+'/role/getAllRoleList.do',
				    	params:{query:queryStr},
				    	success:function(response, opts){
				    		roleSearchRoot.removeAll(true);
						    var nodes = {};    
						    nodes.children =Ext.decode(response.responseText);
						    that.appendRoleSearchTreeChild(roleSearchRoot, nodes,that);     		
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
        	var b = roleSearchTree.getChecked();
          var roleIds = new Array();// 存放选中id的数组
          for (var i = 0; i < b.length; i++) {
            roleIds.push(b[i].attributes.xid);// 添加id到数组
          }
          if(roleIds.length>0){
				    Ext.Ajax.request({
				    	url: that.baseUrl+'/user/addSecurityRoleToUser.do',
				    	params:{userPartyId:that.userpartyId,roleIds:roleIds},
				    	success:function(response, opts){
						    var  returnobj =Ext.decode(response.responseText);
						    if(returnobj.returncode=='0'){
									that.userRoleGrid.store.setBaseParam("partyId", that.userpartyId);
									that.userRoleGrid.store.setBaseParam("start",0);
									that.userRoleGrid.store.setBaseParam("limit",10);
									that.userRoleGrid.store.load();
						    	
						    	that.permissionGrid.store.setBaseParam("roleId","");
						    	that.permissionGrid.store.setBaseParam("start",0);
						    	that.permissionGrid.store.setBaseParam("limit",10);
						    	that.permissionGrid.store.load();									
						      
						      Ext.Msg.show({ title:'操作成功',  msg:'添加角色成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
						      that.selRoleWin.hide();
						    }else{
						    	Ext.Msg.show({ title:'操作失败',  msg:'添加角色失败\n失败原因:'+returnobj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
						    }  
				    	},
					   	failure: function(response, opts) {
					      Ext.Msg.show({ title:'操作失败',  msg:'添加角色失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
					   	}
						});          	
          }
      	}
      },
      {
      	xtype:'button',
      	text:'取消',
      	iconCls:'cancel',
      	handler:function(){
					that.selRoleWin.hide();             
      	}
      }       
      ]			 						
		});
		roleSearchTree.setRootNode(roleSearchRoot);	
    var nodes = {};    
    Ext.Ajax.request({
    	url: that.baseUrl+'/role/getAllRoleList.do',
    	params:{query:''},
    	success:function(response, opts){
		    var nodes = {};
		    nodes.children =Ext.decode(response.responseText);
		    that.appendRoleSearchTreeChild(roleSearchRoot, nodes,that);     		
    	},
	   	failure: function(response, opts) {
	      alert('加载失败');
	   	}
		});
		that.roleSearchTree = roleSearchTree;		
		var selRoleWin = new Ext.Window({
			title: '角色添加',
			closable:true,
			closeAction:'hide',
      width:600,
      height:350,
      plain:true,			
			layout: 'border',
			items: [roleSearchTree]
		});
		that.selRoleWin = selRoleWin;
	},
	appendRoleSearchTreeChild:function(node, o,that){
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
	          that.appendRoleSearchTreeChild(n, o.children[a],that);    
	      }    
	  }  		
	},
	deleteUserRole:function(grid, rowIndex, colIndex,that){
		var roleId = grid.store.getAt(rowIndex).data.roleId;
		Ext.Ajax.request({
	    	url: this.baseUrl+'/user/delSecurityRoleToUser.do',
	    	params:{roleId:roleId,userPartyId:this.userpartyId},
	    	success:function(response, opts){
		    	var returnobj =Ext.decode(response.responseText);
			    if(returnobj.returncode=='0'){
			    	Ext.Msg.show({ title:'操作成功',  msg:'删除角色成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
			    	grid.store.setBaseParam("partyId", that.userpartyId);
			    	grid.store.setBaseParam("start", 0);
			    	grid.store.setBaseParam("limit", 10);
			    	grid.store.load();
			    	that.permissionGrid.store.setBaseParam("roleId","");
			    	that.permissionGrid.store.setBaseParam("start",0);
			    	that.permissionGrid.store.setBaseParam("limit",10);
			    	that.permissionGrid.store.load();
			    }else{
			    	Ext.Msg.show({ title:'操作失败',  msg:'添加角色失败\n失败原因:'+returnobj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
			    }
	    	},
		   	failure: function(response, opts) {
		      Ext.Msg.show({ title:'操作失败',  msg:'添加角色失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
		   	}
		});			
	}	
});