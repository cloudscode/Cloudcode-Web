var ajaxframework = function (){};
/**
 * 创建一个对话框
 * @param title
 * @param text
 * @param options
 * @returns
 */
ajaxframework.createDialog = function(title, text, options) {
    return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    .dialog(options);
};
ajaxframework.toString=function(o) {
	if (o == undefined) {
		return null;
	}
	var r = [];
	if (typeof o == "string") {
		if (!isNaN(o)) {
			return o;
		} else {
			return "\'"
					+ o.replace(/([\'\\])/g, "\\$1")
							.replace(/(\n)/g, "\\n")
							.replace(/(\r)/g, "\\r")
							.replace(/(\t)/g, "\\t") + "\'";
		}
	}
	if (typeof o == "object") {
		if (!o.sort) {
			for (var i in o) {
				var objTostr2Value = ajaxframework.toString(o[i]);
				r.push("\'" + i + "\':"
						+ (objTostr2Value == '' ? "\'\'" : objTostr2Value));
			}
			if (!!document.all
					&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
							.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}"
		} else {
			for (var i = 0; i < o.length; i++)
				r.push(ajaxframework.toString(o[i]));
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString().replace(/\"\:/g, '":""');
};
ajaxframework.getHref = function(url, params) {
	if (params) {
		if (url.indexOf('?') > -1) {
			return url + '&' + $.param(params);
		} else {
			return url + '?' + $.param(params);
		}
	} else {
		return url;
	}
};

//JQuery扩展
/**
 * 序列化成对象
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
(function ($) {
    $.fn.iframeDialog = function (options) {
       // this.each(function () {
           // $(this).unbind('click').click(function (e) {
               // e.preventDefault();
                var $div = $("<div/>");
                var $iframe = $('<iframe class="iframeDialog" name="iframeDialog{rnd}" frameborder="0" width="100%" height="100%" marginwidth="0" hspace="0" vspace="0" scrolling="no" allowtransparency="true" />');
                if (!options.title) {
                    options.title = $(this).attr('title');
                }
                if (!options.url) {
                    url = $(this).attr('href');
                } else {
                    url = options.url;
                }
                if (!options.close) {
                    options.close = function () {
                        $(this).remove();
                    };
                }
                if (options.id) {
                    $div.attr("id", options.id);
                }
                if (options.scrolling) {
                    $iframe.attr("scrolling", options.scrolling);
                }
                $iframe.attr("src", url);
                $div.append($iframe).dialog(options);
            //});
       // });
      //  return this;
    };
})(jQuery);
