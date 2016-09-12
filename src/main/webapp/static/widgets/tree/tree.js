define(["jquery",'ztree'], function($) {
	$.cc = $.cc || {};
	$.cc.tree = {
			render : function(tree, config) {
				tree.empty();

				var $input = $('<ul  class="ztree"></ul>');
				var div = $('<div></div>');
				var ztree = null;
				// $.cc.fn.setAttr(tree, $input, config);

				$input.attr('id', config.id || $.cc.getUUID());
				div.append($input);
				tree.append(div);

				$.cc.nheight(tree.children('div'), config.nheight);

				var otherParam = {
					node : 'root'
				};
				if (config.params) {
					$.extend(otherParam, config.params);
				}
				var data = config.data;

				var menuul = null;
				if (config.itemRightMenu && config.itemRightMenu.length > 0) {
					if (tree.data('itemRightMenudom')) {
						menuul = tree.data('itemRightMenudom');
					} else {
						menuul = $.cc.menu.renderMenu(config, config.itemRightMenu);
						tree.data('itemRightMenudom', menuul)
					}
					$('body').append(menuul);
					if (menuul) {
						menuul.hide();
						menuul.css({
							'border' : '1px solid '
									+ $.cc.property.classObject.themeContent,
							'position' : 'absolute',
							'z-index' : 9999999999
						});
					}
				}
				var menuul2 = null;
				if (config.rightMenu && config.rightMenu.length > 0) {
					if (tree.data('rightMenudom')) {
						menuul2 = tree.data('rightMenudom');
					} else {
						menuul2 = $.cc.menu.renderMenu(config, config.rightMenu);
						tree.data('rightMenudom', menuul2)
					}
					$('body').append(menuul2);
					if (menuul2) {
						menuul2.hide();
						menuul2.css({
							'border' : '1px solid '
									+ $.cc.property.classObject.themeContent,
							'position' : 'absolute',
							'z-index' : 9999999999
						});
					}

					div.contextmenu(function() {
						$(document).one("click", function() {
							menuul2.hide();
						});
						menuul2.show().css({
							left : event.clientX + 'px',
							top : event.clientY + 'px'
						});
						return false;
					});

				}

				var treeConfig = {
					view : {
						selectedMulti : false
					},
					edit : {
						enable : true,
						editNameSelectAll : true,
						showRemoveBtn : config.remove != null,
						showRenameBtn : config.edit != null
					},
					check : config.check,
					async : {
						enable : config.url == null ? false : true,
						url : config.url,
						otherParam : otherParam,
						autoParam : [ "id=node" ]
					},
					callback : {
						onAsyncSuccess : function(event, treeId, treeNode, msg) {
							var dataList = $.cc.toObject(msg);
							if (config.dataLoad) {
								config.dataLoad(treeNode);
							}
							// if(dataList==null || dataList.length==0){
							// treeNode.isParent=false;
							// $.cc.tree.updateNode(treeId, treeNode);
							// }
							$.cc.tree.expandNode(ztree, dataList);
						},
						beforeRemove : function(treeId, treeNode) {
							if (config.remove) {
								config.remove(treeNode);
							}
							return false;
						},
						beforeEditName : function(treeId, treeNode) {
							if (config.edit) {
								config.edit(treeNode);
							}
							return false;
						},
						onDblClick : function(event, treeId, treeNode) {
							if (config.onDblClick) {
								config.onDblClick(treeNode);
							}
						},
						onClick : function(event, treeId, treeNode) {
							if (config.onClick) {
								config.onClick(treeNode);
							}
						},
						onCheck : function(event, treeId, treeNode) {
							if (config.onCheck) {
								config.onCheck(treeNode);
							}
						},
						onRightClick : function(event, treeId, treeNode) {
							if (config.onRightClick
									|| (config.rightMenu && config.rightMenu.length > 0)) {
								if (!treeNode
										&& event.target.tagName.toLowerCase() != "button"
										&& $(event.target).parents("a").length == 0) {
									ztree.cancelSelectedNode();
									if (menuul2) {
										menuul2.data('data', treeNode);
										$(document).one("click", function() {
											menuul2.hide();
										});
										menuul2.show().css({
											left : event.clientX + 'px',
											top : event.clientY + 'px'
										});
									}
								} else if (treeNode && !treeNode.noR) {
									ztree.selectNode(treeNode);
									if (config.onRightClick) {
										config.onRightClick(treeNode);
									}
									if (menuul) {
										menuul.data('data', treeNode);
										$(document).one("click", function() {
											menuul.hide();
										});
										menuul.show().css({
											left : event.clientX + 'px',
											top : event.clientY + 'px'
										});
									}
								}
							}
						}
					}
				};

				ztree = $.fn.zTree.init($input, treeConfig, data);
			},
			doUp : function(params) {
				var treeid = params.treeid;
				var ztree = $.cc.tree.getTree(treeid);
				var selectNode = $.cc.tree.getSelectNode(treeid);
				if (!selectNode) {
					Dialog.infomsg('请选择一条数据！');
					return;
				}
				var pnode = selectNode.getPreNode();
				if (pnode != null) {
					Request.request(params.action, {
						data : {
							id1 : selectNode.id,
							id2 : pnode.id,
							order1 : selectNode.order,
							order2 : pnode.order
						}
					}, function(result) {
						if (result.success != false) {
							var tid = pnode.order;
							pnode.order = selectNode.order;
							selectNode.order = tid;
							$.cc.tree.updateNode(treeid, selectNode);
							$.cc.tree.updateNode(treeid, pnode);
							$.cc.tree.getTree(treeid).refresh();
							ztree.moveNode(pnode, selectNode, 'prev');
							ztree.selectNode(selectNode);
						}
					});
				} else {
					Dialog.infomsg('已经是第一条了');
				}
			},
			doDown : function(params) {
				var treeid = params.treeid;
				var ztree = $.cc.tree.getTree(treeid);
				var selectNode = $.cc.tree.getSelectNode(treeid);
				if (!selectNode) {
					Dialog.infomsg('请选择一条数据！');
					return;
				}
				var nnode = selectNode.getNextNode();
				if (nnode != null) {
					Request.request(params.action, {
						data : {
							id1 : selectNode.id,
							id2 : nnode.id,
							order1 : selectNode.order,
							order2 : nnode.order
						}
					}, function(result) {
						if (result.success != false) {
							var tid = nnode.order;
							nnode.order = selectNode.order;
							selectNode.order = tid;
							$.cc.tree.updateNode(treeid, selectNode);
							$.cc.tree.updateNode(treeid, nnode);
							$.cc.tree.getTree(treeid).refresh();
							ztree.moveNode(nnode, selectNode, 'next');
							ztree.selectNode(selectNode);
						}
					});
				} else {
					Dialog.infomsg('已经是最后一条了');
				}
			},
			updateNode : function(treeId, node) {
				$.cc.tree.getTree(treeId).updateNode(node);
			},
			getTree : function(treeId) {
				return $.fn.zTree.getZTreeObj(treeId);
			},
			getCheckedNodes : function(treeId) {
				return $.fn.zTree.getZTreeObj(treeId).getCheckedNodes();
			},
			refresh : function(treeId) {
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				zTree.reAsyncChildNodes(null, "refresh");
			},
			loadData : function(treeId, config) {
				var params = config.params;
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				$.extend(zTree.setting.async.otherParam, config.params);
				zTree.reAsyncChildNodes(null, "refresh");
			},
			getSelectNode : function(treeId) {
				var treeObj = $.fn.zTree.getZTreeObj(treeId);
				var nodes = treeObj.getSelectedNodes();
				if (nodes.length > 0) {
					return nodes[0];
				} else {
					return null;
				}
			},
			getSelectNodes : function(treeId) {
				var treeObj = $.fn.zTree.getZTreeObj(treeId);
				return treeObj.getSelectedNodes();
			},
			expandNode : function(ztree, dataList) {
				for (var i = 0; i < dataList.length; i++) {
					var data = dataList[i];
					if (data.expanded == 1) {
						ztree.expandNode(ztree.getNodeByParam("id", data.id, null));
						if (data.children) {
							$.cc.tree.expandNode(ztree, data.children);
						}
					}
				}
			},
			deleteData : function(params) {
				var pageid = params.pageid;
				var action = params.action;
				var id = params.id;
				var callback = params.callback;
				Dialog.confirm({
					message : '您确认要删除数据吗？',
					yes : function(result) {
						Request.request(action, {
							data : {
								ids : id
							},
							callback : function(result) {
								if (result.success != false) {
									$.cc.tree.refresh(pageid);
									if (callback) {
										callback(result);
									}
								}
							}
						});
					}
				});
			},
			getWidget : function(span) {
				var object = {
					widget : span
				};
				object.getSelectNode = function() {
					return $.cc.tree.getSelectNode(span.find('ul').attr('id'));
				};
				object.getSelectNodes = function() {
					return $.cc.tree.getSelectNodes(span.find('ul').attr('id'));
				};
				object.refresh = function() {
					return $.cc.tree.refresh(span.find('ul').attr('id'));
				};
				return object;
			}
		}
	
	return $.cc.tree;
});