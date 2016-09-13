define(["jquery","Dialog"], function($,Dialog) {
	$.cc = $.cc || {};
	
	$.cc.validation = {
			validation : function(form) {
				form.validationEngine();
			},
			check : function(formId, callback) {
				if ($("#" + formId).validationEngine('validate')) {
					return callback($("#" + formId).getValue());
				} else {
					Dialog.errormsg("验证失败！！");
				}
			},
			getValidate : function(config) {
				var validate = '';
				if (config.required) {
					validate += 'required,';
				}
				if (config.maxSize) {
					validate += 'maxSize[' + config.maxSize + '],';
				}
				if (config.minSize) {
					validate += 'minSize[' + config.minSize + '],';
				}
				if (config.min || config.min == 0) {
					validate += 'min[' + config.min + '],';
				}
				if (config.max) {
					validate += 'max[' + config.max + '],';
				}
				if (config.email) {
					validate += 'custom[email],';
				}
				if (config.integer) {
					validate += 'custom[integer],';
				}
				if (config.number) {
					validate += 'custom[number],';
				}
				if (config.yw) {
					validate += 'custom[onlyLetterSp],';
				}
				if (config.image) {
					validate += 'custom[image],';
				}

				if (validate) {
					validate = validate.substr(0, validate.length - 1);
					return 'validate[' + validate + ']';
				}
				return '';
			}
		};
	return $;
});