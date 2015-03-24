Ext.ns('Ext.ux.tree.x');
Ext.ux.tree.x.OrganizationTree = Ext.extend(Ext.tree.TreePanel,{
	region:'center',
	stripeRows: true,
	split: true,
	width: 300,
	minSize: 150,
	autoScroll: true,
	margins: '1 0 1 1',
	rootVisible: true,
	lines: true,
	singleExpand: true,
	useArrows: false,
	loadMask:true,
	title:'组织架构',
	collapsible: true,
	baseUrl:'',
	clickInfoComponents:[],
	initComponent: function(){
		this.root= new Ext.tree.AsyncTreeNode({id:'10032',text:'信息系统运营部',leaf:false});
		this.loader = new Ext.tree.TreeLoader({
			dataUrl:''
		});
		Ext.ux.tree.x.OrganizationTree.superclass.initComponent.call(this,arguments);
	},
	initEvents : function(){
		Ext.ux.tree.x.OrganizationTree.superclass.initEvents.call(this);
		this.on('beforeload',function(node){
			this.loader.dataUrl = this.baseUrl +'/organize/getAllOrgJson.do?groupId='+ node.id ; 
		});
		this.on('click',function(node,eventobj){
			Ext.each(this.clickInfoComponents,function(item,index,allItems ){
				item.notifyOrgId(node.id);
			});
		});
	}
});
