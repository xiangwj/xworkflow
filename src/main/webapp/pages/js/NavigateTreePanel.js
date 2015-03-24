Ext.ns('Ext.tree.TreePanel.x');
Ext.tree.TreePanel.x.NavigateTreePanel = Ext.extend(Ext.tree.TreePanel,{
	title:'我的待处理',
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
		Ext.tree.TreePanel.x.NavigateTreePanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.tree.TreePanel.x.NavigateTreePanel.superclass.initComponent.call(this,arguments);
		this.buildAll();
	},
	initEvents : function(){
		Ext.tree.TreePanel.x.NavigateTreePanel.superclass.initEvents.call(this);
		this.initTreeEvent(this);
	},
	notify:function(record,that){
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
			url:this.baseUrl+'/navigate/getNavigeTree.do',
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
			url:this.baseUrl+'/navigate/getNavigeTree.do',
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