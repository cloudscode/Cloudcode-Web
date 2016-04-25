function saveProperties(values) {
	var page = params.page;
	var objdocument = params.objdocument;
	var cell = params.cell;
	var mxUtils = page.mxUtils;
	var mxCellAttributeChange = page.mxCellAttributeChange;
	objdocument.hideProperties();
	var model = objdocument.graph.getModel();
	var value = model.getValue(cell);
	if (mxUtils.isNode(value)) {
		var attrs = value.attributes;
		model.beginUpdate();
		try {
			for (var i = 0; i < attrs.length; i++) {
				var edit = null;
				if (attrs[i].nodeName == 'data') {
					edit = new mxCellAttributeChange(cell, attrs[i].nodeName,
							ajaxframework.toString(values));
					model.execute(edit);
				} else if (attrs[i].nodeName == 'label') {
					edit = new mxCellAttributeChange(cell, attrs[i].nodeName,
							values[attrs[i].nodeName] == null
									? ""
									: values[attrs[i].nodeName]);
					model.execute(edit);
				}
			}
			if (objdocument.graph.isAutoSizeCell(cell)) {
				objdocument.graph.updateCellSize(cell);
			}
		} finally {
			model.endUpdate();
		}
	}
}