Ext.ns('Ext.Window.x');
Ext.Window.x.NewConfigItemWindow = Ext.extend(Ext.Window,{
	title: '配置项添加',
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
	constructor: function(config) {
		this.baseUrl = config.baseUrl;
		this.selectedNodeId = config.selectedNodeId;
		this.gridpanel=config.gridpanel;
		Ext.Window.x.NewConfigItemWindow.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.Window.x.NewConfigItemWindow.superclass.initComponent.call(this,arguments);
		this.buildAll(this);
	},
	initEvents : function(){
		Ext.Window.x.NewConfigItemWindow.superclass.initEvents.call(this);
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
					{id:'configItemName',name:'configItemName',type:'textfield',fieldLabel:'配置项名',anchor:'97.5%'},
					{id:'configItemDesc',name:'configItemDesc',type:'textfield',fieldLabel:'配置项描述',anchor:'97.5%'},
					{id:'value',name:'value',type:'textfield',fieldLabel:'配置项值',anchor:'97.5%'},
					{id:'code',name:'code',type:'textfield',fieldLabel:'配置项区分代码',anchor:'97.5%'},		
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
				  	anchor:'97.5%'
			  	},
					{id:'ext1',name:'ext1',type:'textfield',fieldLabel:'扩展值',anchor:'97.5%'},
					comboxWithTree 
				],
				buttons:[
					{
		    		iconCls: 'ok',
		    		text: '保存',
		    		handler:function(b,e){
		    			that.newConfigItem(that);
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
	newConfigItem:function(that){
		if(that.newPanel.getForm().findField("configItemName").getValue().trim()==''){
			Ext.Msg.show({ title:'新建失败',  msg:'配置名不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}
		if(that.newPanel.getForm().findField("configItemDesc").getValue().trim()==''){
			Ext.Msg.show({ title:'新建失败',  msg:'配置描述不得为空', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			return;
		}

		Ext.Ajax.request({
			url:this.baseUrl+'/sysConfig/createConfigItem.do',
			params:{
				configItemName:that.newPanel.getForm().findField("configItemName").getValue().trim(),
				configItemDesc:that.newPanel.getForm().findField("configItemDesc").getValue().trim(),
				value:that.newPanel.getForm().findField("value").getValue().trim(),
				code:that.newPanel.getForm().findField("value").getValue().trim(),
				enabled:that.newPanel.getForm().findField("enabled").getValue(),
				ext1:that.newPanel.getForm().findField("ext1").getValue(),
				configTypeId:that.newPanel.getForm().findField("parentTypeName").getValue()
			},
			success: function(resp,opts){
				var resultObj = Ext.decode(resp.responseText);
			
				if(resultObj.returncode=='0'){
					that.gridpanel.reload();
					Ext.Msg.show({ title:'新建成功',  msg:'配置项新建成功', buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
					that.close();
				}else{
					Ext.Msg.show({ title:'新建失败',  msg:'配置项新建失败:\n'+resultObj.message, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
				}
			},
			failure:function(response, opts){
				Ext.Msg.show({ title:'新建失败',  msg:'配置项新建失败', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
			}
		});			
	}
				
});
