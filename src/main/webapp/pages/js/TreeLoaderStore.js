Ext.ns('Ext.data.x'); 
Ext.data.x.TreeLoaderStore = Ext.extend(Ext.data.Store,{
		loader:null,
		rootNode:null,  
    constructor : function(config){   
        Ext.data.x.TreeLoaderStore.superclass.constructor.call(this);   
        this.loader = config.loader;   
        this.rootNode = config.rootNode;   
    },
		load:function(options){   
		  var _self = this;   
		  if(!this.loader || !this.rootNode){   
		      Ext.MessageBox.alert("错误","必须指定loader或者rootNode");   
		      return false;   
		  }   
		  Ext.apply(this.loader.baseParams,{start:options.params.start,limit:options.params.limit}), 
		  this.loader.load(this.rootNode,function(node){   
		      _self.currentCount = _self.loader.currentCount;   
		      _self.totalLength = _self.loader.totalCount;   
		      node.expand();   
		      _self.fireEvent("load",_self,null,options);   
		      delete _self;   
		  });   
		  return true;   
		},
    getCount : function(){   
    	return this.currentCount || 0;   
    },
    getTotalCount : function(){   
    	return this.totalLength || 0;   
    }     		                		
});   