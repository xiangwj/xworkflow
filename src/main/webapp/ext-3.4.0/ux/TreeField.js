﻿Ext.ns('Ext.form');
Ext.form.TreeField = Ext.extend(Ext.form.TriggerField,{
	readOnly : true , 
	displayField : 'text', 
	valueField : null, 
	hiddenName : null,
	listWidth : null,
	minListWidth : 50, 
	listHeight : null,
	minListHeight : 50,
	dataUrl : null,
	tree : null,
	value : null,
	displayValue : null,
	baseParams : {},   
	rootVisible:null,
  treeRootConfig : {      
        id : ' ',      
        text : '全国',      
        draggable:false     
  },
  defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"}, 
  initComponent : function(){      
    Ext.form.TreeField.superclass.initComponent.call(this);      
    this.addEvents(      
            'select',      
            'expand',      
            'collapse',      
            'beforeselect'           
    );      
	},
  initList : function(){      
      if(!this.list){      
          var cls = 'x-treefield-list';      
   
          this.list = new Ext.Layer({      
              shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false     
          });      
   
          var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);      
          this.list.setWidth(lw);      
          this.list.swallowEvent('mousewheel');      
                
          this.innerList = this.list.createChild({cls:cls+'-inner'});      
          this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));      
          this.innerList.setHeight(this.listHeight || this.minListHeight);      
          if(!this.tree){      
              this.tree = this.createTree(this.innerList);          
          }      
          this.tree.on('click',this.select,this);      
          this.tree.render();      
      }      
  },
  onRender : function(ct, position){      
      Ext.form.TreeField.superclass.onRender.call(this, ct, position);      
      if(this.hiddenName){      
          this.hiddenField = this.el.insertSibling({tag:'input',       
                                                   type:'hidden',       
                                                   name: this.hiddenName,       
                                                   id: (this.hiddenId||this.hiddenName)},      
                  'before', true);      
          this.hiddenField.value =      
              this.hiddenValue !== undefined ? this.hiddenValue :      
              this.value !== undefined ? this.value : '';      
          this.el.dom.removeAttribute('name');      
      }      
      if(Ext.isGecko){      
          this.el.dom.setAttribute('autocomplete', 'off');      
      }      
      this.initList();      
  },
  select : function(node){      
      if(this.fireEvent('beforeselect', node, this)!= false){      
          this.onSelect(node);      
          this.fireEvent('select', this, node);      
      }      
  },
  onSelect:function(node){      
      this.setValue(node);      
      this.collapse();      
  },
  createTree:function(el){      
      var Tree = Ext.tree;      
        
      var tree = new Tree.TreePanel({      
          el:el,      
          autoScroll:true,      
          animate:true,      
          containerScroll: true,    
          rootVisible: this.rootVisible,   
          loader: new Tree.TreeLoader({      
              dataUrl : this.dataUrl,      
              baseParams : this.baseParams      
          })      
      });      
        
      var root = new Tree.AsyncTreeNode(this.treeRootConfig);      
      tree.setRootNode(root);      
      return tree;      
  },
  getValue : function(){      
      if(this.valueField){      
          return typeof this.value != 'undefined' ? this.value : '';      
      }else{      
          return Ext.form.TreeField.superclass.getValue.call(this);      
      }      
  },
  setValue : function(node){      
        //if(!node)return;      
        var text,value;      
        if(node && typeof node == 'object'){      
            text = node[this.displayField];      
            value = node[this.valueField || this.displayField];      
        }else{      
            text = node;      
            value = node;      
                      
        }      
        if(this.hiddenField){      
            this.hiddenField.value = value;      
        }      
        Ext.form.TreeField.superclass.setValue.call(this, text);      
        this.value = value;      
  },
  onResize: function(w, h){      
      Ext.form.TreeField.superclass.onResize.apply(this, arguments);      
      if(this.list && this.listWidth == null){      
          var lw = Math.max(w, this.minListWidth);      
          this.list.setWidth(lw);      
          this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));      
      }      
  },
  validateBlur : function(){      
      return !this.list || !this.list.isVisible();         
  },
  onDestroy : function(){      
      if(this.list){      
          this.list.destroy();      
      }      
      if(this.wrap){      
          this.wrap.remove();      
      }      
      Ext.form.TreeField.superclass.onDestroy.call(this);      
  },
  collapseIf : function(e){      
      if(!e.within(this.wrap) && !e.within(this.list)){      
          this.collapse();      
      }      
  },
  collapse : function(){      
      if(!this.isExpanded()){      
          return;      
      }      
      this.list.hide();      
      Ext.getDoc().un('mousewheel', this.collapseIf, this);      
      Ext.getDoc().un('mousedown', this.collapseIf, this);      
      this.fireEvent('collapse', this);      
  },
  expand : function(){      
      if(this.isExpanded() || !this.hasFocus){      
          return;      
      }      
      this.onExpand();      
      this.list.alignTo(this.wrap, this.listAlign);      
      this.list.show();      
      Ext.getDoc().on('mousewheel', this.collapseIf, this);      
      Ext.getDoc().on('mousedown', this.collapseIf, this);      
      this.fireEvent('expand', this);      
  },
  onExpand : function(){      
      var doc = Ext.getDoc();      
      this.on('click',function(){alert(111)},this);      
  },
  isExpanded : function(){      
      return this.list && this.list.isVisible();      
  },
  onTriggerClick : function(){      
      if(this.disabled){      
          return;      
      }      
      if(this.isExpanded()){      
          this.collapse();      
      }else {      
          this.onFocus({});      
          this.expand();      
      }      
      this.el.focus();      
  }                                    		
});
Ext.reg('treeField', Ext.form.TreeField);    
	