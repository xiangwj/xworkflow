Ext.ns('Ext.Window.x');
Ext.Window.x.NewConfigTypeWindow = Ext.extend(Ext.Window,{
	title: '配置添加',
	closable:true,
	width:350,
	height:200,
	closeAction:'close',
	layout: 'border',	
	baseUrl:'',
	comboxWithTree:null,
	selectedNodeId:-1,
	newPanel:null,
	triggerStatus:1,
	treepanel:null,
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		this.selectedNodeId = config.selectedNodeId;
		this.treepanel=config.treepanel;
		Ext.Window.x.NewConfigTypeWindow.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.Window.x.NewConfigTypeWindow.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	initEvents : function(){
		Ext.Window.x.NewConfigTypeWindow.superclass.initEvents.call(this);
		this.initwindow(this);
	},
	buildAll:function(that){
			var comboxWithTree = new Ext.form.TreeField({
				fieldLabel:'父配置',
				rootVisible:true,
				hiddenName:'parentTypeId',
				id:'parentTypeName',
				displayField : 'text',
				valueField: 'id',
				emptyText:'请选择父节点...',  
				listWidth:300, 
				listHeight:200,  
				readOnly:false,
				dataUrl:that.baseUrl+'/sysConfig/getSysConfigTreeByNodeId.do',  
				allowBlank : false, 
				blankText    :'请选择父节点',
  			treeRootConfig : {      
        	id : '-1',      
        	text : 'root',      
        	draggable:false     
  			},				   
        listeners:{   
            select:{   
                fn: function(cob){   
                    var rvtext = cob.getRawValue();   
                    var rvid = cob.getValue();   
                    if(rvid.length!=0){   
                        newPanel.getForm().findField("parentTypeName").setRawValue(rvtext);
                    }   
                }   
            }
        }			
			});
			that.comboxWithTree=comboxWithTree;

		var newPanel = new Ext.FormPanel({
			  region:'center',
        labelWidth: 75,
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},        
        bodyStyle:'padding:5px 5px 0',
        defaultType: 'textfield',
        labelAlign : 'right',
				items: 
				[
					{id:'newConfigName',name:'newConfigName',type:'textfield',fieldLabel:'配置名',anchor:'97.5%'},
					{id:'newConfigDesc',name:'newConfigDesc',type:'textfield',fieldLabel:'配置描述',anchor:'97.5%'},		
					comboxWithTree 
				],
				buttons:[
					{
		    		iconCls: 'ok',
		    		text: '保存',
		    		handler:function(b,e){
		    			that.newConfigType(that);
		    		}
    			},
					{
		    		iconCls: 'cancel',
		    		text: '取消',
		    		handler:function(b,e){
		    			that.close();
		    		}
    			}    			
				]			
		});
		that.add(newPanel);
		that.newPanel = newPanel;
	},
	initwindow:function(that){
		this.comboxWithTree.tree.expandAll();
		this.comboxWithTree.tree.on("expandnode",function(node){
			if(node.id==that.selectedNodeId){
				that.comboxWithTree.select(node);	
			}
		});					
	},
	selectNode:function(){
		var node = this.comboxWithTree.tree.getNodeById(this.selectedNodeId);
		this.comboxWithTree.select(node);	 
	},
	notifyclick:function(id){
		this.selectedNodeId = id;
	},
	newConfigType:function(that){
		if(that.newPanel.getForm().findField("newConfigName").getValue().trim()==''){
			Ext.Msg.show({ title:'新建失败',  msg:'配置名不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("newConfigDesc").getValue().trim()==''){
			Ext.Msg.show({ title:'新建失败',  msg:'配置描述不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}

		Ext.Ajax.request({
			url:this.baseUrl+'/sysConfig/createConfigType.do',
			params:{
				newConfigName:that.newPanel.getForm().findField("newConfigName").getValue().trim(),
				newConfigDesc:that.newPanel.getForm().findField("newConfigDesc").getValue().trim(),
				parentTypeId:that.newPanel.getForm().findField("parentTypeName").getValue()
			},
			success: function(resp,opts){
				var resultObj = Ext.decode(resp.responseText);
			
				if(resultObj.returncode=='0'){
					Ext.Msg.show({ title:'新建成功',  msg:'配置新建成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
					that.treepanel.reloadTree(that.treepanel);
					that.close();
				}else{
					Ext.Msg.show({ title:'新建失败',  msg:'配置新建失败:\n'+resultObj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
				}
			},
			failure:function(response, opts){
				Ext.Msg.show({ title:'新建失败',  msg:'配置新建失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			}
		});			
	}
				
});
