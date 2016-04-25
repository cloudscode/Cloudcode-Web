Ext.apply(Ext.form.field.VTypes, {
    only: function(val, field) {
        var params = "&"+field.name+"="+field.getValue();
        params += "&id="+ field.up('form').getForm().findField("id").getValue();
        return !Request.synRequest(field.url,params);
    },
    onlyText: '内容必须是唯一的，请更换！'
});

Ext.apply(Ext.form.field.VTypes, {
	equals: function(val, field) {
        return field.getValue()==field.previousSibling().getValue();
    },
    equalsText: '内容必须和上一个文本框相同！'
});

Ext.apply(Ext.form.field.VTypes, {  
    idcard : function(pId, field){  
            var arrVerifyCode = [1,0,"x",9,8,7,6,5,4,3,2];  
            var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];  
            var Checker = [1,9,8,7,6,5,4,3,2,1,1];  
            if(pId.length != 15 && pId.length != 18){  
                return false;  
            }  
            var Ai=pId.length==18 ?  pId.substring(0,17)   :   pId.slice(0,6)+"19"+pId.slice(6,16);  
            if (!/^\d+$/.test(Ai)){  
               return false;  
            }  
            var yyyy=Ai.slice(6,10) ,  mm=Ai.slice(10,12)-1  ,  dd=Ai.slice(12,14);  
            var d=new Date(yyyy,mm,dd) ,  now=new Date();  
             var year=d.getFullYear() ,  mon=d.getMonth() , day=d.getDate();  
            if (year!=yyyy || mon!=mm || day!=dd || d>now || year<1940){  
                return false;  
            }  
            for(var i=0,ret=0;i<17;i++)  ret+=Ai.charAt(i)*Wi[i];      
            Ai+=arrVerifyCode[ret %=11];       
            return pId.length ==18 && pId != Ai?false:true;      
    },  
    idcardText : '身份证不合法！'  
});