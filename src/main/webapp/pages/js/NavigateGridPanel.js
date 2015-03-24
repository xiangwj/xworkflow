Ext.ns('Ext.ux.grid.x');
Ext.ux.grid.x.NavigateGridPanel = Ext.extend(Ext.grid.GridPanel,{
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
		 Ext.ux.grid.x.NavigateGridPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.grid.x.NavigateGridPanel.superclass.initComponent.call(this,arguments);
	},	
	initEvents : function(){
		Ext.ux.grid.x.NavigateGridPanel.superclass.initEvents.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			Ext.each(this.rowClickObserver,function(item,index,allItems){
				item.notify(grid.store.getAt(rowIndex),item);
			});
		});
	},
	viewConfig:{
		getRowClass: function(record, index){
			/*var enabled=record.get("enabled");
			if(enabled=='Y'){
				return 'enabled_row';
			}else{
				return 'disabled_row';
			}*/
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
			        	{id:'srId',header: "编号", width: 160, sortable: true, dataIndex: 'srId'},
			        	{dataIndex: "srType", width: 160, sortable: true, header: '类型'},
			        	{dataIndex: "title", width: 160, sortable: true, header: '描述'},
			        	{dataIndex: "status", width: 160, sortable: true, header: '状态'},
			        	{dataIndex: "expStart", width: 160, sortable: true, header: '预期开始时间'},
			        	{dataIndex: "expComplete", width: 160, sortable: true, header: '预期结束时间'},
			        	{dataIndex: "apply", width: 160, sortable: true, header: '申请人'},
			        	{dataIndex: "applytime", width: 160, sortable: true, header: '申请时间'}

		      	]						
		});
		this.colModel = cm;
	},	
	setStore:function(baseUrl,configTypeId){
		  var store = new Ext.data.JsonStore({
		  	root: 'records',
		  	totalProperty: 'totalCount',
		  	idProperty: 'srId',
		  	remoteSort: true,
		  	baseParams:{start:0,limit:25,configTypeId:configTypeId,query:''},
		    fields: [
		    	{name:'srId'}, 
		    	{name:'srType'},
		      {name:'title'}, 
		      {name:'status'}, 
		      {name:'expStart'}, 
		      {name:'expComplete'},
		      {name:'apply'},
		      {name:'applytime'}
		    ],
		    proxy: new Ext.data.HttpProxy({
		        url: baseUrl+'/navigate/getNavigeList.do'
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