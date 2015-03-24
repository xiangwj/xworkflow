Ext.ns('Ext.Window.x');
Ext.Window.x.EditConfigItemWindow = Ext.extend(Ext.Window,{
	title: '配置项编辑',
	closable:true,
	width:350,
	height:300,
	closeAction:'close',
	layout: 'border',	
	baseUrl:'',
	comboxWithTree:null,
	selectedNodeId:-1,
	newPanel:null,
	triggerStatus:1,
	gridpanel:null,
	
	configTypeId:-1,
	configItemId:-1,
	configItemName:'',
	configItemDesc:'',
	configItemValue:'',
	configCode:'',
	configEnabled:'',
	configExt1:'',
	
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		this.selectedNodeId = config.selectedNodeId;
		this.gridpanel=config.gridpanel;
		
		this.configTypeId=config.configTypeId;
		this.configItemId = config.configItemId;
		this.configItemName = config.configItemName;
		this.configItemDesc = config.configItemDesc;
		this.configItemValue = config.configItemValue;
		this.configEnabled = config.configEnabled;
		this.configExt1 = config.configExt1;
		this.configCode = config.configCode;
		Ext.Window.x.EditConfigItemWindow.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.Window.x.EditConfigItemWindow.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	initEvents : function(){
		Ext.Window.x.EditConfigItemWindow.superclass.initEvents.call(this);
		this.initwindow(this);
	},
	buildAll:function(that){
			var comboxWithTree = new Ext.form.TreeField({
				fieldLabel:'配置类',
				rootVisible:true,
				hiddenName:'parentTypeId',
				id:'parentTypeName',
				displayField : 'text',
				valueField: 'id',
				emptyText:'请选择配置类...',  
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
					{id:'configItemName',name:'configItemName',type:'textfield',fieldLabel:'配置项名',anchor:'97.5%',value:that.configItemName},
					{id:'configItemDesc',name:'configItemDesc',type:'textfield',fieldLabel:'配置项描述',anchor:'97.5%',value:that.configItemDesc},
					{id:'value',name:'value',type:'textfield',fieldLabel:'配置项值',anchor:'97.5%',value:that.configItemValue},
					{id:'code',name:'code',type:'textfield',fieldLabel:'配置项区分代码',anchor:'97.5%',value:that.configCode},		
          {
				  	xtype:'combo',
				  	fieldLabel:'是否可用*',
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    allowBlank:false,
				    name:'enabled',
				    hiddenName:'enabled',
				  	store:new Ext.data.ArrayStore({
				  			id:'Y',
				  			fields:['id','text'],
				  			data: [['Y', '可用'], ['N', '不可用']]
				  	}),
				  	valueField: 'id',
				  	displayField: 'text',
				  	anchor:'97.5%',
				  	value:that.configEnabled
			  	},
					{id:'ext1',name:'ext1',type:'textfield',fieldLabel:'扩展值',anchor:'97.5%',value:that.configExt1},
					comboxWithTree 
				],
				buttons:[
					{
		    		iconCls: 'ok',
		    		text: '保存',
		    		handler:function(b,e){
		    			that.updateConfigItem(that);
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
	updateConfigItem:function(that){
		if(that.newPanel.getForm().findField("configItemName").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'配置名不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("configItemDesc").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'配置描述不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("value").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'配置项值不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("code").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'配置项区分代码不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("enabled").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'是否可用不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("ext1").getValue().trim()==''){
			Ext.Msg.show({ title:'更新失败',  msg:'扩展值用不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}						
		Ext.Ajax.request({
			url:this.baseUrl+'/sysConfig/updateConfigItem.do',
			params:{
				id:that.configItemId,
				configItemName:that.newPanel.getForm().findField("configItemName").getValue().trim(),
				configItemDesc:that.newPanel.getForm().findField("configItemDesc").getValue().trim(),
				value:that.newPanel.getForm().findField("value").getValue().trim(),
				code:that.newPanel.getForm().findField("code").getValue().trim(),
				enabled:that.newPanel.getForm().findField("enabled").getValue(),
				ext1:that.newPanel.getForm().findField("ext1").getValue(),
				configTypeId:that.newPanel.getForm().findField("parentTypeName").getValue()
			},
			success: function(resp,opts){
				var resultObj = Ext.decode(resp.responseText);
			
				if(resultObj.returncode=='0'){
					that.gridpanel.reload();
					Ext.Msg.show({ title:'更新成功',  msg:'配置项更新成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
					that.close();
				}else{
					Ext.Msg.show({ title:'更新失败',  msg:'配置项更新失败:\n'+resultObj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
				}
			},
			failure:function(response, opts){
				Ext.Msg.show({ title:'新建失败',  msg:'配置项新建失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			}
		});			
	}
				
});
