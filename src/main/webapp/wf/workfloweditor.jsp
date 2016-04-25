<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.google.gson.Gson"%>

<%
	String path = request.getContextPath();
	String basePath = path+"/static/mxgraph/examples/editors/";
	Gson gson = new Gson();
%>
<html>
<head>
	<title>流程设计器</title>
	<style type="text/css" media="screen">
		div.base {
			position: absolute;
			overflow: hidden;
			white-space: nowrap;
			font-family: Arial;
			font-size: 8pt;
		}
		div.base#graph {
			border-style: solid;
			border-color: #F2F2F2;
			border-width: 1px;
			background: url('<%=request.getContextPath() %>/static/mxgraph/examples/editors/images/grid.gif');
		}
		
		
		
		.overlay {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	background-color: #fff;
	filter: alpha(opacity = 40);
	-moz-opacity: 0.4;
	opacity: 0.4;
	z-index: 2000000000001;
}
#loading {
	height: auto;
	position: absolute;
	border: 3px solid #ccc;
	left: 45%;
	top: 40%;
	padding: 2px;
	z-index: 2000000000001;
}

#loading .loading-indicator {
	background: white;
	color: #444;
	font: bold 12px Helvetica, Arial, sans-serif;
	height: auto;
	margin: 0;
	padding: 10px;
}
	</style>
		<script type="text/javascript">
mxBasePath = '<%=request.getContextPath() %>/static/mxgraph/src';
</script>
		<%
			String userAgent = request.getHeader("User-Agent").toString();
			//System.out.println(userAgent + "   ");
			if (userAgent.indexOf("MSIE 6.") > -1) {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-ie.js">
</script>
		<%
			} else if (userAgent.indexOf("Firefox") > -1) {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-ff.js">
</script>
		<%
			} else if (userAgent.indexOf("Chrome") > -1) {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-chrome.js">
</script>
		<%
			} else if (userAgent.indexOf("Opera") > -1) {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-opera.js">
</script>
		<%
			} else if (userAgent.indexOf("Safari") > -1) {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-safari.js">
</script>
		<%
			} else {
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxclient-ie.js">
</script>
		<%
			}
		%>
		<script type="text/javascript" src="<%=basePath %>js/mxApplication.js">
</script>
<script src="<%=request.getContextPath() %>/static/jquery/ui/bootstrap/assets/js/vendor/jquery-1.10.2.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/jquery/ui/bootstrap/assets/js/vendor/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/wf/js/global/util.js"></script>
<script src="<%=request.getContextPath() %>/static/jquery/msg/wHumanMsg.js" type="text/javascript"></script>
<link rel="stylesheet" href="<%=request.getContextPath() %>/static/jquery/msg/wHumanMsg.css">
<script type="text/javascript">
mxConstants.DEFAULT_HOTSPOT = 1;
// Enables guides
mxGraphHandler.prototype.guidesEnabled = true;
// Alt disables guides
mxGuide.prototype.isEnabledForEvent = function(evt) {
	return !mxEvent.isAltDown(evt);
};

// Enables snapping waypoints to terminals
mxEdgeHandler.prototype.snapToTerminals = true;

window.onbeforeunload = function() {
	return mxResources.get('changesLost');
};
function createXml(str) {
    if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(str);
        return xmlDom;
    }else{
    return new DOMParser().parseFromString(str, "text/xml");
    }
};
</script>
<script type="text/javascript">
var loginUser  = eval('(' + '<%=gson.toJson(session.getAttribute("loginuser"))%>' + ')');
var theme = 'ext-all';
if(loginUser!=null&&loginUser!=''){
	if(loginUser.hhXtZmsx.theme){
		theme = loginUser.hhXtZmsx.theme;
	}
}
</script>
<!-- 
<script type="text/javascript"
	src="system-class-javascript?path=
	<%=basePath %>properties/SimpleFormPanelWindow.js,
	<%=basePath %>properties/WorkFlow.js,
	<%=basePath %>properties/UserTask.js,
	<%=basePath %>properties/Edge.js,
	<%=basePath %>properties/Gateway.js,
	<%=basePath %>properties/Start.js,
	<%=basePath %>properties/FormManager.js"></script> -->
<script type="text/javascript">
var Init = {
		init : function() {
			new mxApplication('<%=request.getContextPath() %>/static/mxgraph/examples/editors/config/workfloweditor.xml');
			setTimeout("Init.initHeight();", 100);
		},
		initHeight : function() {
			var height = Browser.getHeight();
			if(height==0){
				height=500;
			}else{
				height=height-80;
			}
			/*Ext.override(com.hh.base.BaseWindow, {
				width : Browser.getWidth() - 300,
				height : height
			});
			Ext.override(com.hh.base.BaseServicePanel, {
				width : Browser.getWidth() - 300,
				height : height
			});*/
		}
	}
			//this.parent.Doing.hidden(true);
function attToObject(attributes){
	var object = {};
	for ( var i = 0; i < attributes.length; i++) {
			object[attributes[i].nodeName]=attributes[i].nodeValue;
	}
	return object;
}
var dataId = '<%=request.getParameter("dataId")==null?"":request.getParameter("dataId")%>';

var objectId = null;
var mxDocument = null;
	var uitype='ext';
	function saveMxgraphData(page,editor,deploy) {
		var workflowName="test";
		
		var graph = editor.graph;
		var xmlDoc = mxUtils.createXmlDocument();
		var root = xmlDoc.createElement('output');
		xmlDoc.appendChild(root);
		var xmlCanvas = new mxXmlCanvas2D(root);
		var imgExport = new mxImageExport();
		imgExport.drawState(graph.getView().getState(graph.model.root),
				xmlCanvas);
		var bounds = graph.getGraphBounds();
		var w = Math.round(bounds.x + bounds.width + 4);
		var h = Math.round(bounds.y + bounds.height + 4);
		var imgxml = mxUtils.getXml(root);
		var url = '<%=request.getContextPath() %>/workFlowInfos/save';
		var nodexml = page.writeGraphModel(editor.linefeed);
		//if (this.escapePostData) {
		//   imgxml = encodeURIComponent(imgxml);
		// }
		var text = '';
		var root_cell = page.graph.getModel().getRoot();
		var root_cell_attributes = root_cell.value.attributes;
		var rootObject = attToObject(root_cell_attributes);
	
			//Ext.apply(rootObject, Ext.decode(rootObject.data));
		$.extend(rootObject,rootObject.data);
		rootObject.data = null;
		rootObject.label = workflowName;
		var nodeCells = root_cell.children[0].children;
	
		var startEventId = null;
		var startEventTargetRefId = null;
	
		var cellObjectList = [];
		if (nodeCells != null) {
	
			for (var i = 0; i < nodeCells.length; i++) {
				var nodeCell = nodeCells[i];
				var attributes = nodeCell.value.attributes;
				var cellObject = attToObject(attributes);
				$.extend(cellObject,cellObject.data);
					//Ext.apply(cellObject, Ext.decode(cellObject.data));
				var geometry = nodeCell.geometry;
				cellObject.id = cellObject.type + nodeCell.id;
				cellObject.x = geometry.x;
				cellObject.y = geometry.y;
				cellObject.width = geometry.width;
				cellObject.height = geometry.height;
	
				if (cellObject.type == 'sequenceFlow') {
					var source = nodeCell.source;
					var target = nodeCell.target;
					var sourceObject = attToObject(source.value.attributes);
					var targetObject = attToObject(target.value.attributes);
					cellObject.sourceRef = sourceObject.type + source.id;
					cellObject.targetRef = targetObject.type + target.id;
				}
	
				if (cellObject.type == 'startEvent') {
					startEventId = cellObject.id;
				}
	
				cellObject.data = null;
				cellObjectList.push(cellObject);
			}
			for (var i = 0; i < cellObjectList.length; i++) {
				var cellObject = cellObjectList[i];
				if (cellObject.type == 'sequenceFlow') {
					if (cellObject.sourceRef == startEventId) {
						rootObject.startEventTargetRefId = cellObject.targetRef;
						break;
					}
				}
			}
		}
		nodexml = nodexml.replace(/&gt;/g, '!gt;').replace(/&lt;/g, '!lt;')
				.replace(/&quot;/g, '!quot;').replace(/&amp;/g, '!amp;');
			cellObjectList = Json.objTostr(cellObjectList);
			rootObject = Json.objTostr(rootObject);
			
			Request.request(url, {
				cellObjectList : cellObjectList,
				rootObject : rootObject,
				mxgraphXml : nodexml,
				imgxml : imgxml,
				text : text,
				dataId : dataId,
				id : objectId,
				deploy : deploy,
				imageHeight:h,
				imageWidth:w
			}, function(result) {
				objectId = result.object.id;
			});
	
	}
	var dialog =null;
	var params =null;
	function showProperties(page,editor, cell){
		cell = cell || page.graph.getSelectionCell();

		var rootcell = page.graph.getCurrentRoot();
		if (rootcell == null) {
			rootcell = page.graph.getModel().getRoot();
		}

		var rootattributes = rootcell.value.attributes;
		var rootobject = {id:rootcell.id};
		for ( var i = 0; i < rootattributes.length; i++) {
				if(rootattributes[i].nodeName=='data'){
					$.extend(rootobject,(rootattributes[i].nodeValue));
				}else{
					rootobject[rootattributes[i].nodeName]=rootattributes[i].nodeValue;
				}
		}

		if (cell == null) {
			cell=rootcell;
		}

		var attributes = cell.value.attributes;
		var type ='';
		var object = {id:cell.id};
		for ( var i = 0; i < attributes.length; i++) {
				if(attributes[i].nodeName=='data'){
					$.extend(object,(attributes[i].nodeValue));
				}else{
					object[attributes[i].nodeName]=attributes[i].nodeValue;
				}
		}
		params = {rootobject:rootobject,object:object,cell:cell,objdocument: page,page:window}; 
			var winClass = "workFlow";
			var winTitle ="流程属性";
			if(object.type=='userTask'){
				winClass = "userTask";
				winTitle ="任务节点属性";
			}else if(object.type=='sequenceFlow'){
				winClass = "sequenceFlow";
				winTitle ="连接线属性";
			}else if(object.type=='parallelGateway'){
				winClass = "gateway";
				winTitle ="分支节点属性";
			}else if(object.type=='startEvent'){
				winClass = "startEvent";
				winTitle ="开始节点属性";
			}else if(object.type=='endEvent'){
				winClass = "endEvent";
				winTitle ="结束节点属性";
			}else if(object.type==null){
				params.object.label = rootobject.label;
				winClass = "workflow";
				winTitle ="流程属性";
			}
			window.params = params;
			openDialog(winTitle, winClass, params);		
	}
	function openDialog(winTitle, winClass, params){
		dialog =$( "#divInDialogWF" ).dialog({
			 	 modal: true,
			 	 width:800,	
			 	 autoOpen: false,
			 	 title:winTitle,
				open: function(event, ui) {
					$(this).load('<%=request.getContextPath() %>/properties/'+winClass);
			  },	   
		    close: function (event, ui) {  
		      
		    }  	   
		});			
		dialog.dialog("option", "params", params);		
		dialog.dialog("open");
	}
</script>

</head>
<body onload="Init.init();">
	<div id="doing" class="overlay"   style="visibility: hidden;">
	</div>
	<div id="loading"  style="visibility: hidden;">
		<div class="loading-indicator">
			<img src="<%=request.getContextPath() %>/static/imgs/wf/loading.gif" width="16" height="16"
				style="margin-right: 8px; float: left; vertical-align: top;" />执行中，请稍后......
				&nbsp;&nbsp;<a href="javascript:">关闭</a>
		</div>
	</div>
	<table id="splash" width="100%" height="100%"
		style="background:white;position:absolute;top:0px;left:0px;z-index:4;">
		<tr>
			<td align="center" valign="middle">
				<img src="<%=basePath %>images/loading.gif">
			</td>
		</tr>
	</table>
	<div id="graph" class="base">
		<!-- Graph Here -->
	</div>
	<div id="status" class="base" align="right">
		<!-- Status Here -->
	</div>
	<div id="divInDialogWF" style="display:none">
	</div>
</body>
</html>
