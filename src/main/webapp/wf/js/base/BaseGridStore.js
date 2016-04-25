Ext.define('com.hh.base.BaseGridStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields:['id'],
    pageSize: static_var.pageSize
});