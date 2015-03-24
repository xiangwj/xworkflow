Ext.ns('Ext.ux.grid.x');
Ext.ux.grid.x.StuffGridPanel = Ext.extend(Ext.grid.GridPanel,{
	region:'center',
	baseUrl:'',
	rowClickObserver:[],
	trackMouseOver:false,
	loadMask: true,
	stripeRows : true,
	constructor: function(config) {
		 this.setStore(config.baseUrl);
		 this.setColumnModel(config.baseUrl);
		 this.tbar = this.buildtbar(this.store);	
		 this.bbar = this.buildbbar(this.store,this); 
		 Ext.ux.grid.x.StuffGridPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		
		Ext.ux.grid.x.StuffGridPanel.superclass.initComponent.call(this,arguments);

	},	
	initEvents : function(){
		Ext.ux.grid.x.StuffGridPanel.superclass.initEvents.call(this);
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
	notifyOrgId:function(groupId){
		this.store.setBaseParam("groupId", groupId);
		this.store.setBaseParam("userloginId", "");
		this.store.setBaseParam("enabled", "");
		this.store.load();     
	},
	buildtbar:function(store){
		 var mySearchField = new Ext.ux.form.MySearchField({
		 			hasSearch : true,
          store: store,
          width:320,
          paramName:'userloginId',
          clearBaseParamName:['groupId','enabled']
      })
		return ['用户登录名: ', '',mySearchField];
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
			        	{dataIndex: "gender", width: 30, sortable: true, header: '',
			        		renderer:	function (val){
							        if (val == 'F') {
							            return '<span><img src="'+baseUrl+'/css/images/female.png" width="16" height="16"/></span>';
							        } else {
							            return '<span><img src="'+baseUrl+'/css/images/male.png" width="16" height="16"/></span>';
							        }
			       					return val;
		    						}	
		    				},
			        	{id:'partyId',header: "编号", width: 160, sortable: true, dataIndex: 'partyId'},
			        	{dataIndex: "userLoginId", width: 160, sortable: true, header: '登陆名'},
			        	{dataIndex: "firstName", width: 160, sortable: true, header: '姓名'},
			        	{dataIndex: "enabled", width: 160, sortable: true, header: '可用'},
			        	{dataIndex: "mobileNo", width: 160, sortable: true, header: '手机号码'},
			        	{dataIndex: "email", width: 160, sortable: true, header: 'email'},
			        	{dataIndex: "validDate", width: 160, sortable: true, header: '生效时间'},
			        	{dataIndex: "expireDate", width: 160, sortable: true, header: '失效时间'},
			        	{dataIndex: "createdStamp", width: 160, sortable: true, header: '创建时间'},
			        	{dataIndex: "updatedStamp", width: 160, sortable: true, header: '修改时间'},
			        	{dataIndex: "groups", width: 160, sortable: true, header: '所属组织'}
		      	]						
		});
		this.colModel = cm;
	},	
	setStore:function(baseUrl){
		  var store = new Ext.data.JsonStore({
		  	root: 'person',
		  	totalProperty: 'totalCount',
		  	idProperty: 'partyId',
		  	remoteSort: true,
		  	baseParams:{start:0,limit:25,groupId:'',userloginId:'',enabled:''},
		    fields: [
		    	{name:'partyId'}, 
		      {name:'userLoginId'}, 
		      {name:'firstName'}, 
		      {name:'enabled'}, 
		      {name:'mobileNo'},
		      {name:'email'},
		      {name:'validDate'},
		      {name:'expireDate'},
		      {name:'createdStamp'},
		      {name:'updatedStamp'},
		      {name:'gender'},
		      {name:'groups'},
		      {name:'grouprecords'}
		    ],
		    proxy: new Ext.data.HttpProxy({
		        url: baseUrl+'/user/getUserList.do'
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
	}	    	        		  	
});