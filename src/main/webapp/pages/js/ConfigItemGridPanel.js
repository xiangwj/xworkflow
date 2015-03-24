Ext.ns('Ext.ux.grid.x');
Ext.ux.grid.x.ConfigItemGridPanel = Ext.extend(Ext.grid.GridPanel,{
	region:'center',
	baseUrl:'',
	rowClickObserver:[],
	trackMouseOver:false,
	loadMask: true,
	stripeRows : true,
	configTypeId:-1,
	constructor: function(config) {
		 this.configTypeId = config.configTypeId;
		 this.setStore(config.baseUrl,this.configTypeId);
		 this.baseUrl=config.baseUrl;
		 this.setColumnModel(config.baseUrl);
		 this.tbar = this.buildTbar(this);	
		 this.bbar = this.buildbbar(this.store,this); 
		 Ext.ux.grid.x.ConfigItemGridPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.grid.x.ConfigItemGridPanel.superclass.initComponent.call(this,arguments);
	},	
	initEvents : function(){
		Ext.ux.grid.x.ConfigItemGridPanel.superclass.initEvents.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			Ext.each(this.rowClickObserver,function(item,index,allItems){
				item.notify(grid.store.getAt(rowIndex),item);
			});
		});
	},
	viewConfig:{
		getRowClass: function(record, index){
			var enabled=record.get("enabled");
			if(enabled=='Y'){
				return 'enabled_row';
			}else{
				return 'disabled_row';
			}
		}
	},
	notifyConfigTypeId:function(configTypeId){
		this.store.setBaseParam("configTypeId",configTypeId);
		this.store.setBaseParam("query", "");
		this.store.setBaseParam('start',0);
		this.store.setBaseParam('limit',25);		
		this.store.load();     
	},
	buildTbar:function(that){
		return [
								{	
									xtype:'textfield',
									name:'configItem_QueryStr',
									id:'configItem_QueryStr',
									fieldLabel:'配置项名/配置项描述'
								},
								{
									xtype:'button',
									text:'查询',
									iconCls:'search',
					      	handler:function(){
					      		var queryStr=Ext.getCmp("configItem_QueryStr").getValue();
					      		that.getStore().setBaseParam('start',0);
					      		that.getStore().setBaseParam('limit',25);
					      		that.getStore().setBaseParam('configTypeId',that.configTypeId);
					      		that.getStore().setBaseParam('query',queryStr);
										that.getStore().load();
					      	}									
								},
								{
											xtype:'button',
											text:'添加',
											iconCls:'add-btn',
											handler:function(){
												var newWindow = new Ext.Window.x.NewConfigItemWindow({
														baseUrl:that.baseUrl,
														selectedNodeId:that.configTypeId,
														gridpanel:that
												});
												newWindow.show();
											}
								},
								{
									xtype:'button',
									text:'编辑',
									iconCls:'edit-btn',
									handler:function(){
												debugger;
												var records = that.getSelectionModel().getSelections();
												if(records.length>0){
													var updateWindow = new Ext.Window.x.EditConfigItemWindow({
															baseUrl:that.baseUrl,
															selectedNodeId:that.configTypeId,
															configTypeId:that.configTypeId,
															configItemId:records[0].data.configItemId,
															configItemName:records[0].data.configItemName,
															configItemDesc:records[0].data.configItemDesc,
															configItemValue:records[0].data.configValue,
															configEnabled:records[0].data.enabled,
															configExt1:records[0].data.ext1,
															configCode:records[0].data.configCode,
															gridpanel:that
													});
													updateWindow.show();
											}
									}											
								}																
							
					 ];
	},
	buildbbar:function(store,grid){
		var bbar =	new Ext.PagingToolbar({
			      pageSize: 25,
			      store: store,
			      displayInfo: true,
			      displayMsg: 'Displaying topics {0} - {1} of {2}',
			      emptyMsg: "No topics to display",
			      items:[
			          '-', {
			          pressed: true,
			          enableToggle:true,
			          text: 'Show Preview',
			          cls: 'x-btn-text-icon details',
			          toggleHandler: function(btn, pressed){
			              var view = grid.getView();
			              view.showPreview = pressed;
			              view.refresh();
			          }
			      }]
			  });	
		return bbar;	  	
	},	
	setColumnModel:function(baseUrl){
		var cm = new Ext.grid.ColumnModel({
			defaults:{
				sortable: true
			},
			columns:[
			        	{dataIndex: "configTypeName", width: 160, sortable: true, header: '配置类型名'},
			        	{id:'configItemId',header: "ID", width: 160, sortable: true, dataIndex: 'configItemId'},
			        	{dataIndex: "configItemName", width: 160, sortable: true, header: '名称'},
			        	{dataIndex: "configItemDesc", width: 160, sortable: true, header: '描述'},
			        	{dataIndex: "configValue", width: 160, sortable: true, header: '值'},
			        	{dataIndex: "configCode", width: 160, sortable: true, header: '代码'},
			        	{dataIndex: "enabled", width: 160, sortable: true, header: '有效性'},
			        	{dataIndex: "ext1", width: 160, sortable: true, header: '扩展'},
			        	{dataIndex: "createdStamp", width: 160, sortable: true, header: '创建时间'},
			        	{dataIndex: "updatedStamp", width: 160, sortable: true, header: '修改时间'}
		      	]						
		});
		this.colModel = cm;
	},	
	setStore:function(baseUrl,configTypeId){
		  var store = new Ext.data.JsonStore({
		  	root: 'records',
		  	totalProperty: 'totalCount',
		  	idProperty: 'configItemId',
		  	remoteSort: true,
		  	baseParams:{start:0,limit:25,configTypeId:configTypeId,query:''},
		    fields: [
		    	{name:'configTypeName'}, 
		    	{name:'configItemId'},
		      {name:'configItemName'}, 
		      {name:'configItemDesc'}, 
		      {name:'configValue'}, 
		      {name:'configCode'},
		      {name:'enabled'},
		      {name:'ext1'},
		      {name:'createdStamp'},
		      {name:'updatedStamp'}
		    ],
		    proxy: new Ext.data.HttpProxy({
		        url: baseUrl+'/sysConfig/getConfigItemList.do'
		    })        	    	
			});
		 this.store=store;		
	},
	addClickObserver:function(clickObserver){
		if(this.rowClickObserver.indexOf(clickObserver)==-1){
				this.rowClickObserver.push(clickObserver);
		}
	},
	removeClickObserver:function(clickObserver){
		this.rowClickObserver.remove(clickObserver);
	},
	reload:function(){
		this.store.setBaseParam("configTypeId",this.configTypeId);
		this.store.setBaseParam("query", "");
		this.store.setBaseParam('start',0);
		this.store.setBaseParam('limit',25);	
		this.store.load();     	
	},
	notify:function(nodeid,_self){
		this.configTypeId=nodeid;
		this.store.setBaseParam("configTypeId",this.configTypeId);
		this.store.setBaseParam("query", "");
		this.store.setBaseParam('start',0);
		this.store.setBaseParam('limit',25);		
		this.store.load();   		
	}	    	        		  	
});