Ext.ns('Ext.ux.form.x');
Ext.ux.form.x.UserDetailInfoPanel = Ext.extend(Ext.FormPanel,{
	l_tree:{},
	assignedPartyGrid:{},
	baseUrl:'',
	autoHeight:true,
	build_assignedPartyGrid:function(baseUrl){
		var assignedParyStrore =  new Ext.data.JsonStore({
			root:'departments',
			fields:['orgId','orgName']				
		});
		var assignedParyStrore =  new Ext.data.JsonStore({
			root:'departments',
			fields:['orgId','orgName']				
		});
		var assignedPartyGrid = new Ext.grid.GridPanel({
			title:'已选组织',	 	
			store: assignedParyStrore,
			frame:true,
			autoScroll:true,
			autoFill:true,
			name:'assignedParyGroup',
			columns:[
								{
				        	header:'操作',
				        	id:'ope',
	                xtype: 'actioncolumn',
	                width: 50,
				          items: 
				                [
					                {
					                    icon   : baseUrl+'/css/images/delete.gif', 
					                    tooltip: '删除',
					                    handler: function(grid, rowIndex, colIndex) 
					                    {
					                       grid.store.removeAt(rowIndex);
					                    }
				                	}
				                ]
				        },	        
				        {
	                id       :'orgId',
	                header   : '组织编号', 
	                width    : 100, 
	                sortable : true, 
	                dataIndex: 'orgId'
				        },
				        {
	                id			 :'orgName',
	                header   : '组织名称', 
	                width    : 200, 
	                sortable : true, 
	                dataIndex: 'orgName'
				        }
				      ],
        stripeRows: true,
        autoExpandColumn: 'orgName',
        height:115,
        autoHeight: false,
        anchor:'95%',
        stateful: true
		});
		this.assignedPartyGrid = assignedPartyGrid;						
	},
	build_tree:function(baseUrl,assignedPartyGrid){
		var l_tree = new Ext.tree.TreePanel({
			anchor:'95%', 
			frame:true,
			height:115,
			title:'待选组织',
			autoScroll: true,
			rootVisible: false,
			root: new Ext.tree.AsyncTreeNode({id:'10032',text:'信息系统运营部',leaf:false}),
			listeners:
	      {
	        'beforeload': function(node, checked)
	         {
							this.loader.dataUrl = baseUrl+'/organize/getAllOrgJson.do?groupId=' + node.id ; 
	         },
	         'dblclick':function(node, e)
	         {
	         		for(var i=0;i<assignedPartyGrid.store.data.length;i++){
	         			if(assignedPartyGrid.store.getAt(i).data.orgId==node.id){
	         				alert('不能重复添加组织:'+node.text);
	         				return;
	         			}
	         		}
	         		var newrow = new Ext.data.Record();
	         		newrow.data.orgId=node.id;
	         		newrow.data.orgName=node.text;
	         		var records = new Array();
	         		records.push(newrow);
	         		assignedPartyGrid.store.add(records);
							assignedPartyGrid.getView().focusRow(assignedPartyGrid.store.data.length-1);
	         }							      	
	      }				
		});
		this.l_tree = l_tree;						
	}, 
	constructor: function(config) {
		this.build_assignedPartyGrid(config.baseUrl);
		this.build_tree(config.baseUrl,this.assignedPartyGrid);
		this.build_button(this,config.baseUrl);
		Ext.ux.form.x.UserDetailInfoPanel.superclass.constructor.call(this, config);
	},
	initComponent: function(){
		Ext.ux.form.x.UserDetailInfoPanel.superclass.initComponent.call(this,arguments);
		this.addformitem();
	},	
	initEvents : function(){
		Ext.ux.form.x.UserDetailInfoPanel.superclass.initEvents.call(this);
	},		        
	labelAlign: 'right',
	frame:true,
	title: '用户资料',
	bodyStyle:'padding:0 0 0 0 ',
	width: 600,
  buttonAlign:'center',
 	listeners:{
		'beforeaction':function(_form,_action){
			return this.beforesubmit(_form,_action);
		}
	},		
	mysubmitform:function(url){
	  	var operation = "";
	  	if(this.getForm().findField("editmode").getValue().trim()=='newrecord')
	  		operation = '新建';
	  	if(this.getForm().findField("editmode").getValue().trim()=='editrecord')
	  		operation = '更新';
	  	if(this.getForm().findField("editmode").getValue().trim()=='delrecord')
	  		operation = '删除';	  		
	  	var _param = new Object();
  		var groups = new Array();
  		this.getForm().findField("partyId").setValue(this.getForm().findField("dpartyId").getValue().trim());
			var assignedGroup = new Array();
			
  		this.assignedPartyGrid.store.each(function(record){
	  		assignedGroup.push(record.data.orgId);
	  	});
	  	_param.assignedGroup = assignedGroup;
	  	Ext.MessageBox.buttonText.ok='确定'; 
	  	this.getForm().submit({
	  		url:url,
	  		params:_param,
	  		method:'POST',
				success:function(form,action){
					debugger;
					Ext.Msg.show({ title:operation+'成功',  msg:action.result.msg, buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
					form.findField("editmode").setValue("editrecord");
					form.findField("dpartyId").setValue(action.result.pk);
					form.findField("partyId").setValue(action.result.pk);
				},
		    failure: function(form, action) {
		        switch (action.failureType) {
		            case Ext.form.Action.CLIENT_INVALID:
		            		Ext.Msg.show({ title:operation+'失败',  msg:'Form fields may not be submitted with invalid values', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
		                break;
		            case Ext.form.Action.CONNECT_FAILURE:
		            		Ext.Msg.show({ title:operation+'失败',  msg:'Ajax communication failed', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
		                break;
		            case Ext.form.Action.SERVER_INVALID:
		            	 Ext.Msg.show({ title:operation+'失败',  msg:action.result.msg, buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
		       }
		    }
	  	});		
	},
	beforesubmit:function(_form,_action){
	  	Ext.MessageBox.buttonText.ok='确定'; 
	  	var title;
	  	if(_form.findField("editmode")=='newrecord')
	  		title = '新建用户';
	  	if(_form.findField("editmode")=='editrecord')
	  		title = '编辑用户';

	  	if(_action.type=='submit'){
		  	if(_form.findField("editmode").getValue()!='newrecord'){
	  			if(_form.findField("partyId").getValue()==''){
	  				Ext.Msg.alert(title,'请选择用户记录！');
	  				return false;
	  			}
	  		}
	  		if(_form.findField("userLoginId").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【用户名】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("userLoginId").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("firstName").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【姓名】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("firstName").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("mobileNo").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【手机号码】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("mobileNo").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("email").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【email】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("email").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("validDate").getRawValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【生效日期】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("validDate").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("expireDate").getRawValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【失效日期】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("expireDate").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("gender").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【性别】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("gender").focus(true);
		  			return false;
	  		}
	  		if(_form.findField("enabled").getValue().trim()==''){
					Ext.Msg.show({ title:title,  msg: '【有效】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		_form.findField("enabled").focus(true);
		  			return false;
	  		}
	  		if(this.assignedPartyGrid.store.data.length<=0){
					Ext.Msg.show({ title:title,  msg: '【已选组织】不得为空！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  			return false;
	  		}
	  		var dt = new Date();
	  		var tn = dt.format('Y-m-d H:i:s');
	  		var v_valid_date = _form.findField("validDate").getRawValue().trim();
	  		var v_expire_date = _form.findField("expireDate").getRawValue().trim();
	  		if(_form.findField("editmode")=='newrecord'){
		  		if(v_valid_date<tn){
						Ext.Msg.show({ title:title,  msg: '【生效时间】不得小于当前时间！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
			  		return false;
		  		}
	  		}
	  		if(v_expire_date<v_valid_date){
					Ext.Msg.show({ title:title,  msg: '【失效时间】不得小于【生效时间】！', buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});	  			
		  		return false;
	  		}	  				  				  			  			  			  		
	  		return true;
	  }
	  	return true;
		
	},
	newrecord:function(){
	  	this.clearform();
	  	this.getForm().findField("editmode").setValue("newrecord");
	},
	clearform:function(){
	  	this.getForm().findField("editmode").setValue("newrecord");
	  	this.assignedPartyGrid.store.removeAll();
	  	this.getForm().items.each(function(item,index,length){
	  		item.setValue("");
	  	});
	},
	submitform:function(){
	  	this.getForm().submit();
	},
	addformitem:function(){
		var cg00 = new Ext.Panel({
      	columnWidth:1.0,
        layout: 'form',
        items: 
          [
						{
							xtype:'hidden',
							name:'editmode',
							value:'newrecord'
						},
						{
							xtype:'hidden',
							name:'partyId',
							value:''
						},											
            {
                labelStyle: 'font-weight:bold;font-color:red',
                xtype:'displayfield',
                fieldLabel: '用户唯一编号*',
                name: 'dpartyId',
                submitValue:true,
                anchor:'97.5%'
            }
          ]
		});
		var cg10 = new Ext.Panel({
    	columnWidth:.5,
    	layout: 'form',
      items:
        [
          {
              labelStyle: 'font-weight:bold;',
              xtype:'textfield',
              fieldLabel: '用户名*',
              name: 'userLoginId',
              allowBlank:false,
              anchor:'95%'
          },
          {
         			labelStyle: 'font-weight:bold;', 	
              xtype:'textfield',
              fieldLabel: '手机号码*',
              allowBlank:false,
              name: 'mobileNo',
              anchor:'95%'
          },
          {
          		labelStyle: 'font-weight:bold;',
              xtype:'datefield',
              format:'Y-m-d H:i:s',
              fieldLabel: '生效时间*',
              allowBlank:false,
              name: 'validDate',
              anchor:'95%'
          },
          {
				  	labelStyle: 'font-weight:bold;',
				  	xtype:'combo',
				  	fieldLabel:'性别*',
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    allowBlank:false,
				    name:'gender',
				    hiddenName:'gender',
				  	labelStyle: 'font-weight:bold;',
				  	store:new Ext.data.ArrayStore({
				  			id:'Y',
				  			fields:['id','text'],
				  			data: [['F', '女'], ['M', '男']]
				  	}),
				  	valueField: 'id',
				  	displayField: 'text',
				  	anchor:'95%'
			  	}

			  ]
		});		
		var cg11 = new Ext.Panel({
    	columnWidth:.5,
      layout: 'form',
      items: 
        [
          {
              labelStyle: 'font-weight:bold;',
              xtype:'textfield',
              fieldLabel: '姓名*',
              allowBlank:false,
              name: 'firstName',
              anchor:'95%'
          },
          {
              labelStyle: 'font-weight:bold;',
              xtype:'textfield',
              fieldLabel: 'email*',
              allowBlank:false,
              name: 'email',
              vtype:'email',
              anchor:'95%'
          },
          {
              labelStyle: 'font-weight:bold;',
              xtype:'datefield',
              fieldLabel: '失效时间*',
              allowBlank:false,
              name: 'expireDate',
              format:'Y-m-d H:i:s',			                    
              anchor:'95%'
          },
          {
				  	labelStyle: 'font-weight:bold;',
				  	xtype:'combo',
				  	fieldLabel:'有效*',
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    allowBlank:false,
				    name:'enabled',
				    hiddenName:'enabled',
				  	labelStyle: 'font-weight:bold;',
				  	store:new Ext.data.ArrayStore({
				  			id:'Y',
				  			fields:['id','text'],
				  			data: [['Y', '是'], ['N', '否']]
				  	}),
				  	valueField: 'id',
				  	displayField: 'text',
				  	anchor:'95%'
			  	}
		  ]
		});
    var cg20 = new Ext.Panel({
    	  columnWidth:.5,
        layout: 'fit',
        items:
        [
					this.l_tree
        ] 
    });
    var cg21 = new Ext.Panel({
    	  columnWidth:.5,
        layout: 'fit',
       	items:
        [
         this.assignedPartyGrid 
        ] 
    })				
		var fieldset01 = new Ext.form.FieldSet({
			collapsible: false,
			layout : 'column',
			anchor : '-20',
			autoHeight:false,
			title: '',
			collapsed: false,
			items :[cg00,cg10,cg11,cg20,cg21]
			
		});
		this.add(fieldset01);	
		this.doLayout();			
	},
	build_button:function(that,baseUrl){
    this.buttons=[{
    	iconCls: 'add-btn',
    	text: '新建',
    	handler:function(b,e){
    		that.newrecord();
    	}
  	},
    {
      iconCls: 'cls-btn',
      text: '清空',
    	handler:function(b,e){
    		that.clearform();
    	}      
    },        
    {
      iconCls: 'save-btn',
      text: '保存',
      handler: function(b,e){
      	that.mysubmitform(baseUrl+'/user/updateUser.do');
      }
    }];		
	},	
	notify:function(record,form){
		Ext.Ajax.request({
			url:this.baseUrl+'/user/getUserByParyId.do',
      params:{partyId:record.data.partyId}, 			
      success: function(resp,opts){
      	var jsonUser = Ext.decode(resp.responseText);
      	form.getForm().findField("editmode").setValue("editrecord");
      	form.getForm().findField("dpartyId").setValue(jsonUser.id);
      	form.getForm().findField("partyId").setValue(jsonUser.id);
  			form.getForm().findField("userLoginId").setValue(jsonUser.userLoginId);
  			form.getForm().findField("firstName").setValue(jsonUser.firstName);
  			form.getForm().findField("mobileNo").setValue(jsonUser.mobileNo);
  			form.getForm().findField("email").setValue(jsonUser.email);
  			form.getForm().findField("validDate").setValue(jsonUser.validDate);
  			form.getForm().findField("expireDate").setValue(jsonUser.expireDate);
  			form.getForm().findField("gender").setValue(jsonUser.gender);
  			form.getForm().findField("enabled").setValue(jsonUser.enabled);
  			form.assignedPartyGrid.store.removeAll();
  			var newrow ;
  			var records = new Array();
				Ext.each(jsonUser.grouprecords,function(item,index,allItems){
       		newrow = new Ext.data.Record();
       		newrow.data.orgId=item.partyId;
       		newrow.data.orgName=item.groupName;;
       		records.push(newrow);	      			
				});
				if(records.length>0)
					form.assignedPartyGrid.store.add(records);
      }
		});
		
	}				
});