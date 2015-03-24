// extjs ��չ����


// ��ȡ���ύ��ķ���
Ext.form.XmlErrorReader = function() {
    Ext.form.XmlErrorReader.superclass.constructor.call(this, {
            record : 'field',
            success: '@success'
        }, [
            'id', 'msg'
        ]
    );
};
Ext.extend(Ext.form.XmlErrorReader, Ext.data.XmlReader);

// ��ʱ���󣬿�����
Ext.util.TempObject =  function(){ }

function closeDlg()
{
	this.destroy(true);
}

var window_upload = null;

function uploadFile(cb, sc)
{
	var form = new Ext.form.FormPanel({
		baseCls: 'x-plain',
		method: 'POST',
		fileUpload: true,
		defaultType: 'textfield',
		errorReader: new Ext.form.XmlErrorReader(),
		labelWidth: 75, // label settings here cascade unless overridden
		labelAlign: 'top',
		url:sc.uploadUrl,
		items:[new Ext.form.TextField({
			fieldLabel: '��ѡ���ļ�',
			name: 'first',
			inputType: 'file',
			width:175,
			allowBlank:false
		})]
	});

	if (window_upload)
		window_upload.close();
    window_upload = new Ext.Window({
        title: '�ϴ��ļ�',
		width:250,
		height:120,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: form,

        buttons: [{
            text: 'ȷ��',
            handler: function() {
				var form = window_upload._form.form;
				if (!form.isValid()) {
					Ext.MessageBox.alert("��ʾ", "��ѡ���ϴ��ļ�");
					return;
				}
				form.submit({
					waitMsg: '�����ϴ�....',
					success: function(form, action)
					{
						if (window_upload._cb)
							window_upload._cb(window_upload._sc, form.errorReader.xmlData.documentElement.text);
						if (window_upload) {
							window_upload.hide();
							window_upload = null;
						}
					},
					failure: function(form, action)
					{
						Ext.MessageBox.alert("�ϴ�ʧ��", form.errorReader.xmlData.documentElement.text);
					}
				});
            }
        },{
            text: 'ȡ��',
            handler: function() {
               window_upload.close();
			   window_upload = null;
            }
        }]
    });
	window_upload._form = form;
	window_upload._cb = cb;
	window_upload._sc = sc;

    window_upload.show();
}


//////////////////////////////////////////////////////////////Ext.form.UploadField//////////////////////////////

Ext.form.UploadField = function(config){
    Ext.form.UploadField.superclass.constructor.call(this, config);
};

Ext.extend(Ext.form.UploadField, Ext.form.TwinTriggerField,  {
    /**
     * @cfg {String} triggerClass A CSS class to apply to the trigger
     */
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "16", autocomplete: "off"})
     */
    //defaultAutoCreate : {tag: "input", type: "hidden", size: "16", autocomplete: "off"},
    /**
     * @cfg {Boolean} hideTrigger True to hide the trigger element and display only the base text field (defaults to false)
     */
    hideTrigger:false,
    hideTriggers:[true,false],

    /** @cfg {Boolean} grow @hide */
    /** @cfg {Number} growMin @hide */
    /** @cfg {Number} growMax @hide */

    /**
     * @hide
     * @method
     */
    autoSize: Ext.emptyFn,
    // private
    monitorTab : true,
    // private
    deferHeight : true,

    maxHeight:150,
    trigger2Class:'x-form-download-trigger',
    trigger1Class:'x-form-upload-trigger',
    // private
    onResize : function(w, h){
        Ext.form.UploadField.superclass.onResize.apply(this, arguments);
        if(typeof w == 'number'){
            this.el.setWidth(this.adjustWidth('input', w - this.trigger.getWidth()));
        }
    },

    // private
    adjustSize : Ext.BoxComponent.prototype.adjustSize,

    // private
    getResizeEl : function(){
        return this.wrap;
    },

	// private
	getPositionEl : function() {
		return this.wrap;
	},

	// private
	alignErrorIcon : function() {
		this.errorIcon.alignTo(this.wrap, 'tl-tr', [ 2, 0 ]);
	},
	// private
	onRender : function(ct, position) {
		Ext.form.UploadField.superclass.onRender.call(this, ct,
				position);

		var hiddenName = this.hiddenName ? this.hiddenName
				: this.name;
		var hiddenId = (this.hiddenId | this.hiddenName) ? (this.hiddenId | this.hiddenName)
				: (this.id || this.name);
		this.hiddenField = this.el.insertSibling({
			tag : 'input',
			type : 'hidden',
			name : hiddenName,
			id : hiddenId
		}, 'before', true);
		this.hiddenField.value = this.hiddenValue !== undefined ? this.hiddenValue
				: this.value !== undefined ? this.value : '';
		// prevent input submission
		this.el.dom.removeAttribute('name');

		var cls = 'x-combo-list';
		this.list = new Ext.Layer({
			shadow : this.shadow,
			cls : [ cls, this.listClass ].join(' '),
			constrain : false
		});
		

		var lw = this.listWidth
				|| Math.max(this.wrap.getWidth(), 20);
		this.list.setWidth(lw);
		this.list.swallowEvent('mousewheel');
		this.list.dom.style.overflow = 'auto';
		this.view = new Ext.Panel({
			el : this.list,
			animate : false,
			autoHeight : true
		});
		this.fileList = this.view.getEl();// this.wrap.createChild({tag:
											// "div"});

		if (this.hideTrigger) {
			this.trigger.setDisplayed(false);
		}
		// this.initTrigger();
		if (!this.width) {
			this.wrap.setWidth(this.el.getWidth()
					+ this.trigger.getWidth());
		}
		this.renderFiles();
		this.el.dom.setAttribute('readOnly', true);
		this.el.on('mousedown', function() {
			if (this.files && this.files.length > 0 || this.readOnly)
				this.onTrigger2Click();
			else
				this.onTrigger1Click();
		}, this);
		this.el.addClass('x-combo-noedit');
	},

	setReadOnly : function(r) {
		Ext.form.UploadField.superclass.setReadOnly.call(this,r);
		this.renderFiles();
	},
	removeFile : function(i) {
		var n = this.files.length;
		for (var j = i; j < n - 1; j++)
			this.files[j] = this.files[j + 1];
		this.files.length = n - 1;
		this.renderFiles();
		this.calcValue();
	},
	

	onDisable : function() {
		Ext.form.UploadField.superclass.onDisable.call(this);
		this.triggers[0].hide();
	},

	onEnable : function() {
		Ext.form.UploadField.superclass.onEnable.call(this);
		this.triggers[0].show();
	},

	calcValue : function() {
		var v = "";
		var vv = "";
		for (var i = 0; i < this.files.length; i++) {
			if (i > 0) {
				v += ";";
				vv += ";";
			}
			v += this.files[i][0];
			vv += this.files[i][1];
		}
		this.hiddenField.value = vv;
    Ext.form.UploadField.superclass.setValue.call(this, v);
	},

	getValue :function () {
		if (this.hiddenField && this.hiddenField.value)
			return this.hiddenField.value;
		else
      return Ext.form.UploadField.superclass.getValue.call(this);
	},
	setValue : function(v) {
		v = "" + v;
		var s = v.split(";");
		this.files = new Array();
		var index = 0;
		for (var i = 0; i < s.length; i++) {
			if (s[i]!=null && s[i] != ""){
			var fn = this.getFileName(s[i]);
			this.files[index] = [fn, s[i]];
			index++;
		}
		}
		this.renderFiles();
		this.calcValue();
	},

	getFileName : function(t) {
		var t0 = t;
		pos = t.lastIndexOf("\\");
		if (pos == -1)
			pos = t.lastIndexOf("/");
		if (pos != -1)
			t0 = t.substring(pos + 1);
		return t0;
	},

	renderFiles : function(fa) {
		if (!this.fileList)
			return;
		if (!this.files)
			return;
		this.fileList.dom.innerHTML = "";
		for (var i = 0; i < this.files.length; i++)
		{
			if (i > 0)
				this.fileList.createChild({tag: "br"});
			
			if (this.readOnly && this.readOnly === true)
				;
			else {
				var p = this.fileList.createChild({tag: "img", src: "../images/delete.gif",
					style: "cursor:hand;vertical-align:text-bottom"});
				p._id = i;
				p._obj = this;
				p.on("click", function() { this._obj.removeFile(this._id); }, p);
			}
			this.fileList.createChild({tag: "span"}).dom.innerText = " ";
			var fileName_ = this.files[i][0];
			var filePath_ = this.files[i][1];
			//if (fileName_.length>20)
			//	fileName_ = fileName_.substring(0,20)+"...";
			var reg = /\(\d+\)\./;
			var upTimeReg = /\(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)$/
			fileName_ = fileName_.replace(reg,".");
			filePath_ = filePath_.replace(upTimeReg,"");
			this.fileList.createChild({tag: "a", cls:"textOverflow", targer: "_blank",title:this.files[i][0], href: this.downLoadUrl+"fileName=" + filePath_}).dom.innerText = fileName_;
		}

	},

	onUpload : function(obj, t) {
		var t0 = obj.getFileName(t);
		obj.files[obj.files.length] = [t0, t];
		obj.renderFiles();
		obj.calcValue();
	},
				
	collapse : function() {
		if (!this.isExpanded()) {
			return;
		}
		this.list.hide();
		Ext.get(document).un('mousedown', this.collapseIf, this);
		Ext.get(document).un('mousewheel', this.collapseIf, this);
		this.fireEvent('collapse', this);
	},
	
	// private
	collapseIf : function(e) {
		if (!e.within(this.wrap) && !e.within(this.list)) {
			this.collapse();
		}
	},
				
	recalcSize : function(pNode) {
    var inner = this.view.getEl().dom;
    var lw = this.listWidth || Math.max(this.wrap.getWidth(), 70);
    this.list.setWidth(lw);
    var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
    this.list.beginUpdate();
    this.list.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
    this.list.setHeight((this.list.getHeight()+this.list.getFrameWidth('tb'))>80?80:(this.list.getHeight()+this.list.getFrameWidth('tb')));
    this.list.alignTo(this.wrap, this.listAlign);
    this.list.endUpdate();

	},
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return;
		}
		this.list.alignTo(this.wrap, this.listAlign);
		this.recalcSize();
		this.list.show();
		Ext.get(document).on('mousedown', this.collapseIf, this);
		Ext.get(document).on('mousewheel', this.collapseIf,this);

		this.fireEvent('expand', this);
	},
	
	isExpanded : function() {
		return this.list.isVisible();
	},
	onTrigger1Click : function() {
		if (!this.files)
			this.files = new Array();
		uploadFile(this.onUpload, this);
	},
	onTrigger2Click : function() {
		if (this.disabled) {
			return;
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus();
		} else {
			this.hasFocus = true;
			this.expand();
			this.el.focus();
		}
	}
});

//////////////////////////////////////////////////////////////////Ext.form.UploadField2/////////////////////

Ext.form.UploadField2 = Ext.extend(Ext.form.UploadField, {
	
	//ͳһ�洢��ģ������������ʶ���ĸ�ģ��ĸ���
	module:'NO',
	updateBy:'',
	listEditable : true,
	calcValue : function() {
		var v = Ext.encode(this.files);
		var vv = "";
		for (var i = 0; i < this.files.length; i++)
		{
			if (i > 0) {
				vv += ";";
			}
			vv += this.files[i].name;
		}
		this.hiddenField.value = v;
		
   	Ext.form.UploadField.superclass.setValue.call(this, vv);
	},
	renderFiles:function(fat) {
		if (!this.fileList)
			return;
		if (!this.files)
			return;
		this.fileList.dom.innerHTML = "";
		for (var i = 0; i < this.files.length; i++)
		{
			if (i > 0)
				this.fileList.createChild({tag: "br"});
			
			//�жϸ����б�ĸ����ɱ༭��ɾ����Ȩ�ޣ��ɱ༭������У�
			//�ؼ���ֻ������this.listEditableΪtrue����ɾ�������б���
			//�ؼ���ֻ������this.files[i].newAdd Ϊtrue����ɾ���¼ӵ�����ڵ�ǰҳ���¼ӵġ�
			if (this.readOnly && this.readOnly === true)
				;
			else if (this.listEditable || this.files[i].newAdd){
				var p = this.fileList.createChild({tag: "img", src: "../images/delete.gif",
					style: "cursor:hand;vertical-align:text-bottom"});
				p._id = i;
				p._obj = this;
				p.on("click", function() { this._obj.removeFile(this._id); }, p);
			}
			
			this.fileList.createChild({tag: "span"}).dom.innerText = " ";
			
			//���url=true���ʾֱ�����ⲿ���ӵ�ַ��Ĭ�����ڲ����ӵ�ַ
			if (this.files[i].url) {
				var fileName_ = this.files[i].name;
				var filePath_ = this.files[i].fp;
				this.fileList.createChild({tag: "a", cls:"textOverflow", targer: "_blank",title:fileName_, href: filePath_}).dom.innerText = fileName_;
			} else if (this.files[i].oldFormat){
				var fileName_ = this.files[i].fn;
				var filePath_ = this.files[i].fp;
				var reg = /\(\d+\)\./;
				var upTimeReg = /\(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)$/
				fileName_ = fileName_.replace(reg,".");
				filePath_ = filePath_.replace(upTimeReg,"");
				this.fileList.createChild({tag: "a", cls:"textOverflow", targer: "_blank",title:this.files[i].fn, href: this.downLoadUrl+"fileName=" + filePath_}).dom.innerText = fileName_;

			} else {
				var fileId_ = this.files[i].oid;
				var fileName_ = this.files[i].name;
				//�����ϴ��ˣ��ϴ�ʱ����Ϣ
				var ct = this.files[i].ct;
				var cb = this.files[i].cb;
				if (cb && cb != "" && ct && ct != "")
					fileName_ += "("+cb+" "+ct+")";
				
				this.fileList.createChild({tag: "a", cls:"textOverflow", targer: "_blank",title:fileName_, href: this.downLoadUrl+"?oid="+ fileId_}).dom.innerText = fileName_;
			}
		}
	},

	setValue : function(v) {
		//if (!this.files)
		this.files = new Array();
		if (!v)
			v = "[]" + v;
		if(v.charAt(0) == '/' || v.indexOf("uploads/") == 0){//�����ϰ汾�Ľṹ
			var s = v.split(";");
			var index = 0;
			for (var i = 0; i < s.length; i++) {
				if (s[i]!=null && s[i] != ""){
					
					var fn = this.getFileName(s[i]);
					var jsonObj = {fn:fn,fp:s[i],oldFormat:true,newAdd:false};
					this.files[index] = jsonObj;
					index++;
				}
			}
		} else {//-----------�°汾�Ľṹ
			var jsonS = Ext.decode(v);
			var index = 0;
			if (jsonS) {
				for (var i = 0; i < jsonS.length; i++) {
					if (jsonS[i]!=null){
						jsonS[i].newAdd = false;
						if(jsonS[i].oldFormat)
							jsonS[i].oldFormat = true;
						else
							jsonS[i].oldFormat = false;
						this.files[index] = jsonS[i];
						index++;
					}
				}
			}
		}
		this.renderFiles();
		this.calcValue();
	},
	onUpload : function (obj,v) {
		if (!obj.files)
			obj.files = new Array();
		var jsonS = Ext.decode(v);
		var index = obj.files.length;
		for (var i = 0; i < jsonS.length; i++) {
			if (jsonS[i]!=null){
				jsonS[i].newAdd = true;
				jsonS[i].oldFormat = false;
				obj.files[index] = jsonS[i];
				index++;
			}
		}
		obj.renderFiles();
		obj.calcValue();
	},
	onTrigger1Click : function(){
		if (!this.files)
			this.files = new Array();
		var form = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			method: 'POST',
			fileUpload: true,
			defaultType: 'textfield',
			baseParams:{module:this.module?this.module:"NO",updateBy:this.updateBy?this.updateBy:""},
			errorReader: new Ext.form.XmlErrorReader(),
			labelWidth: 75, // label settings here cascade unless overridden
			labelAlign: 'top',
			url:this.uploadUrl,
			items:[new Ext.form.TextField({
	      fieldLabel: '��ѡ���ļ�',
	      name: 'first',
				inputType: 'file',
	      allowBlank:false
	    })]
		});
	
		if (window_upload)
			window_upload.close();
	  window_upload = new Ext.Window({
	    title: '�ϴ��ļ�',
			width:250,
			height:130,
	    layout: 'fit',
	    plain:true,
	    bodyStyle:'padding:5px;',
	    buttonAlign:'center',
	    items: form,
	    buttons: [{
	      text: 'ȷ��',
	      handler: function() {
					var form = window_upload._form.form;
					if (!form.isValid()) {
						Ext.MessageBox.alert("��ʾ", "��ѡ���ϴ��ļ�");
						return;
					}
					
					form.submit({
						waitMsg: '�����ϴ�....',
						success: function(form, action)
						{
							window_upload.onUpload(window_upload.obj,form.errorReader.xmlData.documentElement.text);
							if (window_upload) {
								window_upload.hide();
								window_upload = null;
							}
						},
						failure: function(form, action)
						{
							Ext.MessageBox.alert("�ϴ�ʧ��", form.errorReader.xmlData.documentElement.text);
						}
					});
	      }
	    },{
	        text: 'ȡ��',
	        handler: function() {
		        window_upload.close();
			   		window_upload = null;
	        }
	    }]
    });
		window_upload._form = form;
		window_upload.onUpload = this.onUpload;
		window_upload.obj =  this;
    window_upload.show();
	}
});

Ext.tree.FilterTreeLoader = function(config){
	Ext.tree.FilterTreeLoader.superclass.constructor.call(this, config);
}

Ext.extend(Ext.tree.FilterTreeLoader, Ext.tree.TreeLoader, {
    createNode : function(attr){
      if (attr._click && this.regexId && !this.regexId.test(attr.id))
          return null;
      if (attr._click && this.regexText && !this.regexText.test(attr.text))
          return null;
			if (this.box && this.box.singleMode == false) {
				if (attr._click) {
					attr.checked = false;
				}
			}
			var ret = Ext.tree.FilterTreeLoader.superclass.createNode.call(this, attr);
			ret._click = attr._click;
			ret.alertMsg = attr.alertMsg;
			if (attr && attr.otherParams && (attr.otherParams instanceof Object)) {
				for (var attrop in attr.otherParams) {
					ret[attrop] = attr.otherParams[attrop];
				}
			}
			if (this.box && this.box.singleMode == false)
			{
				ret.on("checkchange", this.box.checkChanged, this.box);
				ret.on("dblclick", this.box.dblClick, this.box);
				ret.on("expand",this.box.afterExpand,this.box);
			}
			return ret;
    }
});

Ext.form.TreeBox = function(config){
	Ext.form.TreeBox.superclass.constructor.call(this, config);
	this.regexId = config.regexId;
	this.regexText = config.regexText;
}

Ext.form.TreeBox = Ext.extend(Ext.form.TwinTriggerField, {
  regexId : null,
  regexText : null,
  defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
  listWidth: undefined,
  hiddenName: undefined,
  listClass: '',
  selectedClass: 'x-combo-selected',
  triggerClass : 'x-form-arrow-trigger',
  shadow:'sides',
	lastSelection: null,
	singleMode: true,
	pathMode:false,
	readOnly:false,
  listAlign: 'tl-bl?',
  maxHeight: 150,
  resizable: true,
  handleHeight : 8,
  minListWidth : 70,
	viewLoader : null,
	trigger1Class:'x-form-clear-trigger',
  trigger2Class:'x-form-trigger',
	hideTriggers:[true,true],

	initComponent : function(){
		Ext.form.TreeBox.superclass.initComponent.call(this);
		this.addEvents({
			'expand' : true,
			'collapse' : true,
			'beforeselect' : true,
			'change' : true,
			'select' : true
		});

		if(this.transform){
			this.allowDomMove = false;
			var s = Ext.getDom(this.transform);
			this.hiddenName = s.name;
			s.name = Ext.id(); // wipe out the name in case somewhere else they have a reference
			if(!this.lazyRender){
				this.target = true;
				this.el = Ext.DomHelper.insertBefore(s, this.autoCreate || this.defaultAutoCreate);
				s.parentNode.removeChild(s); // remove it
				this.render(this.el.parentNode);
			}else{
				s.parentNode.removeChild(s); // remove it
			}
		}
		this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
        ]};
	},

	// private
    onRender : function(ct, position){
        Ext.form.TreeBox.superclass.onRender.call(this, ct, position);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id:  (this.hiddenId||this.hiddenName)},
                    'before', true);
            this.hiddenField.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';
            // prevent input submission
            this.el.dom.removeAttribute('name');
        }
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }
        var cls = 'x-combo-list';

        this.list = new Ext.Layer({
            shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        });

        var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        this.list.swallowEvent('mousewheel');
		// this.list.dom.style.overflow = 'auto';
		this.view = new Ext.tree.TreePanel({
			el:this.list,
			animate:false,
			// autoHeight : true,
			autoScroll: true,
			ddScroll:true,
			rootVisible: false,
			//loader: this.viewLoader,
			containerScroll: true
			//,tbar:['->','-',{text:'���',ownerC:this,handler:function(){this.ownerC.setValue("=");}}]
		});
		var root = null;
		if (!this.treeData)
			root = new Ext.tree.AsyncTreeNode({
				text: 'Ext JS',
				id:'_',
				draggable:false
			});
		else
			root = new Ext.tree.TreeNode({
				text: 'Ext JS',
				id:'_',
				draggable:false
			});
		this.view.setRootNode(root);

		if (!this.treeData)
		{
			this.view.loader = this.viewLoader;
			this.view.loader.regexId = this.regexId;
			this.view.loader.regexText = this.regexText;
			this.view.loader.box = this;
			this.view.ownerC = this;
			this.view.loader.on('beforeload', this.beforeload, this);

		} else {
			this.loadTree(root, this.treeData);
			if (!this.singleMode) {
				this.view.on("dblclick", this.dblClick, this);
				this.view.on("checkchange", this.checkChanged, this);
				this.view.on("expand",this.afterExpand,this);
			}
		}

		this.view.getSelectionModel().on("selectionchange", this.selectionChange, this);

		this.view.on('expand', function() { this.view.root.expand(); }, this);
		this.view.on('expandnode', this.recalcSize, this);
		this.view.on('collapsenode', this.recalcSize, this);

		this.view.on('click', this.onItemSelect, this);
		this.renderTree();

		this.el.dom.setAttribute('readOnly', true);
		this.el.on('mousedown', function(){if (!this.readOnly)this.onTriggerClick();},  this);
		this.el.addClass('x-combo-noedit');

		this.resizer = new Ext.Resizable(this.list,  {
			pinned:true, handles:'se'
		});
		
		this.resizer.on('resize', function(r, w, h){
				this.list.beginUpdate();
				this.list.setHeight(h < 150 ? 150 : h);
				this.view.setHeight(h < 150 ? 150 : h);
				this.list.setWidth(w < 150 ? 150 : w);
				this.view.setWidth((w  < 150 ? 150 : w) - this.list.getFrameWidth('lr'));
				this.list.alignTo(this.wrap, this.listAlign);
				this.list.endUpdate();
    }, this);
		this.list.setHeight(150);
		this.view.setHeight(150);
    },

	loadTree : function(node, data)
	{
		for (var i = 0; i < data.length; i++)
		{
			var attr = data[i];
			if (this.regexId && !this.regexId.test(attr.id))
				continue;
			if (this.regexText && !this.regexText.test(attr.text))
				continue;
			var param = { id: attr.id, text: attr.text };
			if (attr._click && !this.singleMode)
				param.checked = false;
			var newNode = new Ext.tree.TreeNode(param);
			newNode._click = attr._click;
			newNode.alertMsg = attr.alertMsg;
			node.appendChild(newNode);
			attr.obj = newNode;
			if (attr.children)
				this.loadTree(newNode, attr.children);
		}
	},

	selectionChange : function(mode, node) {
		this.lastSelection = node;
		return true;
	},

	renderTree : function() {
		this.view.render();
	},

	getView : function() {
		return this.view;
	},

	dblClick : function(node, e) {
		if (node.ui.checkbox)
			this.checkChanged(node, node.ui.checkbox.checked);
	},

	checkChanged : function(node, checked) {
		var pv = node.id;
		var pt = node.text;
		if (this.pathMode) {
			pv = this.findPathValue(node);
			pt = this.findPathText(node);
		}
		if (checked)
			this.addValue(pv,pt);
		else
			this.removeValue(pv,pt);
		
		this.fireEvent("select", this, node);
	},

	addValue : function(id, text) {
		var v = this.getValue();
		vals = v.split(",");
		var found = false;
		for (var i = 0; i < vals.length; i++) {
			if (vals[i] == id) {
				found = true;
				break;
			}
		}
		if (!found) {
			if (v.length > 0)
			{
				v = "";
				for (var i = 0; i < vals.length; i++)
					v += vals[i] + "=" + this._text_cache[i] + ",";
			}
			v += id + "=" + text;
			this.setValue(v);
		}

	},

	removeValue : function(id, text) {
		var vals = this.getValue();
		if (vals == id) {
			this.setValue("");
			return;
		}
		vals = vals.split(",");
		var v = "";
		for (var i = 0; i < vals.length; i++) {
			if (vals[i] == id)
				continue;
			if (v.length > 0)
				v += ",";
			v += vals[i] + "=" + this._text_cache[i];
		}
		this.setValue(v);
	},

    // private
    initEvents : function(){
        Ext.form.TreeBox.superclass.initEvents.call(this);

        this.keyNav = new Ext.KeyNav(this.el, {
            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }
				else
					this.selectNext();
            },

            "right" : function(e){
				this.expandNode();
            },

            "left" : function(e){
				this.selectParent();
            },

			"up" : function(e){
                if(this.isExpanded()){
					this.selectPrev();
                }
            },

            "enter" : function(e){
                this.selectValue();
            },

			"esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.collapse();
                return true;
            },

            scope : this,

            forceKeyDown: true
        });

    },
  afterExpand : function(pNode){
	if (!this.singleMode){
			var val_ = this.getValue();
			if (!val_)
				return;
			var val = val_.split(",");
			for (var i = 0; i < val.length; i++){
				if (val[i].indexOf("/")!=-1) {
					var subVal = val[i].substr(val[i].lastIndexOf("/")+1);
					var cNode = pNode.findChild("id",subVal);
					var path = "";
					if (cNode) {
						path = cNode.id;
						if (this.pathMode)
							path = this.findPathValue(cNode);
					}
					if (path == val[i]){
						if(cNode.ui.checkbox)
							cNode.ui.checkbox.checked = true;
					}
				} else {
					var cNode = pNode.findChild("id",val[i]);
					if (cNode){
						if(cNode.ui.checkbox)
							cNode.ui.checkbox.checked = true;
					}
				}
			}
		}
  },

	expandNode : function() {
		if (this.lastSelection) {
			if (!this.lastSelection.isExpanded()) {
				this.lastSelection.expand();
				this.expandNode();
			}
			else if (this.lastSelection.childNodes.length > 0) {
				this.lastSelection = this.lastSelection.childNodes[0];
				this.lastSelection.select();
			}
		}
	},

	beforeload : function(ol, node, cb) {
		ol.baseParams.nodePath = node.getPath();
	},

	selectParent : function() {
		if (this.lastSelection) {
			if (this.lastSelection.parentNode && this.lastSelection.parentNode.getDepth() > 0) {
				this.lastSelection = this.lastSelection.parentNode;
				this.lastSelection.select();
			}
		}
	},

	selectValue : function() {
		if (this.lastSelection) {
			if (this.singleMode) {
				this.onItemSelect(this.lastSelection);
			}
			else {
				if (this.lastSelection.ui.checkbox) {
					this.lastSelection.ui.checkbox.checked = !this.lastSelection.ui.checkbox.checked;
					this.checkChanged(this.lastSelection, this.lastSelection.ui.checkbox.checked);
				}
			}
		}
	},

	selectNext : function() {
		if (this.lastSelection == null) {
			this.lastSelection = this.treeData[0]._node_object;
			this.lastSelection.select();
		}
		else {
			if (this.lastSelection.nextSibling) {
				this.lastSelection = this.lastSelection.nextSibling;
				this.lastSelection.select();
			}
			else
				this.expandNode();
		}
	},

	selectPrev : function() {
		if (this.lastSelection) {
			if (this.lastSelection.previousSibling) {
				this.lastSelection = this.lastSelection.previousSibling;
				this.lastSelection.select();
			}
			else
				this.selectParent();
		}
	},

	onDestroy : function(){
        if(this.view){
        	this.view.purgeListeners();
            this.view.destroy();
        }
        if(this.list){
            this.list.destroy();
        }
        Ext.form.TreeBox.superclass.onDestroy.call(this);
    },
    
    onDisable : function(){
        Ext.form.TreeBox.superclass.onDisable.call(this);
				this.triggers[0].hide();
    },
    // private
    onEnable : function(){
        Ext.form.TreeBox.superclass.onEnable.call(this);
        this.triggers[0].show();
    },


    /**
     * Returns the currently selected field value or empty string if no value is set.
     * @return {String} value The selected value
     */
    getValue : function(){
        if(this.hiddenField) {
            return this.hiddenField.value;
        }
        return typeof this.value != 'undefined' ? this.value : '';
    },

    /**
     * Clears any text/value currently set in the field
     */
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.value = '';
        }
        this.setRawValue('');
        this.lastSelectionText = '';
        this.applyEmptyText();
    },

	findRecord : function(id) {
		var i = id.indexOf("=");
		if (i == -1)
			return id;
		return id.substr(i + 1);
	},

	findValue : function(val, data, sel)
	{
		for (var i = 0; i < data.length; i++)
		{
			var attr = data[i];
			if (attr.id == val)
			{
				if (sel) {
					this.view.getSelectionModel().select(attr.obj);
				}
				return attr.text;
			}
			if (attr.children)
			{
				var s = this.findValue(val, attr.children, sel);
				if (s != null)
					return s;
			}
		}
		return null;
	},
	
	/**
	* ����ȫ·������,������������ڵ�
	**/
	findPathText : function(node) {
		var ret = "";
		var n = node;
		while(n) {
			if(!n || n.id == "-1" || n.id == "_")
				break;
			ret = "/" +n.text+ret;
			n = n.parentNode;
		}
		return ret;
	},
	
	/**
	* ����ȫ·��,������������ڵ�
	**/
	findPathValue : function(node) {
		var ret = node.getPath();
		if (ret.indexOf("/_") == 0)
			ret = ret.substr(2);
		return ret;
	},


	onItemSelect : function(node, e) {
		if (this.singleMode) {

			if (node._click) {
				if (this.pathMode) {
					this.setValue(this.findPathValue(node) + "=" + this.findPathText(node));
				} else
					this.setValue(node.id + "=" + node.text);
				this.collapse();
			}
		}
		this.fireEvent("select", this, node);
	},
	
  setValue : function(v) {
  	v = "" + v;
    var text = v;
		if (this.singleMode)
		{
			var pos = text.indexOf("=");
			if (pos != -1) {
				v = text.substr(0, pos);
				text = text.substr(pos + 1);
			} else if (this.treeData) {
				var s = this.findValue(text, this.treeData, true);
				if (s != null)
					text = s;
			}
			if (!this.pathMode) {
				v = v.substr(v.lastIndexOf("/")+1);
			}
		}
		else
		{
			var vals = v.split(",");
			text = "";
			var i;
			this._text_cache = [];
			v = "";
			for (var i = 0; i < vals.length; i++)
			{
				if (i > 0) {
					text += ",";
					v += ",";
				}
				var pos = vals[i].indexOf("=");
				if (pos == -1) {
					if (!this.pathMode){
						vals[i] = vals[i].substr(vals[i].lastIndexOf("/")+1);
					}
					this._text_cache[i] = vals[i];
					v += vals[i];
				} else {
					var vStr = vals[i].substr(0, pos);
					if (!this.pathMode){
						vStr = vStr.substr(vStr.lastIndexOf("/")+1);
					}
					v += vStr;
					this._text_cache[i] = vals[i].substr(pos + 1);
				}
				text += this._text_cache[i];
			}
		}
    if(this.hiddenField){
       this.hiddenField.value = v;
    }
		else
			this.hiddenValue = v;
    Ext.form.TreeBox.superclass.setValue.call(this, text);
    this.value = v;
		//this.fireEvent("select", this, this.value);Ų��onItemSelect������
		if (!this.disabled) {
			if (this.value == "")
				this.triggers[0].hide();
			else if (!this.readOnly) {
				this.triggers[0].show();
			}
		}
  },

    // private
    onEmptyResults : function(){
        this.collapse();
    },

    /**
     * Returns true if the dropdown list is expanded, else false.
     */
    isExpanded : function(){
        return this.list.isVisible();
    },

    // private
    validateBlur : function(){
        return !this.list || !this.list.isVisible();
    },

    /**
     * Hides the dropdown list if it is currently expanded. Fires the 'collapse' event on completion.
     */
    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Ext.get(document).un('mousedown', this.collapseIf, this);
        Ext.get(document).un('mousewheel', this.collapseIf, this);
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        if(!e.within(this.wrap) && !e.within(this.list)){
            this.collapse();
        }
    },

	recalcSize : function(pNode) {
		//var inner = this.view.getTreeEl().dom;
		//var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
		//this.list.setWidth(lw);
		//var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
		//this.list.beginUpdate();
		//this.list.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
		//this.list.setHeight(this.list.getHeight()+this.list.getFrameWidth('tb'));
		//this.list.alignTo(this.wrap, this.listAlign);
		//this.list.endUpdate();
	},

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
      if(this.isExpanded() || !this.hasFocus){
          return;
      }
      this.list.alignTo(this.wrap, this.listAlign);
			this.recalcSize();
      this.list.show();
      Ext.get(document).on('mousedown', this.collapseIf, this);
      Ext.get(document).on('mousewheel', this.collapseIf, this);
      this.afterExpand(this.view.root);
      //this.fireEvent('expand', this);
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            this.el.focus();
        }else {
            this.hasFocus = true;
            this.expand();
            this.el.focus();
        }
    },
    onTrigger1Click : function(){
    	this.setValue("");
    },

    onTrigger2Click : function(){
       this.onTriggerClick();
    }
});
Ext.reg('treebox', Ext.form.TreeBox);

Ext.form.TreeBoxExtend = Ext.extend(Ext.form.TreeBox, {
	url:'',
	params:{},
	trigger1Class:'x-form-arrow-trigger',
  trigger2Class:'x-form-search2-trigger',
	onTrigger1Click : function(){
  	this.onTriggerClick();
  },

  onTrigger2Click : function(){
  	if (this.getValue() && this.getValue().length>0) {
      var height=480,width=640;
  	  var ua = navigator.userAgent;
		  if(ua.lastIndexOf("MSIE 6.0") != -1){
			  if(ua.lastIndexOf("Windows NT 5.1") != -1){
			    height += 49;
			  }
			  else if(ua.lastIndexOf("Windows NT 5.0") != -1){
			    height += 49;
			  }
			}
  	  var xposition = (screen.width - width) / 2;
		  var yposition = (screen.height - height) / 2;
		  this.params.s_value = this.getValue();
		  var urls = this.url+"?"+Ext.urlEncode(this.params);
  		window.showModalDialog(urls,'','dialogWidth='+width+'px;dialogHeight='+height+'px;dialogLeft='+xposition+'px;dialogTop='+yposition+'px;center=yes;status=no;help=no;resizable=no;scroll=no');
		}
  }
});
Ext.reg('treeboxext', Ext.form.TreeBoxExtend);


Ext.AttachmentsPanel = Ext.extend(Ext.form.FormPanel,  {
	downloadUrl:"",
	uploadUrl:"",
	 onRender : function(ct, position){
      Ext.AttachmentsPanel.superclass.onRender.call(this, ct, position);
//<table width='100%' height='100%'><tbody><tr><td width='50'><div class='x-panel-tbar'>����</div></td><td>s</td></tr></tbody></table>
      /*this.el = ct.createChild({
                id: this.id,
                cls: 'x-panel'
            }, position);
      var el = document.createElement('div');
      el.className = 'x-panel-bwrap';
      this.bwrap = Ext.get(this.el.appendChild(el));
*/
			var tbdiv = this.body.createChild({tag:'div',style:'border-bottom:1px solid #99bbe8;'}, this.body.dom.firstChild
      );
      var tb = tbdiv.createChild({cls:'x-panel-btns-ct', cn: {
          html:'<table cellspacing="0" cellPadding="0" border="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
      	}}, null, true
      );

     	var tr = tb.getElementsByTagName('tr')[0];
     	var b;
     	if (this.uploadButton)
     		b = new Ext.Button(this.uploadButton);
     	else{
     		var args = {
     			text:'���Ӹ���',
     			owner:this,
     			handler:function(){
	     			if (!this.owner.attachments)
							this.owner.attachments = new Array();
						uploadFile(this.owner.uploadCallback, this.owner);
	     		}
	     	};
     		b = new Ext.Button(args);
	    }
      var td = document.createElement('td');
      td.className = 'x-panel-btn-td';
      b.render(tr.appendChild(td));

      td = document.createElement('td');
      this.attachmentRegion = Ext.get(tr.appendChild(td));

      if (this.attachments){
      	if (Ext.isArray(this.attachments)){
					for (var i = 0; i < this.attachments.length; i++){
						this.addAttachment(this.attachments[i],false);
					}
				} else {
					this.setAttachment(this.attachments);
				}
      }
    },

    uploadCallback : function(obj, t) {
			var t0 = obj.getFileName(t);
			obj.addAttachment({href:t,text:t0},true);
		},

		getFileName : function(t) {
			var t0 = t;
			pos = t.lastIndexOf("\\");
			if (pos == -1)
				pos = t.lastIndexOf("/");
			if (pos != -1)
				t0 = t.substring(pos + 1);
			return t0;
		},

		setAttachment:function(attrs){

			var attachs_ = attrs.split(";");
			this.attachments = new Array();
			this.attachmentRegion.dom.innerHTML = "";
			for (var i = 0; i < attachs_.length; i++){
				if (attachs_[i] == null || attachs_[i] =="")
					continue;
				var fn = this.getFileName(attachs_[i]);
				this.addAttachment({href:attachs_[i],text:fn},true);
			}
		},

    addAttachment:function(att,addTo){
    	this.attachmentRegion.createChild({tag:'a',html:"<a href="+downloadUrl+"?fileName="+att.href+">"+att.text+"</a>&nbsp;"}, null, true);

    	if (addTo){
    		if (!this.attachments)
    			this.attachments = new Array();
    		this.attachments[this.attachments.length] = att;
    	}
    },

    getAttachment:function(){
    	var retStr = "";
    	if (this.attachments){
	    	for (var i = 0; i < this.attachments.length; i++){
	    		if(i>0)
	    			retStr += ";";
	    		retStr += this.attachments[i].href;
	    	}
	    }
    	return retStr;
    }
});



Ext.form.IdField = Ext.extend(Ext.form.TriggerField, {
	idCreateUrl:"",
	defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
	triggerClass : 'x-form-arrow-trigger',
	prefix:'',
	autoId:'',
	getAutoId: function(obj, val) { return val; },
	getIdValue: function(obj, val) { return obj.prefix + val; },
    initComponent : function(){
        Ext.form.IdField.superclass.initComponent.call(this);
	},

    // private
    onRender : function(ct, position){
        Ext.form.IdField.superclass.onRender.call(this, ct, position);

		if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

		this.el.dom.setAttribute('readOnly', true);
		this.el.addClass('x-combo-noedit');
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
		var postId = this.getAutoId(this, this.autoId);
        var simple1 = new Ext.form.FormPanel({
			method: 'POST',
			baseParams: {id: postId},
			errorReader: new Ext.form.XmlErrorReader(),
			items: [{
					xtype: 'hidden',
					name: '_temp_hidden_field'
				}],
			url:this.idCreateUrl
		});
		var e0 = document.createElement("div");
		simple1.form._obj = this;
		simple1.form._el = e0;
		simple1.render(simple1.form._el);
		simple1.form.submit({
			waitMsg: '�������ɱ��...',
			success: function(form, action)
			{
				form._obj.setValue(form._obj.getIdValue(form._obj, form.errorReader.xmlData.documentElement.text));
				form._el.outerHTML = "";
			},
			failure: function(form, action)
			{
				Ext.MessageBox.alert("ʧ��", form.errorReader.xmlData.documentElement.text);
			}
		});
    }
});

Ext.override(Ext.Window, {
    addButton : function(config, handler, scope){
		var btn = Ext.Window.superclass.addButton.call(this, config, handler, scope);
		if (this.rendered) {
			var tb = this.footer.dom.getElementsByTagName('table')[0];
			var tr = tb.getElementsByTagName('tr')[0];
			var td = document.createElement('td');
			td.className = 'x-panel-btn-td';
			btn.render(tr.appendChild(td));
		}
		return btn;
    }
});

Ext.loadRemoteScript = function(url, params, cb, cbparam) {
	var elem = document.createElement("div");
	document.body.appendChild(elem);
	var cp = new Ext.Panel({el: elem, border: false, hidden: true });
	Ext.getBody().mask("loading", 'x-mask-loading');
	cp.render();
	if (cb) {
		cp._cb = cb;
		cp._cbparam = cbparam;
	}
	cp.load({
		'url': url,
		'params': params,
//		callback: function() { this.destroy(true); Ext.getBody().unmask(); },
		callback: function() { Ext.getBody().unmask(); if (this._cb) this._cb(this._cbparam); },
		scope: cp,
		discardUrl: false,
		nocache: true,
		timeout: 30,
		scripts: true
	});
}

// ������Ext��ʾ��
Ext.grid.RowExpander = function(config){
    Ext.apply(this, config);

    this.addEvents({
        beforeexpand : true,
        expand: true,
        beforecollapse: true,
        collapse: true
    });

    Ext.grid.RowExpander.superclass.constructor.call(this);

    if(this.tpl){
        if(typeof this.tpl == 'string'){
            this.tpl = new Ext.Template(this.tpl);
        }
        this.tpl.compile();
    }

    this.state = {};
    this.bodyContent = {};
};

Ext.extend(Ext.grid.RowExpander, Ext.util.Observable, {
    header: "",
    width: 20,
    sortable: false,
    fixed:true,
    dataIndex: '',
    id: 'expander',
    lazyRender : true,
    enableCaching: true,

    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        if(!content && !this.lazyRender){
            content = this.getBodyContent(record, rowIndex);
        }
        if(content){
            p.body = content;
        }
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },

    init : function(grid){
        this.grid = grid;

        var view = grid.getView();
        view.getRowClass = this.getRowClass.createDelegate(this);

        view.enableRowBody = true;

        grid.on('render', function(){
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    getBodyContent : function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(!content){
            content = this.tpl.apply(record.data);
            this.bodyContent[record.id] = content;
        }
        return content;
    },

    onMouseDown : function(e, t){
        if(t.className == 'x-grid3-row-expander'){
            e.stopEvent();
            var row = e.getTarget('.x-grid3-row');
            this.toggleRow(row);
        }
    },

    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';
        return '<div class="x-grid3-row-expander">&#160;</div>';
    },

    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){
                body.innerHTML = this.getBodyContent(record, rowIndex);
            }
            return true;
        }else{
            return false;
        }
    },

    toggleRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },

    expandRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
            this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },

    collapseRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforcollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});

/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
    lines:false,
    borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls:'x-column-tree',
    
    onRender : function(){
        Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);
        this.headers = this.body.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);

        var cols = this.columns, c;
        var totalWidth = 0;

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth);
        this.innerCt.setWidth(totalWidth);
    }
});

Ext.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior

    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];

        var buf = [
             '<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
                '<div class="x-tree-col" style="width:',c.width-bw,'px;">',
                    '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                    '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
                "</div>"];
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</div>",
                      "</div>");
         }
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.anchor = cs[3];
        this.textNode = cs[3].firstChild;
    }
});

Ext.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',

    onTrigger1Click : function(){
        if(this.hasSearch){
            this.el.dom.value = '';
            var o = {start: 0};
            this.store.baseParams = this.store.baseParams || {};
            this.store.baseParams[this.paramName] = '';
            this.store.reload({params:o});
            this.triggers[0].hide();
            this.hasSearch = false;
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        this.hasSearch = true;
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
        var o = {start: 0};
        this.store.baseParams = this.store.baseParams || {};
        this.store.baseParams[this.paramName] = v;
        this.store.reload({params:o});
        this.triggers[0].show();
    }
});

Ext.form.TextButtonField = Ext.extend(Ext.form.TextField, {
		defaultAutoCreate : {tag: "input", type: "text", size: "16", autocomplete: "off"},
		hideTrigger:false,
		// private
	  onRender : function(ct, position){
	      Ext.form.TextButtonField.superclass.onRender.call(this, ct, position);
	      this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
	      var confTrigger = {tag:'span', cls:'x-form-twin-triggers', cn: []};

				if (this.buttons){
					if (this.buttons instanceof Array) {
						for(var i = 0, len = this.buttons.length; i < len; i++) {
							confTrigger.cn[confTrigger.cn.length] = {tag:'span',cls: "x-form-trigger"};
						}
						var trigger = this.wrap.createChild(confTrigger, null, true);
            for(var i = 0, len = this.buttons.length; i < len; i++) {
            	var span = trigger.getElementsByTagName('span')[i];
                var cfg = {};
	            	Ext.apply(cfg, this.buttons[i]);
	              var b = new Ext.Button(cfg);
                var td = document.createElement('span');
                b.render(span);
            }

					}
				}

	  }
});

Ext.form.URLField = Ext.extend(Ext.form.TriggerField, {
	defaultAutoCreate : {tag: "a",cls:"textOverflow", target: "_blank"},
		// private
	triggerClass:'x-form-link-trigger',
    initValue : function(){
    },

		// private
	onRender : function(ct, position){
		Ext.form.URLField.superclass.onRender.call(this, ct, position);

		this.el.dom.name = "";
		this.urlElField = this.wrap.createChild({tag:'input', type:'hidden', name: this.name});
		if(this.value){
			this.value = (this.value === undefined || this.value === null) ? '': this.value;
			this.linkURL = (this.linkURL === undefined || this.linkURL === null) ? '': this.linkURL;
			this.setValue(this.value+"|_|"+this.linkURL);
        }
		if (this.readOnly && this.readOnly==true){
			this.trigger.setDisplayed(false);
		}

	},
	  
	validate : function(){
		return true;
	},
isValid:function(a){
		if(this.disabled){
					return true
		}
		var c=this.preventMark;
		this.preventMark=a===true;
		var rawValue = this.urlElField.dom.value;
		var processValue = this.processValue(rawValue);
		var b = this.allowBlank;
		if(processValue!=undefined){
			b=this.validateValue(processValue);
		}
		this.preventMark=c;
		return b
		},

	setValue : function(v) {
		//Ext.form.URLField.superclass.setValue.apply(this, arguments);
		if(v){
			var vs = v.split("|_|");
			this.el.dom.innerHTML = vs[0];
			this.el.dom.title = vs[0];
			this.value = vs[0];
			if (vs.length > 1){
				this.el.dom.href = vs[1];
				this.linkURL = vs[1];
			}
			this.urlElField.dom.value= v;
		}
	},
	getLinkURL : function(){
		return this.linkURL;
	},
	getValue : function(){
		return this.value+"|_|"+this.linkURL;
	},

	updateValue : function (obj,displayName,urlValue){
		obj.setValue(displayName+"|_|"+urlValue);
	},
	onTriggerClick : function(){
		var form = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			method: 'POST',
			fileUpload: true,
			defaultType: 'textfield',
			errorReader: new Ext.form.XmlErrorReader(),
			labelWidth: 75, // label settings here cascade unless overridden
			labelAlign: 'left'
		});

	    form.add(
	        new Ext.form.TextField({
	            fieldLabel: '��ʾ����',
	            name: 'displayName',
	            width:175,
	            allowBlank:true,
	            value:this.value
	        }),
	        new Ext.form.TextField({
	            fieldLabel: '���ӵ�ַ',
	            name: 'urlValue',
	            width:175,
	            allowBlank:false,
	            value:this.linkURL
	        })
		);
		var window_url = null;
		if (window_url)
			window_url.close();
	    window_url = new Ext.Window({
        	title: '������',
			width:300,
			height:150,
	        layout: 'fit',
	        plain:true,
	        bodyStyle:'padding:5px;',
	        buttonAlign:'center',
	        items: form,

	        buttons: [{
				text: 'ȷ��',
				handler: function() {
					var submitForm = window_url._form.form;
					if (!submitForm.isValid()) {
						Ext.MessageBox.alert("��ʾ", "����д���ӵ�ַ");
						return;
					}
					window_url.setValue(window_url.obj,submitForm.findField("displayName").getValue(),submitForm.findField("urlValue").getValue());
          	window_url.close();
				   	window_url = null;
				}
        	},{
				text: 'ȡ��',
				handler: function() {
					window_url.close();
					window_url = null;
				}
      		}]
    	});
		window_url._form = form;
		window_url.setValue = this.updateValue;
		window_url.obj = this;
	    window_url.show();
	}
});

//��frame��tabPanel
Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
		//updateManager:new Ext.Updater(this),
		onRender : function(ct, position){
		    this.el = ct.createChild({tag: 'iframe', id: 'iframe-'+ this.id, frameBorder: 0, src: this.url});
		},
		onDestroy : function(){
			this.el.dom.suc = "javascript:false";
			Ext.ux.IFrameComponent.superclass.onDestroy.call(this);
		},
		setTitle :function(newTitle) {
			this.title = newTitle;
		},
		isCloseable :function() {
			return this.closable;
		},
		load:function(url){
			if (url)
				this.el.dom.src=url;
			else
				this.el.dom.src=this.url;
		},
    getIframeComponent: function() {
     	return this.el;
    }
});

//����GridPanel����
Ext.override(Ext.grid.GridPanel, {
		setValue:function(obj){
			this.store.loadData(obj,false);
		},
		getValue:function(){
			var n = this.store.getCount();
			var ds = new Array();
			for (var i = 0; i < n; i++)
				ds[i] = this.store.getAt(i).data
			return Ext.util.JSON.encode(ds);
		},
		appendValue:function(obj){
			this.store.loadData(obj,true);
		}
});


Ext.namespace('Ext.ux');
Ext.ux.CheckboxGroup = Ext.extend(Ext.form.CheckboxGroup,  {
	onRender:function(ct, position){
		Ext.ux.CheckboxGroup.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.name,id: (this.id||this.name)}, 'before', true);
		
	},
	initValue : function(){
        Ext.ux.CheckboxGroup.superclass.initValue.call(this);
        this.value = this.value !== undefined ? this.value : ''
        if(this.hiddenField){
		    this.hiddenField.value = this.value;
        }
    },
	setValue : function(v){
        if (!v || v == "")
        	return;
        	
        this.value=v;
        
        if(this.hiddenField){
            this.hiddenField.value = v;
        }
        this.checkValue(v);
		Ext.ux.CheckboxGroup.superclass.setValue.call(this, this.value);

  },
	checkValue : function(v) {
		var vs = v.split(",");
    for (var i = 0; i < vs.length; i++) {
    	var ss = this.panel.findBy(function(c){
            return c.inputValue==vs[i];
        }, this);
        if (ss && ss.length > 0)
        	ss[0].setValue(true);
    }
	},
    afterRender : function(){
        Ext.form.CheckboxGroup.superclass.afterRender.call(this);
        this.eachItem(function(item){
            item.on('check', this.fireChecked, this);
            item.readOnly = this.readOnly;
            item.inGroup = true;
        });
       	this.checkValue(this.value);

    },
    
    // private
    fireChecked: function(){
        var arr = "";
        this.eachItem(function(item){
            if(item.checked){
            		if (arr.length > 0)
            			arr += ",";
                arr += item.inputValue;
            }
        });
        this.value = arr;
        if(this.hiddenField){
            this.hiddenField.value = arr;
        }
        
        this.fireEvent('change', this, arr);
    },
    getValue : function(){
        /*var out = [];
        this.eachItem(function(item){
            if(item.checked){
                out.push(item);
            }
        });*/
        return this.value;
    },
    eachItem: function(fn, scope) {
        if(this.items && this.items.each){
            this.items.each(fn, scope || this);
        }
    },
	setReadOnly : function(r) {
		this.readOnly = r;
		this.eachItem(function(item) {
			item.readOnly = r;
		});
	}
});
Ext.reg('ux-checkboxgroup', Ext.ux.CheckboxGroup);

Ext.ux.RadioGroup = Ext.extend(Ext.ux.CheckboxGroup, {
	allowBlank : true,

	blankText : "You must select one item in this group",
	// private
	defaultType : 'radio',

	// private
	groupCls: 'x-form-radio-group',
	checkValue : function(v) {
		var v0 = "";
		if (v.indexOf(",") == -1) {
				v0 = v;
		} else {
			var vs = v.split(",");
			v0 = vs[0];
		}
		var ss = this.panel.findBy(function(c){
			return c.inputValue==v0;
		}, this);
		if (ss && ss.length > 0)
			ss[0].setValue(true);
	},
	setValue : function(v){
		if (!v)
			return;

		this.value=v;

		if(this.hiddenField){
			this.hiddenField.value = v;
		}
		
		this.checkValue(v);
		Ext.form.CheckboxGroup.superclass.setValue.call(this, this.value);
	}
});
Ext.reg('ux-radiogroup', Ext.ux.RadioGroup);



Ext.form.SelectDialogField = Ext.extend(Ext.form.ComboBox, {
	trigger1Class:'x-form-clear-trigger',
	trigger2Class:'x-form-adv-trigger',
	
	queryParam:'id',
	minChars:2,
	/**
		������Ŀ��ҳ��
	**/
	selectUrl : '',
	viewUrl:'',//�鿴��ϸ��Ϣҳ��
	typeAheadUrl:'',//�ÿ�ͷ�Զ�������ַҳ��
	params:{},
	dialogHeight:480,
	dialogWidth:640,
	
	valueField: 'id',
	displayField:'name',
	forceSelection:false,
	/**
		��ǰֵ����Ŀ��ҳ��ʱ����ʹ�õı���
	**/
	valueParam:'s_value',
	/**
		�Ƿ�ѷ��ص����ƴ洢����
	**/
	storeName:false,
	hideTriggers:[true,true],
	initComponent : function(){
		Ext.form.SelectDialogField.superclass.initComponent.call(this);
		
		this.addEvents('dialogReturn');
			
		this.triggerConfig = {tag:'span', cls:'x-form-twin-triggers', 
			cn:[
				{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
				{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
			]
		};
		this.hiddenName = this.hiddenName === undefined ? this.name : this.hiddenName;
		if (!this.store) {
			this.store = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
					url: this.typeAheadUrl
				}),
				baseParams:this.params,
				reader: new Ext.data.JsonReader({
					root: 'records',
					totalProperty: 'totalCount'
				},[
					{name: this.valueField, mapping: this.valueField},
					{name: this.displayField, mapping: this.displayField}
				])
			});
		}

		if(this.typeAheadUrl && this.typeAheadUrl!=''){
			this.typeAhead = true;
		}else{
			this.forceSelection = true;
		}
	},
	
	getTrigger : function(index){
		return this.triggers[index];
	},

	initTrigger : function(){
		var ts = this.trigger.select('.x-form-trigger', true);
		this.wrap.setStyle('overflow', 'hidden');
		var triggerField = this;
		ts.each(function(t, all, index){
			t.hide = function(){
				var w = triggerField.wrap.getWidth();
				this.dom.style.display = 'none';
				triggerField.el.setWidth(w-triggerField.trigger.getWidth());
			};
			t.show = function(){
				var w = triggerField.wrap.getWidth();
				this.dom.style.display = '';
				triggerField.el.setWidth(w-triggerField.trigger.getWidth());
			};
			var triggerIndex = 'Trigger'+(index+1);

			if(this['hide'+triggerIndex]){
				t.dom.style.display = 'none';
			}
			t.on("click", this['on'+triggerIndex+'Click'], this, {preventDefault:true});
			t.addClassOnOver('x-form-trigger-over');
			t.addClassOnClick('x-form-trigger-click');
		}, this);
		
		this.triggers = ts.elements;
	},
	// private
	onRender : function(ct, position){
		Ext.form.SelectDialogField.superclass.onRender.call(this, ct, position);
		this.setReadOnly(this.readOnly);
	},
	
	afterRender : function(){
		Ext.form.TriggerField.superclass.afterRender.call(this);
		this.el.on('mousedown', this.onTriggerClick, this);
	},

	setEditable : function(value){
		if (value == this.editable) {
			return;
		}
		this.editable = value;
		if (!value) {
			this.el.dom.setAttribute('readOnly', true);
			this.el.addClass('x-combo-noedit');
		} else {
			this.el.dom.setAttribute('readOnly', false);
			this.el.removeClass('x-combo-noedit');
		}
	},
	
	/*
	setReadOnly : function(r){
		Ext.form.TriggerField.superclass.setReadOnly.call(this,r);
		if (this.rendered && r) {
			for(var index = 0; index < this.triggers.length; index++){
				if (this.hideTriggers[index] == true)
					this.triggers[index].setDisplayed(false);
				else
					this.triggers[index].setDisplayed(true);
			}
		}
	},
	
	*/
	
	setReadOnly : function(r){
		Ext.form.TriggerField.superclass.setReadOnly.call(this,r);
			if (this.rendered) {
				for(var index = 0; index < this.triggers.length; index++){
					if (r) {
							if (this.hideTriggers[index] == true)
								this.triggers[index].setDisplayed(false);
					} else {
						this.triggers[index].setDisplayed(true);
					}
			}
		}
	},

	/**
	 * Returns the currently selected field value or empty
	 * string if no value is set.
	 * 
	 * @return {String} value The selected value
	 */
	getValue : function(){
		if(this.hiddenField && this.hiddenField.value && this.hiddenField.value!='') {
			return this.hiddenField.value;
		}
		return Ext.form.SelectDialogField.superclass.getValue.call(this);
	},
	getValueId : function(){
			if(this.hiddenField && this.hiddenField.value && this.hiddenField.value!='') {
				vid = "";
				var v_ = this.hiddenField.value;
				var vals = v_.split(",");
				for (var i = 0; i < vals.length; i++) {
					vStr = "";
					var pos = -1;
					if(pos==-1){
						pos = vals[i].indexOf("=");
					}
					if (pos == -1) {
						vStr = vals[i];
					} else {
						vStr = vals[i].substr(0, pos);
					}
					if(vid==""){
						vid = vStr;
					}else{
						vid = vid+","+vStr;
					}
				}
				return vid;
			
			}
			return Ext.form.SelectDialogField.superclass.getValue.call(this);
		},
    /**
     * Clears any text/value currently set in the field
     */
	clearValue : function(){
		if(this.hiddenField){
			this.hiddenField.value = '';
		}
		this.setRawValue('');
		this.lastSelectionText = '';
		//this.applyEmptyText();
	},

	setValue : function(v) {
		var val = "";
		var text = "";
		this.valueStr = [];
		this.nameStr = [];
		
		var jsonValue = "";
		var new_ = "";

		
		var vals = v.split(",");
		for (var i = 0; i < vals.length; i++) {
			if (i > 0) {
				text += ",";
				val += ",";
			}
			var pos = -1
			var pos = vals[i].indexOf("=");
			
			if (pos == -1) {
				this.valueStr[i] = vals[i];
				this.nameStr[i] = vals[i];
				val += vals[i];
				text += vals[i];
			} else {
				var vStr = vals[i].substr(0, pos);
				val += vStr;
	
				text += vals[i].substr(pos + 1);
				this.valueStr[i] = vStr;
				this.nameStr[i] = vals[i].substr(pos + 1);
			}
		}
		
		if(this.hiddenField){
			if (this.storeName){
				this.hiddenField.value = Ext.value(v, '');
			}else{
				this.hiddenField.value = Ext.value(val, '');
			}
		}
		if (v == "")
			this.triggers[0].hide();
		else {
			if (!this.readOnly)
				this.triggers[0].show();
		}
		Ext.form.ComboBox.superclass.setValue.call(this, text);
	//	if(String(val) !== String(this.value)){
	//    this.fireEvent('change', this, v, this.startValue);
	//}
		this.value = val;
	//Ext.form.SelectDialogField.superclass.setValue.call(this, text);
	},

	doForce : function(){
		if(this.el.dom.value.length > 0){
			if (this.hiddenField.value=='')
				this.setValue("");
		}
	},
	onSelect : function(record, index){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			this.setValue(record.data[this.valueField]+"="+ record.data[this.displayField]);
			this.collapse();
			this.fireEvent('select', this, record, index);
		}
	},
	onTriggerClick : function() {
	  this.onTrigger3Click();
	},

	onTrigger1Click : function(){
		this.setValue("");
	},

	onTrigger2Click : function(){
		this.onFocus();
		var height=this.dialogHeight,width=this.dialogWidth;
		var ua = navigator.userAgent;
		if(ua.lastIndexOf("MSIE 6.0") != -1){
			if(ua.lastIndexOf("Windows NT 5.1") != -1){
				height += 49;
			}
			else if(ua.lastIndexOf("Windows NT 5.0") != -1){
				height += 49;
			}
		}
		var xposition = (screen.width - width) / 2;
		var yposition = (screen.height - height) / 2;
		var vp = this.valueParam;
		this.params[vp] = this.getValueId();
		
		var urls = this.selectUrl+"?"+Ext.urlEncode(this.params);
		if(this.selectUrl.indexOf("?")>0){
			var urls = this.selectUrl+"&"+Ext.urlEncode(this.params);
		}
		var rv = window.showModalDialog(urls,'','dialogWidth='+width+'px;dialogHeight='+height+'px;dialogLeft='+xposition+'px;dialogTop='+yposition+'px;center=yes;status=no;help=no;resizable=no;scroll=no');
		if (rv)
			this.setValue(rv);
			
			this.fireEvent('dialogReturn', this, rv);
			
	},
	onTrigger3Click : function(){

		if (this.value && this.value.length>0 && this.viewUrl && this.viewUrl.length>0) {
			var height=500,width=700;
			var xposition = (screen.width - width) / 2;
			var yposition = (screen.height - height) / 2;
			var vp = this.valueParam;
			this.params[vp] = this.getValueId();
			var urls = this.viewUrl+"?"+Ext.urlEncode(this.params);
			if(this.viewUrl.indexOf("?")>0){
				var urls = this.viewUrl+"&"+Ext.urlEncode(this.params);
			}
			window.showModalDialog(urls,'','dialogWidth='+width+'px;dialogHeight='+height+'px;dialogLeft='+xposition+'px;dialogTop='+yposition+'px;center=yes;status=no;help=no;resizable=no;scroll=no');
		}
	}
	
});
Ext.reg('selDlgfield', Ext.form.SelectDialogField);


Ext.override(Ext.Panel, {
    setIcon : function(icon){
		if(this.rendered && this.header) {
			var hd = this.header.dom;
			var img = hd.firstChild && String(hd.firstChild.tagName).toLowerCase() == 'img' ? hd.firstChild : null;
			if (img){
				img.src = icon;
			} else {
				Ext.DomHelper.insertBefore(hd.firstChild, {
					tag:'img', src: icon, cls:'x-panel-inline-icon'
				});
			 }
		}

    }
});


Ext.override(Ext.form.Field, {
	// private
	initComponent : function(){
		Ext.form.Field.superclass.initComponent.call(this);
		this.addEvents('focus','blur','specialkey','change','invalid','valid');
		if (!this.name){
			this.name = this.name?this.name:(this.hiddenName||"");
		}
		if (!this.hiddenName){
			this.hiddenName = this.hiddenName?this.hiddenName:(this.name||"");
		}
	},
	
	// private
	onRender : function(ct, position){
		Ext.form.Field.superclass.onRender.call(this, ct, position);
		if(!this.el){
			var cfg = this.getAutoCreate();
			if(!cfg.name){
				cfg.name = this.name || this.id;
			}
			if(this.inputType){
				cfg.type = this.inputType;
			}
			this.el = ct.createChild(cfg, position);
		}
		var type = this.el.dom.type;
		if(type){
			if(type == 'password'){
				type = 'text';
			}
			this.el.addClass('x-form-'+type);
		}
		
		if(this.readOnly){
			this.el.dom.readOnly = true;
			this.el.addClass('x-form-field-readOnly');
		}

		if(this.tabIndex !== undefined){
			this.el.dom.setAttribute('tabIndex', this.tabIndex);
		}

		this.el.addClass([this.fieldClass, this.cls]);
	},
	
	setReadOnly : function(r){
		if(r == true) {
			this.readOnly = true;
			if(this.rendered) {
				this.el.dom.readOnly = true;
				this.el.addClass('x-form-field-readOnly');
			}
		} else if (r == false) {
			this.readOnly = false;
			if(this.rendered) {
				this.el.dom.readOnly = false;
				this.el.removeClass('x-form-field-readOnly');
			}
		}
	}
});

Ext.override(Ext.form.TriggerField, {
	initComponent:function() {
		// call parent initComponent
		Ext.form.TriggerField.superclass.initComponent.call(this);
		if (this.readOnly)
			this.hideTrigger = true;
	},
	setReadOnly : function(r){
		Ext.form.TriggerField.superclass.setReadOnly.call(this,r);
		if(r) {
			this.hideTrigger = true;
			if(this.rendered) {
				this.el.un('mousedown', this.onTriggerClick,  this);
				this.trigger.setDisplayed(false);
			}
		} else {
			this.hideTrigger = false;
			if(this.rendered) {
				this.el.on('mousedown', this.onTriggerClick,  this);
				this.trigger.setDisplayed(true);
			}
		}
		if(this.rendered){
			this.el.setWidth(this.wrap.getWidth()-this.trigger.getWidth());
		}
	},
	
	afterRender : function(){
		Ext.form.TriggerField.superclass.afterRender.call(this);
		if (this.readOnly) {
			this.el.un('mousedown', this.onTriggerClick,  this);
		}
	},
	
	onDisable : function(){
		Ext.form.TriggerField.superclass.onDisable.call(this);
		if(this.wrap){
			this.wrap.addClass(this.disabledClass);
			this.el.removeClass(this.disabledClass);
		}
		if(this.rendered)
			this.trigger.setDisplayed(false);
	},
	
	onEnable : function(){
		Ext.form.TriggerField.superclass.onEnable.call(this);
		if(this.wrap){
			this.wrap.removeClass(this.disabledClass);
		}
		if(this.rendered)
			this.trigger.setDisplayed(true);
	}
});

Ext.override(Ext.form.TwinTriggerField, {
	hideTriggers:[false,false],
	//initComponent:function() {
	//	Ext.form.TriggerField.superclass.initComponent.call(this);
	//},
	setReadOnly : function(r) {
		Ext.form.TriggerField.superclass.setReadOnly.call(this, r);
		var hideTriggers = this.hideTriggers;
		if (this.rendered) {
			for ( var index = 0; index < this.triggers.length; index++) {
				if (hideTriggers[index] == true) {
					if (r == true)
						this.triggers[index].setDisplayed(false);
					else if (r == false) {
						this.triggers[index].setDisplayed(true);
					}
				}
			}
		}
	},
  onRender : function(ct, position){
  	Ext.form.TwinTriggerField.superclass.onRender.call(this, ct, position);
  	if (this.readOnly) {
	  	for(var index = 0; index < this.triggers.length; index++){
	    	if (this.hideTriggers[index] == true)
    			this.triggers[index].setDisplayed(false);
	    }
	  }
  		
  },
  onDisable : function(){
    Ext.form.TwinTriggerField.superclass.onDisable.call(this);
    if(this.wrap){
        this.wrap.addClass(this.disabledClass);
        this.el.removeClass(this.disabledClass);
    }
    var hideTriggers = this.hideTriggers;
    if (this.rendered){
	    for(var index = 0; index < this.triggers.length; index++){
	    	if (hideTriggers[index] == true){
	    			this.triggers[index].setDisplayed(false);
	    	}
	    }
	  }
  },
  onEnable : function(){
    Ext.form.TwinTriggerField.superclass.onEnable.call(this);
    if(this.wrap){
        this.wrap.removeClass(this.disabledClass);
    }
    
    var hideTriggers = this.hideTriggers;
    if(this.rendered) {
      for(var index = 0; index < this.triggers.length; index++){
	    	if (hideTriggers[index] == true){
	    			this.triggers[index].show();
	    	}
	    }
    }
  }
});

Ext.override(Ext.form.ComboBox, {
  doForce : function(){
        if(this.el.dom.value.length > 0){
            this.el.dom.value =
                this.lastSelectionText === undefined ? '' : this.lastSelectionText;
            this.applyEmptyText();
        } else {
        	this.clearValue();
        }
    },
    postBlur : function(){
       
    },
    
    setValue : function(v){
        var text = new String(v);
        var pos = text.indexOf("=");
        if (pos > -1) {
        	var texts = text.substr(pos + 1);
        	if (texts == null || texts == "")
        		texts = text.substr(0, pos);
        	
        	text = texts;
        }
        
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(this.valueNotFoundText !== undefined){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value = v;
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
    }
});

Ext.override(Ext.layout.FormLayout, {
  fieldTpl:new Ext.Template(
      '<div class="x-form-item {5}" tabIndex="-1">',
          '<label for="{0}" style="{2}" desc="{7}" onmouseover="'+
          'if (this.scrollWidth>this.style.pixelWidth || this.desc!=\'\') {'+
          'var t = document.getElementById(\'x-form-el-title-note\');'+
          ' theEvent = window.event || event; t.style.display=\'\';'+
          ' var p = this.parentElement;while(p){if (p.tagName==\'FORM\'){break;}p = p.parentElement;}'+
          't.style.left=(theEvent.clientX+p.scrollLeft)+\'px\';'+
          't.style.top=(theEvent.clientY+p.scrollTop)+\'px\';'+
          'if(this.desc==\'\')t.innerHTML=\'<b>{1}</b>\'; else t.innerHTML=\'<b>{1}:</b><br>\'+this.desc+\'\'; '+
          'var w = (t.clientWidth||t.offsetWidth);'+
         	't.style.width = w>200?200:(w+5);}" '+
          'onmouseout="document.getElementById(\'x-form-el-title-note\').style.display=\'none\';" class="x-form-item-label">{1}{4}</label>',
          '<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
          '</div><div class="{6}"></div>',
      '</div>'
  ),
  // private
  renderItem : function(c, position, target){
      if(c && !c.rendered && c.isFormField && c.inputType != 'hidden'){
         var args = [
                 c.id, c.fieldLabel,
                 c.labelStyle||this.labelStyle||'',
                 this.elementStyle||'',
                 typeof c.labelSeparator == 'undefined' ? this.labelSeparator : c.labelSeparator,
                 (c.itemCls||this.container.itemCls||'') + (c.hideLabel ? ' x-hide-label' : ''),
                 c.clearCls || 'x-form-clear-left',
                 (typeof c.desc=='undefined') ? "" : c.desc//�ֶ�����
          ];

          if(typeof position == 'number'){
              position = target.dom.childNodes[position] || null;
          }
          if(position){
              this.fieldTpl.insertBefore(position, args);
          }else{
              this.fieldTpl.append(target, args);
          }
          c.render('x-form-el-'+c.id);
      }else {
          Ext.layout.FormLayout.superclass.renderItem.apply(this, arguments);
      }
  }
});


Ext.override(Ext.form.FormPanel, {
	titleTipEnable:false,
	 // private
    onRender : function(ct, position){
        this.initFields();
				
        Ext.FormPanel.superclass.onRender.call(this, ct, position);
        this.form.initEl(this.body);
        var alertNote = this.body.createChild({tag:'div',id:'x-form-el-title-note',style:"display:none;position:absolute;border:1px #99bbe8 solid;background-color: #ffffff;font-size:9pt;padding:2px;z-index:99999;"});
    }

});

// ��ext2.2��ʾ������
Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype ={
    init : function(grid){
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    onMouseDown : function(e, t){
        if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
        }
    },

    renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td'; 
        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
    }
};

Ext.LoadMask.prototype.msg = '���ڼ������ݣ����Ժ�...';

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
});

//���� ext�е�applySort��ʹ���ַ�������ĸ��˳������
Ext.data.Store.prototype.sortData=function(f, direction){
  direction = direction || 'ASC';
  var st = this.fields.get(f).sortType;
  var fn = function(r1, r2){
    var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
		if(typeof(v1) == "string"){ //��Ϊ�ַ�����
			return v1.localeCompare(v2);//���ñ����ض���˳�����ȽϺ����ַ���, Firefox �� IE ��֧��
		}
    return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
  };
  this.data.sort(direction, fn);
  if(this.snapshot && this.snapshot != this.data){
      this.snapshot.sort(direction, fn);
  }
};

Ext.override(Ext.form.DateField, {
	precision:'',
	initComponent : function(){
        Ext.form.DateField.superclass.initComponent.call(this);
        if(typeof this.minValue == "string"){
            this.minValue = this.parseDate(this.minValue);
        }
        if(typeof this.maxValue == "string"){
            this.maxValue = this.parseDate(this.maxValue);
        }
        this.ddMatch = null;
        this.initDisabledDays();
        
        if (this.precision=='y' || this.precision=='Y' ) {
        	this.format = "Y";
        } else if (this.precision=='m' || this.precision=='M') {
        	this.format = "Y-m";
        } else if (this.precision=='d' || this.precision=='D') {
        	this.format = "Y-m-d";
        } else if (this.precision=='t' || this.precision=='T') {
        	this.format = "Y-m-d H:i:s";
        }
    },
    
    
    parseDate : function(value){
        if(!value || Ext.isDate(value)){
            return value;
        }
        
        if (this.precision=='y' || this.precision=='Y' ) {
        	if (value.length>4)
        		value = value.substring(0,4);
        	else if (value.length < 4) {
        		while(value.length <4)
        			value += "0";
        	}
        } else if (this.precision=='m' || this.precision=='M') {
        	if (value.length>7)
        		value = value.substring(0,7);
        	else if (value.length < 7) {
        		while(value.length < 7) {
	        		if (value.length == 4)
	        			value += "-";
	        		else if (value.length == 6)
	        			value += "1";
	        		else
        				value += "0";
        		}
        	}
        } else if (this.precision=='d' || this.precision=='D') {
        	if (value.length > 10)
        		value = value.substring(0,10);
        	else if (value.length < 10) {
        		while(value.length < 10) {
	        		if (value.length == 4 || value.length == 7)
	        			value += "-";
	        		else if (value.length == 6)
	        			value += "1";
	        		else if (value.length == 9)
	        			value += "1";
	        		else
        				value += "0";
        		}
        	}
        } else if (this.precision=='t' || this.precision=='T') {
        	if (value.length > 19)
        		value = value.substring(0,19);
        	else if (value.length < 19) {
        		while(value.length < 19) {
	        		if (value.length == 4 || value.length == 7)
	        			value += "-";
	        		else if (value.length == 6)
	        			value += "1";
	        		else if (value.length == 9)
	        			value += "1";
	        		else if (value.length == 13 || value.length == 16)
	        			value += ":";
	        		else if (value.length == 10)
	        			value += " ";
	        		else
        				value += "0";
        		}
        	}
        }
        
        var v = Date.parseDate(value, this.format);
        if(!v && this.altFormats){
            if(!this.altFormatsArray){
                this.altFormatsArray = this.altFormats.split("|");
            }
            for(var i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
                v = Date.parseDate(value, this.altFormatsArray[i]);
            }
        }
        return v;
    },
    
    
	onTriggerClick : function(){
		        
		if(this.disabled){
		    return;
		}
		if(this.menu == null){
		    this.menu = new Ext.menu.DateMenu();
		}
		Ext.apply(this.menu.picker,  {
		    minDate : this.minValue,
		    maxDate : this.maxValue,
		    precision : this.precision,
		    disabledDatesRE : this.ddMatch,
		    disabledDatesText : this.disabledDatesText,
		    disabledDays : this.disabledDays,
		    disabledDaysText : this.disabledDaysText,
		    format : this.format,
		    showToday : this.showToday,
		    minText : String.format(this.minText, this.formatDate(this.minValue)),
		    maxText : String.format(this.maxText, this.formatDate(this.maxValue))
		});
		this.menu.on(Ext.apply({}, this.menuListeners, {
		    scope:this
		}));
		this.menu.picker.setValue(this.getValue() || new Date());
		this.menu.show(this.el, "tl-bl?");
    }
});

Ext.override(Ext.DatePicker, {
	tomonthText:'����',
	toyearText:'����',
	precision:'d',
    initComponent : function(){
        Ext.DatePicker.superclass.initComponent.call(this);

        this.value = this.value ? this.value : new Date();

        this.addEvents(
            'select'
        );

        if(this.handler){
            this.on("select", this.handler,  this.scope || this);
        }
        
        this.initDisabledDays();
    },
        
    setValue : function(value){
        var old = this.value;
        this.value = value;
        if(this.el){
            this.update(this.value);
        }
    },
    // private
    onRender : function(container, position){
    	
    	//==============����Ϊ��Ĵ���
    	if (this.precision=='y' || this.precision=='Y') {
    		var buf = ['<table  border="0" cellspacing="0">',
                '<tr><td class="x-date-left" height="30"><a href="#" title="">&#160;</a></td>',
                '<td class="x-date-middle" align="center"></td>',
                '<td class="x-date-right"><a href="#" title="">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table cellspacing="0" width="150" height="150"><tbody><tr>'];
            for(var i = 0; i < 12; i++) {
	            if(i % 3 == 0 && i != 0){
	                buf[buf.length] = "</tr><tr>";
	            }
	            buf[buf.length] = '<td class="x-date-yp"><a href="#">2123</a></td>';
	        }
	        buf.push('</tr><tr><td colspan="3" class="x-date-bottom" align="center" height="30"></td></tr>');

	        buf.push('</tbody></table></td></tr>');
	        
    		var el = document.createElement("div");
	        el.className = "x-date-picker";
	        el.innerHTML = buf.join("");
	
	        container.dom.insertBefore(el, position);
	
	        this.el = Ext.get(el);
	        this.eventEl = Ext.get(el.firstChild);
        	this.eventEl.on("click", this.onYearClick,  this);
        	this.eventEl.on("dblclick", this.onYearDblClick,  this);
        	
        	var today = (new Date()).dateFormat(this.format);
            this.todayBtn = new Ext.Button({
                renderTo: this.el.child("td.x-date-bottom", true),
                text: String.format(this.toyearText, today),
                tooltip: String.format(this.todayTip, today),
                handler: this.selectToday,
                scope: this
            });
            
        	this.ypSelYear = (this.activeDate || this.value).getFullYear();
        	this.ypYears = this.eventEl.select('td.x-date-yp');
        	this.ypTitle = this.el.child('td.x-date-middle');
        	this.updateYPYear(this.ypSelYear);
    		return;
    	} 
    	
    	//=============����Ϊ�µĴ���
    	else if (this.precision=='m' || this.precision=='M'){
    		var buf = ['<table  border="0" cellspacing="0">',
                '<tr><td class="x-date-left" height="30"><a href="#" title="">&#160;</a></td>',
                '<td class="x-date-middle" align="center"></td>',
                '<td class="x-date-right"><a href="#" title="">&#160;</a></td></tr>',
                '<tr><td colspan="4"><table cellspacing="0" width="180" height="180"><tbody><tr>'];
            for(var i = 0; i < 12; i++) {
	            if(i % 4 == 0 && i != 0){
	                buf[buf.length] = "</tr><tr>";
	            }
	            buf[buf.length] = '<td class="x-date-yp"><a href="#"></a></td>';
	        }
	        buf.push("</tr><tr>");
            for(var i = 0; i < 12; i++){
            	if(i % 4 == 0 && i != 0){
	                buf.push("</tr><tr>");
	            }
	            if (i < 4){
	            		buf.push('<td class="x-date-ymp x-date-ymp-sep"><a href="#">', this.monthNames[i].substr(0, 3), '</a></td>');
							}else{
                	buf.push('<td class="x-date-ymp"><a href="#">', this.monthNames[i].substr(0, 3), '</a></td>');
              }
            }
            buf.push("</tr>");
	        buf.push('</tr><tr><td colspan="4" class="x-date-bottom" align="center" height="30"></td></tr>');
            
            
    		var el = document.createElement("div");
	        el.className = "x-date-picker";
	        el.innerHTML = buf.join("");
	
	        container.dom.insertBefore(el, position);
	
	        this.el = Ext.get(el);
	        this.eventEl = Ext.get(el.firstChild);
        	this.eventEl.on("click", this.onYearClick,  this);
        	this.eventEl.on("dblclick", this.onYearDblClick,  this);
        	
        	var today = (new Date()).dateFormat(this.format);
            this.todayBtn = new Ext.Button({
                renderTo: this.el.child("td.x-date-bottom", true),
                text: String.format(this.tomonthText, today),
                tooltip: String.format(this.todayTip, today),
                handler: this.selectToday,
                scope: this
            });
    
            this.ypYears = this.eventEl.select('td.x-date-yp');
            this.ypSelYear = (this.activeDate || this.value).getFullYear();
            this.ypTitle = this.el.child('td.x-date-middle');
            
            this.ypSelMonth = (this.activeDate || this.value).getMonth();
	    this.ypMonths = this.eventEl.select('td.x-date-ymp');
            this.ypMonths.each(function(m, a, i){
                m.dom.xmonth = i;
            });
            this.updateYPYear(this.ypSelYear);
            return;
    	}
    	
    	
		if (this.precision=='t') {
    		this.showTimePanel = true;
    	} else {
    		this.showTimePanel = false;
    	}
    	
        var m = [
             '<table cellspacing="0">',
                '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var dn = this.dayNames;
        for(var i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push("<th><span>", dn[d].substr(0,1), "</span></th>");
        }
        m[m.length] = "</tr></thead><tbody><tr>";
        for(var i = 0; i < 42; i++) {
            if(i % 7 == 0 && i != 0){
                m[m.length] = "</tr><tr>";
            }
           
            m[m.length] = '<td class="y-date-date"><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }
        m.push('</tr></tbody></table></td></tr>');
        if (this.showTimePanel) {
        	m.push('<tr><td colspan="3" class="x-time-inner"><table  cellspacing="0" width="100%">');
        	
        	m.push('<tr><td class="x-hour-bottom"></td>');
        	m.push('<td class="x-time-text"><span>:</span></td>');
        	m.push('<td class="x-minute-bottom"></td>');
        	m.push('<td class="x-time-text"><span>:</span></td>');
        	m.push('<td class="x-second-bottom"></td>');
        	m.push('<td class="y-date-btn-okday" align="center"></td></tr>');
        	
        	
        	m.push('<tr>');
        	m.push('<td align="center"><table cellspacing="0"><tr><td class="x-hour-btn"><a class="x-hour-btn-prev" title="��һСʱ">&#160;</a></td><td class="x-hour-btn"><a class="x-hour-btn-next" title="��һСʱ">&#160;</a></td></tr></table></td>');
        	m.push('<td class="x-time-text">&#160;</td>');
        	m.push('<td align="center"><table cellspacing="0"><tr><td class="x-minute-btn"><a class="x-minute-btn-prev" title="��һ����">&#160;</a></td><td class="x-minute-btn"><a class="x-minute-btn-next" title="��һ����">&#160;</a></td></tr></table></td>');
        	m.push('<td class="x-time-text">&#160;</td>');
        	m.push('<td align="center"><table cellspacing="0"><tr><td class="x-second-btn"><a class="x-second-btn-prev" title="��һ��">&#160;</a></td><td class="x-second-btn"><a class="x-second-btn-next" title="��һ��">&#160;</a></td></tr></table></td>');
		m.push('<td class="x-date-btn-today" align="center"></td></tr>');
		m.push('</tr>');
        	
        	m.push('</table></td></tr>'); 
        	
        } else {
        	m.push(this.showToday ? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>' : '');
        }
        m.push('</table><div class="x-date-mp"></div><div class="x-time-hp"></div><div class="x-time-mp"></div><div class="x-time-sp"></div>');

        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");

        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.eventEl = Ext.get(el.firstChild);

        new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });
        
        ///=============hour btn
        if (this.showTimePanel) {
	        new Ext.util.ClickRepeater(this.el.child("td.x-hour-btn a.x-hour-btn-prev"), {
	            handler: this.showPrevHour,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
	        new Ext.util.ClickRepeater(this.el.child("td.x-hour-btn a.x-hour-btn-next"), {
	            handler: this.showNextHour,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
	        
	        ///=============minute btn
	        new Ext.util.ClickRepeater(this.el.child("td.x-minute-btn a.x-minute-btn-prev"), {
	            handler: this.showPrevMinute,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
	        new Ext.util.ClickRepeater(this.el.child("td.x-minute-btn a.x-minute-btn-next"), {
	            handler: this.showNextMinute,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
	        
	        ///=============second btn
	        new Ext.util.ClickRepeater(this.el.child("td.x-second-btn a.x-second-btn-prev"), {
	            handler: this.showPrevSecond,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
	        new Ext.util.ClickRepeater(this.el.child("td.x-second-btn a.x-second-btn-next"), {
	            handler: this.showNextSecond,
	            scope: this,
	            preventDefault:true,
	            stopDefault:true
	        });
		}

        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        
        var kn = new Ext.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.el.unselectable();
        
        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new Ext.Button({
            text: "&#160;",
            tooltip: this.monthYearText,
            renderTo: this.el.child("td.x-date-middle", true)
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");

        if(this.showToday){
            this.todayKeyListener = this.eventEl.addKeyListener(Ext.EventObject.SPACE, this.selectToday,  this);
            var today = (new Date()).dateFormat(this.format);
            
            if(this.showTimePanel) {
            	this.eventEl.on("click", this.onDayClick,  this, {delegate: "a.x-date-date"});
            	this.todayBtn = new Ext.Button({
	                renderTo: this.el.child("td.x-date-btn-today", true),
	                text: String.format(this.todayText, today),
	                tooltip: String.format(this.todayTip, today),
	                handler: this.selectToday,
	                scope: this
	            });
	          okdayBtn = new Ext.Button({
	                renderTo: this.el.child("td.y-date-btn-okday", true),
	                text: String.format(this.okText, 'okday'),
	                //tooltip: String.format(this.todayTip, today),
	                handler: this.selectOkday,
	                scope: this
	            });
            } else {
            
            	this.eventEl.on("click", this.handleDateClick,  this, {delegate: "a.x-date-date"});
            	this.todayBtn = new Ext.Button({
	                renderTo: this.el.child("td.x-date-bottom", true),
	                text: String.format(this.todayText, today),
	                tooltip: String.format(this.todayTip, today),
	                handler: this.selectToday,
	                scope: this
	            });
          	}
            
        }
        if (this.showTimePanel) {
	        ///============hourPicker
			this.hourPicker = this.el.down('div.x-time-hp');
			this.hourPicker.enableDisplayMode('block');
			this.hourBtn = new Ext.Button({
	            text: "&#160;",
	            tooltip: this.hourText,
	            renderTo: this.el.child("td.x-hour-bottom", true)
	        });
			this.hourBtn.on('click', this.showHourPicker, this);
			this.hourBtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");
	        
	        ///============minutePicker
			this.minutePicker = this.el.down('div.x-time-mp');
			this.minutePicker.enableDisplayMode('block');
	        this.minuteBtn = new Ext.Button({
	            text: "&#160;",
	            tooltip: this.minuteText,
	            renderTo: this.el.child("td.x-minute-bottom", true)
	        });
			this.minuteBtn.on('click', this.showMinutePicker, this);
	      	this.minuteBtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");
	          
			///============secondPicker
			this.secondPicker = this.el.down('div.x-time-sp');
			this.secondPicker.enableDisplayMode('block');
			this.secondBtn = new Ext.Button({
	            text: "&#160;",
	            tooltip: this.secondText,
	            renderTo: this.el.child("td.x-second-bottom", true)
	        });
			this.secondBtn.on('click', this.showSecondPicker, this);
	      	this.secondBtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");
		}
		
        
        if(Ext.isIE){
            this.el.repaint();
        }

        this.update(this.value);
        
        
    },
    
     // private
    onYearClick : function(e, t){
        e.stopEvent();
		
        var el = new Ext.Element(t), pn;
        if(pn = el.up('td.x-date-yp', 2)){
            this.ypYears.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.ypSelYear = pn.dom.xyear;
        } else if(pn = el.up('td.x-date-ymp', 2)){
            this.ypMonths.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.ypSelMonth = pn.dom.xmonth;
        } else if(el.up('td.x-date-left', 2)){
            this.updateYPYear(this.ypyear-12);
        } else if(el.up('td.x-date-right', 2)){
            this.updateYPYear(this.ypyear+12);
        }
    },
    
    onDayClick : function(e, t){
        e.stopEvent();
        if(t.dateValue && !Ext.fly(t.parentNode).hasClass("x-date-disabled")){
            this.setValue(new Date(t.dateValue));
        }
    },
    selectOkday : function(){
    			var _d = (this.activeDate || this.value);
        	this.setValue(_d);
	      	this.fireEvent("select", this,this.value);
    },
    onYearDblClick : function(e, t){
    	e.stopEvent();
        var el = new Ext.Element(t), pn;
        var sm = this.ypSelMonth || (this.activeDate || this.value).getMonth();
        if(pn = el.up('td.x-date-yp', 2)){
        	var sd = new Date(this.ypSelYear, sm , (this.activeDate || this.value).getDate());
            this.setValue(sd.clearTime());
	        this.fireEvent("select", this, this.value);
        } else if(pn = el.up('td.x-date-ymp', 2)){
        	var sd = new Date(this.ypSelYear, sm , (this.activeDate || this.value).getDate());
            this.setValue(sd.clearTime());
	        this.fireEvent("select", this, this.value);
        }
    },
    
    updateYPYear : function(y){
    	this.ypyear = y;
    	this.ypTitle.dom.innerHTML=(y-4)+"~"+(y+7);
        var ys = this.ypYears.elements;
        for(var i = 0; i < 12; i++){
            var td = ys[i], y2;
            y2 = y + i - 4;
            td.firstChild.innerHTML = y2;
            td.xyear = y2;
            this.ypYears.item(i)[y2 == this.ypSelYear ? 'addClass' : 'removeClass']('x-date-mp-sel');
        }
        
        if (this.ypMonths) {
	        for(var i = 0; i < 12; i++){
	        	var m = this.ypMonths.item(i);
	        	m[m.dom.xmonth == this.ypSelMonth ? 'addClass' : 'removeClass']('x-date-mp-sel');
	        }
	    }
	},
    
    ////=================================hourPicker=====================
    // private
    showHourPicker : function(){
        this.createHourPicker();
        var size = this.el.getSize();
        this.hourPicker.setSize(size);
        this.hourPicker.child('table').setSize(size);

        this.selectHour = (this.activeDate || this.value).getHours();
        this.updateHour(this.selectHour);

        this.hourPicker.slideIn('t', {duration:.2});
    },
    // private
    createHourPicker : function(){
        if(!this.hourPicker.dom.firstChild){
            var buf = ['<table border="0" cellspacing="0">'];
            for(var i = 0; i < 6; i++){
				var _v = i*4;
                buf.push(
                    '<tr><td class="x-time-hp-text"><a href="#">', (_v<10?('0'+_v):_v), '</a></td>',
                    '<td class="x-time-hp-text"><a href="#">', (_v+1)<10?'0'+(_v+1):(_v+1), '</a></td>',
                    '<td class="x-time-hp-text"><a href="#">', (_v+2)<10?'0'+(_v+2):(_v+2), '</a></td>',
                    '<td class="x-time-hp-text"><a href="#">', (_v+3)<10?'0'+(_v+3):(_v+3), '</a></td></tr>'
                );
            }
            buf.push(
                '<tr class="x-time-hp-btns"><td colspan="4"><button type="button" class="x-time-hp-ok">',
                    this.okText,
                    '</button><button type="button" class="x-time-hp-cancel">',
                    this.cancelText,
                    '</button></td></tr>',
                '</table>'
            );
            this.hourPicker.update(buf.join(''));
            this.hourPicker.on('click', this.onHourClick, this);
            this.hourPicker.on('dblclick', this.onHourDblClick, this);

            this.hpHours = this.hourPicker.select('td.x-time-hp-text');

            this.hpHours.each(function(m, a, i){
                //i += 1;
                m.dom.xmonth = i;
            });
        }
    },
    // private
    updateHour : function(sh){
        this.hpHours.each(function(m, a, i){
            m[m.dom.xmonth == sh ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },
    
    // private
    onHourClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(el.is('button.x-time-hp-cancel')){
            this.hideHourPicker();
        }
        else if(el.is('button.x-time-hp-ok')){
        	var _d = (this.activeDate || this.value);
            var d = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),this.selectHour,_d.getMinutes(),_d.getSeconds());
            if(d.getHours() != this.selectHour){
                // "fix" the JS rolling date conversion if needed
                //d = new Date(this.mpSelYear, this.mpSelMonth, 1).getLastDateOfMonth();
            }
            this.update(d,true);
            this.hideHourPicker();
        }
        else if(pn = el.up('td.x-time-hp-text', 2)){
            this.hpHours.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.selectHour = pn.dom.xmonth;
        }
    },

    // private
    onHourDblClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(pn = el.up('td.x-time-hp-text', 2)){
        	var _d = (this.activeDate || this.value);
        	
            this.update(new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),this.selectHour,_d.getMinutes(),_d.getSeconds()),true);
            this.hideHourPicker();
        }
    },

    // private
    hideHourPicker : function(disableAnim){
        if(this.hourPicker){
            if(disableAnim === true){
                this.hourPicker.hide();
            }else{
                this.hourPicker.slideOut('t', {duration:.2});
            }
        }
    },

    // private
    showPrevHour : function(e){
        this.update(this.activeDate.add("h", -1),true);
    },

    // private
    showNextHour : function(e){
        this.update(this.activeDate.add("h", 1),true);
    },
	////=================================hourPicker===================== end

	

	////=================================minutePicker=====================
	showMinutePicker : function(){
        this.createMinutePicker();
        var size = this.el.getSize();
        this.minutePicker.setSize(size);
        this.minutePicker.child('table').setSize(size);

        this.selectMinute = (this.activeDate || this.value).getMinutes();
        this.updateMinute(this.selectMinute);

        this.minutePicker.slideIn('t', {duration:.2});
    },
    // private
    createMinutePicker : function(){
        if(!this.minutePicker.dom.firstChild){
            var buf = ['<table border="0" cellspacing="0">'];
            for(var i = 0; i < 8; i++){
            	buf.push('<tr>');
            	var _rs = i*8;
				for(var j = 0; j < 8; j++){
					if ( (_rs+j) > 59)
						buf.push('<td>&#160;</td>');
					else
	                	buf.push('<td class="x-time-mp-text"><a href="#">', (_rs+j), '</a></td>');
				}
				buf.push('</tr>');
            }
            buf.push(
                '<tr class="x-time-mp-btns"><td colspan="8"><button type="button" class="x-time-mp-ok">',
                    this.okText,
                    '</button><button type="button" class="x-time-mp-cancel">',
                    this.cancelText,
                    '</button></td></tr>',
                '</table>'
            );
            this.minutePicker.update(buf.join(''));
            this.minutePicker.on('click', this.onMinuteClick, this);
            this.minutePicker.on('dblclick', this.onMinuteDblClick, this);

            this.mpMinutes = this.minutePicker.select('td.x-time-mp-text');

            this.mpMinutes.each(function(m, a, i){
                m.dom.xmonth = i;
            });
        }
    },
    // private
    updateMinute : function(sh){
        this.mpMinutes.each(function(m, a, i){
            m[m.dom.xmonth == sh ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },
    
    // private
    onMinuteClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(el.is('button.x-time-mp-cancel')){
            this.hideMinutePicker();
        }
        else if(el.is('button.x-time-mp-ok')){
        	var _d = (this.activeDate || this.value);
            var d = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),_d.getHours(),this.selectMinute,_d.getSeconds());
            
            this.update(d,true);
            this.hideMinutePicker();
        }
        else if(pn = el.up('td.x-time-mp-text', 2)){
            this.mpMinutes.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.selectMinute = pn.dom.xmonth;
        }
    },

    // private
    onMinuteDblClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(pn = el.up('td.x-time-mp-text', 2)){
        	var _d = (this.activeDate || this.value);
        	
            this.update(new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),_d.getHours(),this.selectMinute,_d.getSeconds()),true);
            this.hideMinutePicker();
        }
    },

    // private
    hideMinutePicker : function(disableAnim){
        if(this.minutePicker){
            if(disableAnim === true){
                this.minutePicker.hide();
            }else{
                this.minutePicker.slideOut('t', {duration:.2});
            }
        }
    },

    // private
    showPrevMinute : function(e){
        this.update(this.activeDate.add("mi", -1),true);
    },

    // private
    showNextMinute : function(e){
        this.update(this.activeDate.add("mi", 1),true);
    },
    ////=================================minutePicker===================== end

	
	////=================================secondPicker=====================
	showSecondPicker : function(){
        this.createSecondPicker();
        var size = this.el.getSize();
        this.secondPicker.setSize(size);
        this.secondPicker.child('table').setSize(size);

        this.selectSecond = (this.activeDate || this.value).getSeconds();
        this.updateSecond(this.selectSecond);

        this.secondPicker.slideIn('t', {duration:.2});
    },
    // private
    createSecondPicker : function(){
        if(!this.secondPicker.dom.firstChild){
            var buf = ['<table border="0" cellspacing="0">'];
            for(var i = 0; i < 8; i++){
            	buf.push('<tr>');
            	var _rs = i*8;
				for(var j = 0; j < 8; j++){
					if ( (_rs+j) > 59)
						buf.push('<td>&#160;</td>');
					else
	                	buf.push('<td class="x-time-sp-text"><a href="#">', (_rs+j), '</a></td>');
				}
				buf.push('</tr>');
            }
            buf.push(
                '<tr class="x-time-sp-btns"><td colspan="8"><button type="button" class="x-time-sp-ok">',
                    this.okText,
                    '</button><button type="button" class="x-time-sp-cancel">',
                    this.cancelText,
                    '</button></td></tr>',
                '</table>'
            );
            this.secondPicker.update(buf.join(''));
            this.secondPicker.on('click', this.onSecondClick, this);
            this.secondPicker.on('dblclick', this.onSecondDblClick, this);

            this.spSeconds = this.secondPicker.select('td.x-time-sp-text');

            this.spSeconds.each(function(m, a, i){
                m.dom.xmonth = i;
            });
        }
    },
    // private
    updateSecond : function(sh){
        this.spSeconds.each(function(m, a, i){
            m[m.dom.xmonth == sh ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },
    
    // private
    onSecondClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(el.is('button.x-time-sp-cancel')){
            this.hideSecondPicker();
        }
        else if(el.is('button.x-time-sp-ok')){
        	var _d = (this.activeDate || this.value);
            var d = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),_d.getHours(),_d.getMinutes(),this.selectSecond);
            
            this.update(d,true);
            this.hideSecondPicker();
        }
        else if(pn = el.up('td.x-time-sp-text', 2)){
            this.spSeconds.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.selectSecond = pn.dom.xmonth;
        }
    },

    // private
    onSecondDblClick : function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if(pn = el.up('td.x-time-sp-text', 2)){
        	var _d = (this.activeDate || this.value);
        	
            this.update(new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(),_d.getHours(),_d.getMinutes(),this.selectSecond),true);
            this.hideSecondPicker();
        }
    },

    // private
    hideSecondPicker : function(disableAnim){
        if(this.secondPicker){
            if(disableAnim === true){
                this.secondPicker.hide();
            }else{
                this.secondPicker.slideOut('t', {duration:.2});
            }
        }
    },

    // private
    showPrevSecond : function(e){
        this.update(this.activeDate.add("s", -1),true);
    },

    // private
    showNextSecond : function(e){
        this.update(this.activeDate.add("s", 1),true);
    },
    ////=================================minutePicker===================== end

	// private
    selectToday : function(){
        if(this.todayBtn && !this.todayBtn.disabled){
	        this.setValue(new Date());
	        this.fireEvent("select", this, this.value);
        }
    },
    
    // private
    update : function(date, forceRefresh){
    	
		if (!this.cells)
			return;
			
			
        var vd = this.activeDate;
        this.activeDate = date;
        if(!forceRefresh && vd && this.el){
            var t = date.getTime();
            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                this.cells.removeClass("x-date-selected");
                this.cells.each(function(c){
                   if(c.dom.firstChild.dateValue == t){
                       c.addClass("x-date-selected");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return false;
                   }
                });
                return;
            }
        }
        
        var days = date.getDaysInMonth();
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;

        if(startingPos <= this.startDay){
            startingPos += 7;
        }

        var pm = date.add("mo", -1);
        var prevStart = pm.getDaysInMonth()-startingPos;

        var cells = this.cells.elements;
        var textEls = this.textNodes;
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = new Date(pm.getFullYear(), pm.getMonth(), prevStart,pm.getHours(),pm.getMinutes(),pm.getSeconds());
        var today = new Date().getTime();
        var sel = date.getTime();
        var min = this.minDate ? this.minDate : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;
        
        if(this.showToday){
            var td = new Date();
            var disable = (td < min || td > max || 
                (ddMatch && format && ddMatch.test(td.dateFormat(format))) || 
                (ddays && ddays.indexOf(td.getDay()) != -1));
                        
            this.todayBtn.setDisabled(disable);
            this.todayKeyListener[disable ? 'disable' : 'enable']();
            
            
        }
        
        var setCellClass = function(cal, cell){
            cell.title = "";
            var t = d.getTime();
            cell.firstChild.dateValue = t;
            if(t == today){
                cell.className += " x-date-today";
                cell.title = cal.todayText;
            }
            if(t == sel){
                cell.className += " x-date-selected";
                setTimeout(function(){
                    try{cell.firstChild.focus();}catch(e){}
                }, 50);
            }
            // disabling
            if(t < min) {
                cell.className = " x-date-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " x-date-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " x-date-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " x-date-disabled";
                }
            }
        };

        var i = 0;
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-prevday";
            setCellClass(this, cells[i]);
        }
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        for(; i < 42; i++) {
             textEls[i].innerHTML = (++extraDays);
             d.setDate(d.getDate()+1);
             cells[i].className = "x-date-nextday";
             setCellClass(this, cells[i]);
        }

        this.mbtn.setText(this.monthNames[date.getMonth()] + " " + date.getFullYear());
        
        if(this.showTimePanel) {
			this.hourBtn.setText(date.getHours()<10?"0"+date.getHours():date.getHours());
	        this.minuteBtn.setText(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes());
	        this.secondBtn.setText(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
		}
		
        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Ext.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Ext.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
        
    }

});

//fix EditorGridPanel disorder bugs
Ext.override(Ext.grid.GridView, {
	initTemplates : function(){
		var ts = this.templates || {};
		if(!ts.master){
			ts.master = new Ext.Template(
				'<div class="x-grid3" hidefocus="true">',
					'<div class="x-grid3-viewport">',
						'<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
						'<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
					'</div>',
					'<div class="x-grid3-resize-marker">&nbsp;</div>',
					'<div class="x-grid3-resize-proxy">&nbsp;</div>',
				'</div>'
			);
		}
		if(!ts.header){
			ts.header = new Ext.Template(
				'<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
				'<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
				'</table>'
			);
		}
		if(!ts.hcell){
			ts.hcell = new Ext.Template(
				'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">', this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : '',
				'{value}<img class="x-grid3-sort-icon" src="', Ext.BLANK_IMAGE_URL, '" />',
				'</div></td>'
			);
		}
		if(!ts.body){
			ts.body = new Ext.Template('{rows}');
		}
		if(!ts.row){
			ts.row = new Ext.Template(
				'<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
				'<tbody><tr>{cells}</tr>',
				(this.enableRowBody ? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>' : ''),
				'</tbody></table></div>'
			);
		}
		if(!ts.cell){
			ts.cell = new Ext.Template(
				'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
				'<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
				'</td>'
			);
		}
		for(var k in ts){
			var t = ts[k];
			if(t && typeof t.compile == 'function' && !t.compiled){
				t.disableFormats = true;
				t.compile();
			}
		}
		this.templates = ts;
		this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "");
	},
	updateAllColumnWidths : function(){
		var tw = this.getTotalWidth();
		var clen = this.cm.getColumnCount();
		var ws = [];
		for(var i = 0; i < clen; i++){
			ws[i] = this.getColumnWidth(i);
		}
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = tw;
		this.mainBody.dom.style.width = tw;
		for(var i = 0; i < clen; i++){
			var hd = this.getHeaderCell(i);
			hd.style.width = ws[i];
		}
		var ns = this.getRows(), row, trow;
		for(var i = 0, len = ns.length; i < len; i++){
			row = ns[i];
			row.style.width = tw;
			if(row.firstChild){
				row.firstChild.style.width = tw;
				trow = row.firstChild.rows[0];
				for (var j = 0; j < clen; j++) {
					trow.childNodes[j].style.width = ws[j];
				}
			}
		}
		this.onAllColumnWidthsUpdated(ws, tw);
	},
	updateColumnWidth : function(col, width){
		var w = this.getColumnWidth(col);
		var tw = this.getTotalWidth();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = tw;
		this.mainBody.dom.style.width = tw;
		var hd = this.getHeaderCell(col);
		hd.style.width = w;
		var ns = this.getRows(), row;
		for(var i = 0, len = ns.length; i < len; i++){
			row = ns[i];
			row.style.width = tw;
			if(row.firstChild){
				row.firstChild.style.width = tw;
				row.firstChild.rows[0].childNodes[col].style.width = w;
			}
		}
		this.onColumnWidthUpdated(col, w, tw);
	},
	updateColumnHidden : function(col, hidden){
		var tw = this.getTotalWidth();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = tw;
		this.mainBody.dom.style.width = tw;
		var display = hidden ? 'none' : '';
		var hd = this.getHeaderCell(col);
		hd.style.display = display;
		var ns = this.getRows(), row;
		for(var i = 0, len = ns.length; i < len; i++){
			row = ns[i];
			row.style.width = tw;
			if(row.firstChild){
				row.firstChild.style.width = tw;
				row.firstChild.rows[0].childNodes[col].style.display = display;
			}
		}
		this.onColumnHiddenUpdated(col, hidden, tw);
		delete this.lastViewWidth;
		this.layout();
	},
	afterRender: function(){
		this.mainBody.dom.innerHTML = this.renderRows() || '&nbsp;';
		this.processRows(0, true);
		if(this.deferEmptyText !== true){
			this.applyEmptyText();
		}
	},
	renderUI : function(){
		var header = this.renderHeaders();
		var body = this.templates.body.apply({rows: '&nbsp;'});
		var html = this.templates.master.apply({
			body: body,
			header: header,
			ostyle: 'width:'+this.getOffsetWidth()+';',
			bstyle: 'width:'+this.getTotalWidth()+';'
		});
		var g = this.grid;
		g.getGridEl().dom.innerHTML = html;
		this.initElements();
		Ext.fly(this.innerHd).on("click", this.handleHdDown, this);
		this.mainHd.on("mouseover", this.handleHdOver, this);
		this.mainHd.on("mouseout", this.handleHdOut, this);
		this.mainHd.on("mousemove", this.handleHdMove, this);
		this.scroller.on('scroll', this.syncScroll, this);
		if(g.enableColumnResize !== false){
			this.splitZone = new Ext.grid.GridView.SplitDragZone(g, this.mainHd.dom);
		}
		if(g.enableColumnMove){
			this.columnDrag = new Ext.grid.GridView.ColumnDragZone(g, this.innerHd);
			this.columnDrop = new Ext.grid.HeaderDropZone(g, this.mainHd.dom);
		}
		if(g.enableHdMenu !== false){
			if(g.enableColumnHide !== false){
				this.colMenu = new Ext.menu.Menu({id:g.id + "-hcols-menu"});
				this.colMenu.on("beforeshow", this.beforeColMenuShow, this);
				this.colMenu.on("itemclick", this.handleHdMenuClick, this);
			}
			this.hmenu = new Ext.menu.Menu({id: g.id + "-hctx"});
			this.hmenu.add(
				{id:"asc", text: this.sortAscText, cls: "xg-hmenu-sort-asc"},
				{id:"desc", text: this.sortDescText, cls: "xg-hmenu-sort-desc"}
			);
			if(g.enableColumnHide !== false){
				this.hmenu.add('-',
					{id:"columns", text: this.columnsText, menu: this.colMenu, iconCls: 'x-cols-icon'}
				);
			}
			this.hmenu.on("itemclick", this.handleHdMenuClick, this);
		}
		if(g.trackMouseOver){
			this.mainBody.on("mouseover", this.onRowOver, this);
			this.mainBody.on("mouseout", this.onRowOut, this);
		}
		if(g.enableDragDrop || g.enableDrag){
			this.dragZone = new Ext.grid.GridDragZone(g, {
				ddGroup : g.ddGroup || 'GridDD'
			});
		}
		this.updateHeaderSortState();
	},
	onColumnWidthUpdated : function(col, w, tw){
		// empty
	},
	onAllColumnWidthsUpdated : function(ws, tw){
		// empty
	},
	onColumnHiddenUpdated : function(col, hidden, tw){
		// empty
	},
	getOffsetWidth: function() {
		return (this.cm.getTotalWidth() + this.scrollOffset) + 'px';
	},
	renderBody : function(){
		var markup = this.renderRows() || '&nbsp;';
		return this.templates.body.apply({rows: markup});
	},
	hasRows : function(){
		var fc = this.mainBody.dom.firstChild;
		return fc && fc.nodeType == 1 && fc.className != 'x-grid-empty';
	},
	updateHeaders : function(){
		this.innerHd.firstChild.innerHTML = this.renderHeaders();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = this.getTotalWidth();
	}
});


Ext.override(Ext.form.TextArea, {
 autoSize : function(){
    if(!this.grow || !this.textSizeEl){
        return;
    }
    var el = this.el;
    var v = el.dom.value;
    var ts = this.textSizeEl;
    ts.innerHTML = '';
    ts.appendChild(document.createTextNode(v));
    v = ts.innerHTML;
    Ext.fly(ts).setWidth(this.el.getWidth());
    if(v.length < 1){
        v = "&#160;&#160;";
    }else{
        if(Ext.isIE){
            v = v.replace(/\n/g, '<p>&#160;</p>');
        }
        v += this.growAppend;
    }
    ts.innerHTML = v;
    var h = Math.min(this.growMax, Math.max(ts.offsetHeight, this.growMin)+this.growPad);
    if(h != this.lastHeight){
        this.lastHeight = h;
        this.el.setHeight(h/2+30);
        this.fireEvent("autosize", this, h);
    }
  }
});
