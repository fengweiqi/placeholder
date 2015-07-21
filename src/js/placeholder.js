(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(function() {
			return factory();
		});
	} else {
		window.placeholder = factory();
	}
}(function() {
	if (
		navigator.userAgent.indexOf('MSIE 6.0') != -1 
		|| navigator.userAgent.indexOf('MSIE 7.0') != -1 
		|| navigator.userAgent.indexOf('MSIE 8.0') != -1
		|| navigator.userAgent.indexOf('MSIE 9.0') != -1
	) {
		var inputInit = document.getElementsByTagName('input');
		var inputTP = [];
		for (var i = 0; i < inputInit.length; i++) {
			var type = inputInit[i].getAttribute('type');
			if (type == 'text' 
				|| type == "password"

				|| type == "tel"

				|| type == "search"

				|| type == "number"

				|| type == "email"

				) {
				inputTP.push(inputInit[i]);
			}
		}
		for (var i = 0; i < inputTP.length; i++) {
			var placeholder = inputTP[i].getAttribute('placeholder');
			if (placeholder != null) {
				if (window.getComputedStyle) {

					var computedStyle = getComputedStyle(inputTP[i], null)

				} else {

					var computedStyle = inputTP[i].currentStyle;

				}
				// 1.0.0版，定位实现
				
				var x= inputTP[i].getBoundingClientRect().left+document.documentElement.scrollLeft;

　　			var y =inputTP[i].getBoundingClientRect().top+document.documentElement.scrollTop;

				// input元素关键样式
				
				var fontSize = computedStyle.fontSize;
				var color = computedStyle.color;
				var fontFamily = computedStyle.fontFamily;
				var height = computedStyle.height
				var borderLeft = isNaN(computedStyle.borderLeftWidth) ? 0 : computedStyle.borderLeftWidth;
				var borderTop = isNaN(computedStyle.borderTopWidth) ? 0 : computedStyle.borderTopWidth;
				var paddingLeft = computedStyle.paddingLeft;
				var paddingTop = computedStyle.paddingTop;
				// 创建span
				var span = document.createElement('span');

				span.innerHTML = placeholder;
				span.style.position = "absolute";
				
				span.style.left = x+parseInt(paddingLeft, 10) + parseInt(borderLeft, 10) + 'px';
				span.style.fontSize = fontSize;
				span.style.fontFamily = fontFamily;
				span.style.color = color;
				span.style.display = 'inline-block';
				span.style.filter = "Alpha(opacity=70)";

				
				document.body.appendChild(span);
				var spanMidY= (parseInt(height)-parseInt(span.clientHeight))/2;
				span.style.top = y+spanMidY+parseInt(paddingTop, 10) + parseInt(borderTop, 10)+'px';
				
				(function(i, span) {
					inputTP[i].onfocus = function() {
						span.style.display = "none";

					}
					span.onclick = function() {

						inputTP[i].focus();
					}
					inputTP[i].onblur = function() {
						if (inputTP[i].value == '') {
							span.style.display = "inline-block";
						}
					}
				})(i, span);
			}


		};
	}

}));