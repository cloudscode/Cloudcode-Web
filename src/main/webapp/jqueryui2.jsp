<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" 
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="en" />

<title>Layout with Accordion</title>

<link rel="stylesheet" type="text/css"
	href="static/jquery/layout/layout-default-latest.css">
	<link rel="stylesheet" type="text/css"
		href="static/jquery/ui/themes/base/jquery.ui.all.css">
		<link rel="stylesheet" href="static/jquery/ztree/3.5.15/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<!-- CUSTOMIZE/OVERRIDE THE DEFAULT CSS -->
<style type="text/css">

/* remove padding and scrolling from elements that contain an Accordion OR a content-div */
.ui-layout-center, /* has content-div */ .ui-layout-west,
	/* has Accordion */ .ui-layout-east, /* has content-div ... */
	.ui-layout-east .ui-layout-content { /* content-div has Accordion */
	padding: 0;
	overflow: hidden;
}

.ui-layout-center P.ui-layout-content {
	line-height: 1.4em;
	margin: 0; /* remove top/bottom margins from <P> used as content-div */
}

h3,h4 { /* Headers & Footer in Center & East panes */
	font-size: 1.1em;
	background: #EEF;
	border: 1px solid #BBB;
	border-width: 0 0 1px;
	padding: 7px 10px;
	margin: 0;
}

.ui-layout-east h4 { /* Footer in East-pane */
	font-size: 0.9em;
	font-weight: normal;
	border-width: 1px 0 0;
}
</style>

<!-- REQUIRED scripts for 5layout widget -->
<script type="text/javascript" src="static/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="static/jquery/layout/jquery-ui.js"></script>
<script type="text/javascript" src="static/jquery/layout/jquery.layout-latest.js"></script>
<script type="text/javascript" src="static/jquery/layout/jquery.layout.resizePaneAccordions-latest.js"></script>
<script type="text/javascript" src="static/jquery/layout/themeswitchertool.js"></script> 
<script type="text/javascript" src="static/jquery/layout/debug.js"></script>
<script type="text/javascript" src="static/jquery/ztree/3.5.15/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript">
	$(document).ready(function() {

		myLayout = $('body').layout({
			west__size : 300,
			east__size : 300,
			// RESIZE Accordion widget when panes resize
			west__onresize : $.layout.callbacks.resizePaneAccordions,
			east__onresize : $.layout.callbacks.resizePaneAccordions
		});

		// ACCORDION - in the West pane
		$("#accordion1").accordion({
			collapsible : true,
			heightStyle : "fill"
		});

	});
	$(function() {
		var tabTitle = $( "#tab_title" ),
			tabContent = $( "#tab_content" ),
			tabTemplate = "<li><a href='\#{href}'>\#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
			tabCounter = 2;

		var tabs = $( "#tabs" ).tabs();

		// modal dialog init: custom buttons and a "close" callback resetting the form inside
		var dialog = $( "#dialog" ).dialog({
			autoOpen: false,
			modal: true,
			buttons: {
				Add: function() {
					addTab();
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				form[ 0 ].reset();
			}
		});

		// addTab form: calls addTab function on submit and closes the dialog
		var form = dialog.find( "form" ).submit(function( event ) {
			addTab();
			dialog.dialog( "close" );
			event.preventDefault();
		});

		// actual addTab function: adds new tab using the input from the form above
		function addTab() {
			var label = tabTitle.val() || "Tab " + tabCounter,
				id = "tabs-" + tabCounter,
				li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
				tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

			tabs.find( ".ui-tabs-nav" ).append( li );
			tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
			tabs.tabs( "refresh" );
			tabCounter++;
		}

		// addTab button: just opens the dialog
		$( "#add_tab" )
			.button()
			.click(function() {
				dialog.dialog( "open" );
			});

		// close icon: removing the tab on click
		tabs.delegate( "span.ui-icon-close", "click", function() {
			var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
			$( "#" + panelId ).remove();
			tabs.tabs( "refresh" );
		});

		tabs.bind( "keyup", function( event ) {
			if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
				var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
				$( "#" + panelId ).remove();
				tabs.tabs( "refresh" );
			}
		});
	});
</script>
<SCRIPT type="text/javascript">
		<!--
		var 
		tabTemplate = "<li><a href='\#{href}'  style='height:15px;'>\#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
		tabCounter = 2;
		function zTreeOnClick(event, treeId, treeNode) {
			var index = $('#tabs a[href="#'+treeNode.id+'"]').parent().index();
			if(index < 0){
			var tabTitle =treeNode.name,
			tabContent = treeNode.name;
			var label = tabTitle || "Tab " + tabCounter,
			id = "tabs-" + tabCounter,
			li = $( tabTemplate.replace( /#\{href\}/g, "#" + treeNode.id ).replace( /#\{label\}/g, label ) ),
			tabContentHtml = tabContent || "Tab " + tabCounter + " content.";
			var tabs = $( "#tabs" ).tabs();
			tabs.find( ".ui-tabs-nav" ).append( li );
			tabs.append( "<div id='" + treeNode.id + "'><p>" + treeNode.name + "</p></div>" );
			tabs.tabs( "refresh" );
			tabCounter++;
			////var index = $('#tabs a[href="#simple-tab-2"]').parent().index(); $('#tabs').tabs('select', index);
			}
			$("#tabs").tabs("option", "active", index);
		};
		var setting = {	callback: {
			onClick: zTreeOnClick
		}};
		var zNodes =[
			{ name:"父节点1 - 展开", open:true,
				children: [
					{ name:"父节点11 - 折叠",
						children: [
							{id:"tabs-5", name:"叶子节点111"},
							{id:"tabs-2", name:"叶子节点112"},
							{id:"tabs-3", name:"叶子节点113"},
							{id:"tabs-4", name:"叶子节点114"}
						]},
					{ name:"父节点12 - 折叠",
						children: [
							{ name:"叶子节点121"},
							{ name:"叶子节点122"},
							{ name:"叶子节点123"},
							{ name:"叶子节点124"}
						]},
					{ name:"父节点13 - 没有子节点", isParent:true}
				]},
			{ name:"父节点2 - 折叠",
				children: [
					{ name:"父节点21 - 展开", open:true,
						children: [
							{ name:"叶子节点211"},
							{ name:"叶子节点212"},
							{ name:"叶子节点213"},
							{ name:"叶子节点214"}
						]},
					{ name:"父节点22 - 折叠",
						children: [
							{ name:"叶子节点221"},
							{ name:"叶子节点222"},
							{ name:"叶子节点223"},
							{ name:"叶子节点224"}
						]},
					{ name:"父节点23 - 折叠",
						children: [
							{ name:"叶子节点231"},
							{ name:"叶子节点232"},
							{ name:"叶子节点233"},
							{ name:"叶子节点234"}
						]}
				]},
			{ name:"父节点3 - 没有子节点", isParent:true}

		];

		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});
		//-->
	</SCRIPT>
	
<style>
	#dialog label, #dialog input { display:block; }
	#dialog label { margin-top: 0.5em; }
	#dialog input, #dialog textarea { width: 95%; }
	#tabs { margin-top: 1em; }
	#tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
	#add_tab { cursor: pointer; }
	</style>
</head>
<body>
	<div class="ui-layout-north ui-widget-content" style="display: none;height:300px;">
		<div style="height:65px;">
		</div>
	</div>
	<div class="ui-layout-center" style="display: none;height:300px;">
		<div id="tabs" style="margin-top: 0em;">
			<ul>
				<li><a href="#tabs-1" style="height:15px;">Nunc </a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>
			</ul>
			<div id="tabs-1" style="height:100%;">
				<p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>
			</div>
		</div>
	</div>

	<div class="panel ui-layout-west" style="display: none;">
		<div id="accordion1" class="basic">

			<h3>
				<a href="#">Section 1</a>
			</h3>
			<div>
				<h5><ul id="treeDemo" class="ztree"></ul></h5>
			</div>

			<h3>
				<a href="#">Section 2</a>
			</h3>
			<div></div>

			<h3>
				<a href="#">Section 3</a>
			</h3>
			<div></div>

			<h3>
				<a href="#">Section 4</a>
			</h3>
			<div></div>

		</div>
	</div>

</body>
</html>
