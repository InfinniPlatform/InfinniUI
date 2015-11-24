InfinniUI.ToolTipService = (function () {

    var template = InfinniUI.Template["services/toolTipService/template/tooltip.tpl.html"];

    var exchange = window.InfinniUI.global.messageBus;

    exchange.subscribe(messageTypes.onToolTip.name, function (message) {
        initToolTip(getSourceElement(message.source));
    });

    exchange.subscribe(messageTypes.onToolTipShow.name, function (message) {
        showToolTip(getSourceElement(message.source), message.content);
    });


    exchange.subscribe(messageTypes.onToolTipHide.name, function (message) {
        hideToolTip(getSourceElement(message.source), message.content);
    });

    function getSourceElement(source) {
        return source.control.controlView.$el
    }
    function showToolTip($element, content) {
        console.log(content);
        $element
            .tooltip({
                html: true,
                title:content
            })
            .tooltip('show');
    }

    function hideToolTip($element) {
        $element.tooltip('hide');
    }

    function initToolTip($element) {

    }
})();