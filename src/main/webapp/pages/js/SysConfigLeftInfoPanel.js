Ext.ns('Ext.ux.Panel.x');
Ext.ux.Panel.x.SysConfigLeftInfoPanel = Ext.extend(Ext.FormPanel,{
	title:'用户岗位',
	baseUrl:'',
	layout:'border',
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		Ext.ux.Panel.x.SysConfigLeftInfoPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.Panel.x.SysConfigLeftInfoPanel.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	initEvents : function(){
		Ext.ux.Panel.x.SysConfigLeftInfoPanel.superclass.initEvents.call(this);
	},
	notify:function(record,that){
	},	
	buildAll:function(that){
		/*系统配置根节点*/
    var sysConfigRoot = new Ext.tree.TreeNode({    
			text: '根节点',    
			expanded: true
			    
    });
    var sysConfigTree = new Ext.tree.TreePanel({
			region:"center",
			useArrows:true,
			rootVisible:false,
			tbar:
			[
				'配置名/配置ID',
				{xtype:'textfield',name:'sysConfigTree_QueryStr',id:'sysConfigTree_QueryStr'},
	      {
	      	xtype:'button',
	      	text:'查询',
	      	iconCls:'search',
	      	handler:function(){
	      		var queryStr=Ext.getCmp("sysConfigTree_QueryStr").getValue();
						var nodes = {};    
						Ext.Ajax.request({
					    	url: that.baseUrl+'/sysConfig/getSysConfigTree.do',
					    	params:{query:queryStr},
					    	success:function(response, opts){
					    		sysConfigRoot.removeAll(true);
							    var nodes = {};    
							    nodes.children =Ext.decode(response.responseText);
							    that.appendSysConfigTreeChild(sysConfigRoot, nodes,that);     		
					    	},
						   	failure: function(response, opts) {
						      alert('加载失败');
						   	}
						});	  		
	      	}
	      }				
			]
  	});
  	sysConfigTree.setRootNode(sysConfigRoot);
  	
    Ext.Ajax.request({
    	url: that.baseUrl+'/sysConfig/getSysConfigTree.do',
    	params:{query:''},
    	success:function(response, opts){
		    var nodes = {};
		    nodes.children =Ext.decode(response.responseText);
		    that.appendSysConfigTreeChild(sysConfigRoot, nodes,that);     		
    	},
	   	failure: function(response, opts) {
	      alert('加载失败');
	   	}
		});
		that.add(sysConfigTree);  									
	},
	appendSysConfigTreeChild:function(node, o,that){
	  if (o.children != null && o.children.length > 0) {    
	      for (var a = 0; a < o.children.length; a++) { 
	          var n = new Ext.tree.TreeNode({    
	              text:o.children[a].configTypeName,
	              id:o.children[a].configTypeId,
	              leaf:o.children[a].leaf,
	              configTypeId:o.children[a].configTypeId, 
	              configTypeName:o.children[a].configTypeName,    
	              configTypeDesc:o.children[a].configTypeDesc,    
	              createdStamp:o.children[a].createdStamp,
	              updatedStamp:o.children[a].updatedStamp,
	              iconCls:o.children[a].iconCls    
	          });    
	          node.appendChild(n);    
	          that.appendSysConfigTreeChild(n, o.children[a],that);    
	      }    
	  }  		
	}				
});