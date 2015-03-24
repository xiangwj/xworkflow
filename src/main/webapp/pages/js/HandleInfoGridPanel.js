Ext.ns('Ext.ux.grid.x');
Ext.ux.grid.x.HandleInfoGridPanel = Ext.extend(Ext.grid.GridPanel,{
	region:'center',
	baseUrl:'',
	rowClickObserver:[],
	trackMouseOver:false,
	loadMask: true,
	stripeRows : true,
	constructor: function(config) {
		 this.setStore(config.baseUrl);
		 this.baseUrl=config.baseUrl;
		 this.setColumnModel(config.baseUrl);
		 this.bbar = this.buildbbar(this.store,this); 
		 Ext.ux.grid.x.HandleInfoGridPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.grid.x.HandleInfoGridPanel.superclass.initComponent.call(this,arguments);
	},	
	initEvents : function(){
		Ext.ux.grid.x.HandleInfoGridPanel.superclass.initEvents.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			Ext.each(this.rowClickObserver,function(item,index,allItems){
				item.notify(grid.store.getAt(rowIndex),item);
			});
		});
	},
	viewConfig:{
		getRowClass: function(record, index){
		}
	},
	notifyConfigTypeId:function(configTypeId){
		this.store.setBaseParam('start',0);
		this.store.setBaseParam('limit',25);		
		this.store.load();     
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
			         	{id:'workEffortId',header: "任务编号", width: 160, sortable: true, dataIndex: 'workEffortId'},
			        	{id:'userName',header: "处理人", width: 160, sortable: true, dataIndex: 'userName'},
			        	{dataIndex: "action", width: 160, sortable: true, header: '处理动作'},
			        	{dataIndex: "content", width: 300, sortable: true, header: '内容'},
			        	{dataIndex: "beginTime", width: 160, sortable: true, header: '开始处理日期'},
			        	{dataIndex: "endTime", width: 160, sortable: true, header: '结束处理日期'},
			        	{dataIndex: "period", width: 160, sortable: true, header: '处理时长'}

		      	]						
		});
		this.colModel = cm;
	},	
	setStore:function(baseUrl,configTypeId){
		  var store = new Ext.data.JsonStore({
		  	root: 'records',
		  	totalProperty: 'totalCount',
		  	idProperty: 'workEffortId',
		  	remoteSort: true,
		  	baseParams:{start:0,limit:25,query:''},
		    fields: [
		    	{name:'workEffortId'}, 
		    	{name:'userName'},
		      {name:'action'}, 
		      {name:'content'}, 
		      {name:'beginTime'},
		      {name:'endTime'},
		      {name:'period'}
		    ],
		    proxy: new Ext.data.HttpProxy({
		        url: baseUrl+'/navigate/getHandleInfoList.do'
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

		this.store.setBaseParam('start',0);
		this.store.setBaseParam('limit',25);	
		this.store.load();     	
	}
	    	        		  	
});