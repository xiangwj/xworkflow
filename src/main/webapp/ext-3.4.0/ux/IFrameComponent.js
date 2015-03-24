Ext.ns('Ext.ux');
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