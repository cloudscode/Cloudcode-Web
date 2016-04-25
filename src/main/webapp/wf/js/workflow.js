var WorkFlow = {
	manager : function(param) {
		Request.request('workflow-Task-manager', {
					data : {
						actionType : param.actionType || 'manager',
						taskId : param.id
					}
				}, function(result) {
					Dialog.open({
								width : Browser.getMainWidth() * 0.9,
								height : Browser.getMainHeight() * 0.85,
								url : 'jsp-workflow-service-servicemain',
								params : {
									actionType : param.actionType || 'manager',
									taskResult : result,
									callback : param.callback
								}
							});
				});
	},
	showpic : function(param) {
		PageUtil.callRow("pagelist", function(row) {
					Dialog.open({
								width : Browser.getMainWidth() * 0.9,
								height : Browser.getMainHeight() * 0.85,
								url : 'jsp-workflow-task-pipic?piid='
										+ param.piid + '&pdid=' + param.pdid
							});
				});
	}
}