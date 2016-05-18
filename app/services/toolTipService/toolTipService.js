InfinniUI.ToolTipService = (function () {

	var template = InfinniUI.Template["services/toolTipService/template/tooltip.tpl.html"],
			exchange = window.InfinniUI.global.messageBus;

	exchange.subscribe(messageTypes.onToolTip.name, function (context, args) {
		var message = args.value;
		showToolTip(getSourceElement(message.source), message.content);
	});

	function getSourceElement(source) {
		return source.control.controlView.$el
	}
	function showToolTip($element, content) {
		$element
			.tooltip({
				html: true,
				title:content,
				placement: 'auto top',
				container: 'body'

			})
			.tooltip('show');
	}
})();
