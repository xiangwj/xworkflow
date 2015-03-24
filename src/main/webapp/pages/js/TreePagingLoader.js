Ext.ns('Ext.tree.x'); 
Ext.tree.x.TreePagingLoader = Ext.extend(Ext.tree.TreeLoader,{   
    processResponse : function(response, node, callback, scope){   
        var json = response.responseText;   
        try {   
            var o = response.responseData || Ext.decode(json);   
            this.totalCount = o.totalCount;   
            this.currentCount = o.data.length;   
            var o = o.data;   
            node.beginUpdate();   
            for(var i = 0, len = o.length; i < len; i++){   
                var n = this.createNode(o[i]);   
                if(n){   
                    node.appendChild(n);   
                }   
            }   
            node.endUpdate();   
            this.runCallback(callback, scope || node, [node]);   
        }catch(e){   
            this.handleFailure(response);   
        }   
    }   
}) 