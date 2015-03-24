Ext.ns('Ext.ux.form.x');
Ext.ux.form.x.UserPostInfoPanel = Ext.extend(Ext.FormPanel,{
	title:'用户岗位',
	layout: {type: 'hbox',align: 'stretch'},
	userPropertiesGrid:null,
	userPositionGrid:null,
	userpartyId:-1,
	positonSelGrid:null,
	selPositionWin:null,
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		Ext.ux.form.x.UserPostInfoPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.form.x.UserPostInfoPanel.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	initEvents : function(){
		Ext.ux.form.x.UserPostInfoPanel.superclass.initEvents.call(this);
	},
	notify:function(record,that){
		that.userpartyId=record.data.partyId;
		that.userPropertiesGrid.store.setBaseParam("partyId", record.data.partyId);
		that.userPropertiesGrid.store.load();
		that.userPositionGrid.store.setBaseParam("partyId", record.data.partyId);
		that.userPositionGrid.store.load();
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
		var userPositionStore =  new Ext.data.JsonStore({
			root:'records',
			totalProperty: 'totalCount',
			idProperty: 'positionId',
			remoteSort: true,
			autoScroll:true,
			fields:['positionId','positionName','positionDesc','createdStamp','updatedStamp'],
			baseParams:{start:0,limit:10,partyId:''},
		  proxy: new Ext.data.HttpProxy({
		        url: that.baseUrl+'/user/getUserPositonByParyId.do'
		  })
		});
		var userPositionGrid = new Ext.grid.GridPanel({
			border:true,
			store: userPositionStore,
			name:'userPositionGrid',
			title:'用户岗位',
			margins:"5 5 5 5",
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
					                       var record =grid.store.getAt(rowIndex);
					                       that.delOnePostionOfUser(that.userpartyId,record.data.positionId,that);
					                    }
				                	}
				                ]
				        },	        
				        {
	                id			 :'positionId',
	                header   : '岗位ID', 
	                width    : 100, 
	                sortable : true, 
	                dataIndex: 'positionId'
				        },
				        {
	                id			 :'positionName',
	                header   : '岗位名称', 
	                width    : 190, 
	                sortable : true, 
	                dataIndex: 'positionName'
				        },
				        {
	                id			 :'positionDesc',
	                header   : '岗位描述', 
	                width    : 190, 
	                sortable : true, 
	                dataIndex: 'positionDesc'
				        },
				        {
	                id			 :'createdStamp',
	                header   : '建立时间', 
	                width    : 190, 
	                sortable : true, 
	                dataIndex: 'createdStamp'
				        },
				        {
	                id			 :'updatedStamp',
	                header   : '更新时间', 
	                width    : 190, 
	                sortable : true, 
	                dataIndex: 'updatedStamp'
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
    					that.selPositionWin.show(that);
    				}
    			}	
    		}
			  ], 				      
    	stripeRows: true,
    	flex:1 
		});
		that.add(userPositionGrid);
		that.userPositionGrid = userPositionGrid;	
		/*岗位选择*/
		var positonSelStore =  new Ext.data.JsonStore({
			root:'records',
			idProperty: 'positionId',
			totalProperty:'totalCount',
			remoteSort: true,
			autoScroll:true,
			fields:['positionId','positionName','positionDesc','createdStamp','updatedStamp'],
			baseParams:{start:0,limit:10,query:''},
		  proxy: new Ext.data.HttpProxy({
		        url: that.baseUrl+'/user/getPositionByQuery.do'
		  })
		});
		var positonSelSm = new Ext.grid.CheckboxSelectionModel(); 
		var positonSelCm = new Ext.grid.ColumnModel(
			[
				positonSelSm,
        {
          id       :'positionId',
          header   :'岗位Id', 
          width    :100, 
          sortable :false, 
          dataIndex:'positionId'
        },
        {
          id			 :'positionName',
          header   : '岗位名称', 
          width    : 220, 
          sortable : true, 
          dataIndex: 'positionName'
        },
        {
          id			 :'positionDesc',
          header   : '岗位描述', 
          width    : 220, 
          sortable : true, 
          dataIndex: 'positionDesc'
        },
        {
          id			 :'createdStamp',
          header   : '创建时间', 
          width    : 220, 
          sortable : true, 
          dataIndex: 'createdStamp'
        },
        {
          id			 :'updatedStamp',
          header   : '更新时间', 
          width    : 220, 
          sortable : true, 
          dataIndex: 'updatedStamp'
        }				
			]
		);
		var positonSelGrid = new Ext.grid.GridPanel({
			region:'center',
			store: positonSelStore,
			name:'positonSelGrid',
			title:'',
			autoWidth:true,
			margins:"5 5 5 5",
			cm:positonSelCm,
			selModel:positonSelSm,  
	    stripeRows: true,
	    tbar:[
	    	'岗位名称/ID',
	    	{xtype:'textfield',name:'positionSearchTree_QueryStr',id:'positionSearchTree_QueryStr'},
	      {
	      	xtype:'button',
	      	text:'查询',
	      	iconCls:'search',
	      	handler:function(){
	      		debugger;
	      		var queryStr=Ext.getCmp("positionSearchTree_QueryStr").getValue();
							that.getPositionByQuery(queryStr,that);
	      	}
	      },
	      {
	      	xtype:'button',
	      	text:'确定',
	      	iconCls:'ok',
	      	handler:function(){
	      		var records=that.positonSelGrid.getSelectionModel().getSelections();
	        	that.addPositionToUser(records,that);
	      	}
	      },
	      {
	      	xtype:'button',
	      	text:'取消',
	      	iconCls:'cancel',
	      	handler:function(){
						that.selPositionWin.hide();             
	      	}
	      }	      	    	
	    ],
			bbar:[
					new Ext.PagingToolbar({
				      pageSize: 10,
				      store: this.store,
				      displayInfo: true,
				      displayMsg: 'Displaying topics {0} - {1} of {2}',
				      emptyMsg: ""
				  })
				  ]    
		});
		that.positonSelGrid = positonSelGrid;
		var selPositionWin = new Ext.Window({
			title: '岗位添加',
			closable:true,
			closeAction:'hide',
      width:600,
      height:350,
      plain:true,			
			layout: 'border',
			items: [positonSelGrid]
		});
		that.selPositionWin = selPositionWin;		
		that.positonSelGrid.store.load();					  					
	},
	delOnePostionOfUser:function(partyId,positionId,that){
		Ext.Ajax.request({
	    	url: that.baseUrl+'/user/delOnePostionOfUser.do',
	    	params:{partyId:partyId,positionId:positionId},
	    	success:function(response, opts){
			    var resultobj =Ext.decode(response.responseText);
			    if(resultobj.returncode=='0'){
						that.userPositionGrid.store.setBaseParam("partyId", that.userpartyId);
						that.userPositionGrid.store.load();
			    	Ext.Msg.show({ title:'操作成功',  msg:'删除岗位成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
			    }else{
			    	Ext.Msg.show({ title:'操作失败',  msg:'删除岗位失败\n失败原因:'+resultobj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});		
			    }
	    	},
		   	failure: function(response, opts) {
		       Ext.Msg.show({ title:'操作失败',  msg:'删除岗位失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
		   	}
		});	
	},
	getPositionByQuery:function(querystr,that){
		that.positonSelGrid.store.setBaseParam("query",querystr);
		that.positonSelGrid.store.setBaseParam("start",0);
		that.positonSelGrid.store.setBaseParam("limit",10);
		that.positonSelGrid.store.load();
	},
	addPositionToUser:function(records,that){
		var selIds = new Array();
		for(var i=0;i<records.length;i++){
			selIds.push(records[i].data.positionId);
		}
		if(selIds.length>0){
	    Ext.Ajax.request({
	    	url: that.baseUrl+'/user/addPositionToUser.do',
	    	params:{userPartyId:that.userpartyId,positionIds:selIds},
	    	success:function(response, opts){
			    var  returnobj =Ext.decode(response.responseText);
			    if(returnobj.returncode=='0'){
						that.userPositionGrid.store.setBaseParam("partyId", that.userpartyId);
						that.userPositionGrid.store.setBaseParam("start",0);
						that.userPositionGrid.store.setBaseParam("limit",10);
						that.userPositionGrid.store.load();
			      Ext.Msg.show({ title:'操作成功',  msg:'添加岗位成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
			      that.selPositionWin.hide();
			    }else{
			    	Ext.Msg.show({ title:'操作失败',  msg:'添加岗位失败\n失败原因:'+returnobj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR });
			    }  
	    	},
		   	failure: function(response, opts) {
		      Ext.Msg.show({ title:'操作失败',  msg:'添加岗位失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
		   	}
			});
		}		
	}			
});