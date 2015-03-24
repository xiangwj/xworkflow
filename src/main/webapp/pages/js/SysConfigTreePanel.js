Ext.ns('Ext.tree.TreePanel.x');
Ext.tree.TreePanel.x.SysConfigTreePanel = Ext.extend(Ext.tree.TreePanel,{
	title:'',
	baseUrl:'',
	region:'center',
	useArrows:true,
	rootVisible:false,
	newWindow:null,
	nodeClickObserver:[],
	selectedNodeId:-1,
	selectedParentNodeId:-1,
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		//this.dataUrl = this.baseUrl+'/sysConfig/getSysConfigTree.do';
		this.newWindow = config.newWindow;
		this.tbar =this.buildTbar(this);
		Ext.tree.TreePanel.x.SysConfigTreePanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.tree.TreePanel.x.SysConfigTreePanel.superclass.initComponent.call(this,arguments);
		this.buildAll();
	},
	initEvents : function(){
		Ext.tree.TreePanel.x.SysConfigTreePanel.superclass.initEvents.call(this);
		this.initTreeEvent(this);
	},
	notify:function(record,that){
	},
	buildTbar:function(that){
		return [
			{
				xtype:'form',
				baseCls:'x-plain',
				labelWidth: 80,
				labelAlign: 'right',
				items:[{
					layout:'column',
					baseCls:'x-plain',
					items:[{
						width:280,
						baseCls:'x-plain',
						layout:'form',
						items: [
								{	
									xtype:'textfield',
									name:'sysConfigTree_QueryStr',
									id:'sysConfigTree_QueryStr',
									fieldLabel:'配置名/配置描述'
								},
								{
									xtype:'panel',
									layout:'column',
									baseCls:'x-plain',
									items:
									[
										{
											xtype:'button',
											text:'查询',
											iconCls:'search',
							      	handler:function(){
							      		var queryStr=Ext.getCmp("sysConfigTree_QueryStr").getValue();
												that.getNodes(queryStr,that);

							      	}									
										},
										{
											xtype:'button',
											text:'添加',
											iconCls:'add-btn',
											handler:function(){
												var newWindow = new Ext.Window.x.NewConfigTypeWindow({
														baseUrl:that.baseUrl,
														selectedNodeId:that.selectedNodeId,
														treepanel:that
												});
												//newWindow												
												newWindow.show();
											}
										},
										{
											xtype:'button',
											text:'编辑',
											iconCls:'edit-btn',
											handler:function(){
												var editWindow = new Ext.Window.x.EditConfigTypeWindow({
														baseUrl:that.baseUrl,
														selectedNodeId:that.selectedNodeId,
														selectedParentNodeId:that.selectedParentNodeId,
														treepanel:that
												});
												if(that.selectedNodeId==-1){
													Ext.Msg.show({ title:'编辑提示',  msg:'请选择要修改的节点', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
												}else{	
													editWindow.show();
												}
											}											
										}
									]
								}							
						]
					}]
				}]
			}
		];
	},	
	buildAll:function(){
		var rootnode = new Ext.tree.TreeNode({
			id:'-1',
			text : '根节点'
		});
		this.setRootNode( rootnode);
		this.getNodes('',this);
   
	},
	initTreeEvent:function(that){
		this.on("click",function(node,e){
			that.selectedNodeId = node.id;
			that.selectedParentNodeId = node.parentNode.id;
			Ext.each(this.nodeClickObserver,function(item,index,allItems){
				item.notify(node.id,item);
			});			
		});
	},
	getNodes:function(query,that){
		Ext.Ajax.request({
			url:this.baseUrl+'/sysConfig/getSysConfigTree.do',
			params :{query:query},
			async:false,
			success: function(resp,opts){
				var resultObj = Ext.decode(resp.responseText);
				that.getRootNode().removeAll(true);
				that.getRootNode().appendChild(resultObj);
			},
			failure:function(response, opts){
				Ext.Msg.show({ title:'装载失败',  msg:'初始化树失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			}
		});		
	},
	reloadTree:function(that){
		Ext.Ajax.request({
			url:this.baseUrl+'/sysConfig/getSysConfigTree.do',
			params :{query:''},
			async:false,
			success: function(resp,opts){
				var resultObj = Ext.decode(resp.responseText);
				that.getRootNode().removeAll(true);
				that.getRootNode().appendChild(resultObj);
			},
			failure:function(response, opts){
				Ext.Msg.show({ title:'装载失败',  msg:'初始化树失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			}
		});		
	},
		addClickObserver:function(clickObserver){
		if(this.nodeClickObserver.indexOf(clickObserver)==-1){
				this.nodeClickObserver.push(clickObserver);
		}
	},
	removeClickObserver:function(clickObserver){
		this.nodeClickObserver.remove(clickObserver);
	},
	firstClick:function(nodeid){
			Ext.each(this.nodeClickObserver,function(item,index,allItems){
				item.notify(nodeid,item);
			});		
	}
});