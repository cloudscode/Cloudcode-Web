Ext.define('com.hh.base.BaseFormPanel', {
    extend: 'Ext.form.Panel',
    region: 'center',
    alias : 'widget.baseFormPanel',
    autoScroll: true,
    defaults: {
        labelWidth: 70,
        xtype: 'textfield',
        margin: '5 3 5 3'
    },
    layout: "column",
    bodyPadding: '5 5 0',
    buttons: [{
        iconCls: 'yes',
        text: '保    存',
        handler: function() {
            FormPanel.submit(this.up('form'));
        }
    },
    {
        iconCls: 'cancel',
        text: '取    消',
        handler: function() {
            this.up('window').close();
        }
    }]
});