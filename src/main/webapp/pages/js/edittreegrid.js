/*!
 * Ext.ux.tree.EditTreeGrid v1.3
 */
Ext.onReady(function() {
    Ext.QuickTips.init();

    var tree = new Ext.ux.tree.EditTreeGrid({
        title: 'Core Team Projects',
        width: 760,
        height: 300,
        renderTo: Ext.getBody(),
        enableDD: true,
        depth: 5, // 最大节点深度

        columns: [{
            header: 'Task',
            dataIndex: 'task',
            width: 230,
            editor: new Ext.form.TextField({
                allowBlank: false
            })
        }, {
            header: 'Duration',
            width: 100,
            dataIndex: 'duration',
            align: 'center',
            sortType: 'asFloat',
            editor: new Ext.form.NumberField({
                allowBlank: false,
                allowDecimals: true
            })
        }, {
            header: 'Assigned To',
            width: 120,
            dataIndex: 'user',
            editor: new Ext.form.TextField({
                allowBlank: false
            })
        }, {
            header: '排序',
            width: 80,
            buttons: ['upgrade', 'degrade'],
            buttonIconCls: ['x-treegrid-button-upgrade', 'x-treegrid-button-degrade'],
            buttonTips: ['上移', '下移']
        }, {
            header: '新增子分类',
            width: 80,
            buttons: 'add',
            buttonIconCls: 'x-treegrid-button-add',
            buttonTips: '新增'
        }, {
            header: '操作',
            width: 130,
            buttons: ['update', 'remove'],
            buttonText: ['编辑', '删除']
        }],

        //dataUrl: 'treegrid-data.json',

		loader: new Ext.tree.TreeLoader({
	            	dataUrl:'treegrid-data.json' 
	            	//dataUrl:'js/leftTree.json'            
        		}),
				
        requestApi: {
            upgrade: 'treegrid-data.json',
            degrade: 'treegrid-data.json',
            add: 'treegrid-data.json',
            update: 'treegrid-data.json',
            remove: 'treegrid-data.json'
        },
        
        tbar: [{
            text: '新增一级节点',
            handler: function() {
                tree.addNode(tree.getRootNode());
            }
        }] 
    });
});
