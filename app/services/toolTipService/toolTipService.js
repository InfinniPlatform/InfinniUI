InfinniUI.ToolTipService = ( function() {

    var TOOLTIP_PLACEMENT = 'auto top';
    var TOOLTIP_CONTAINER = 'body';
    var TOOLTIP_TRIGGER = 'hover';
    var exchange = window.InfinniUI.global.messageBus;

    exchange.subscribe( messageTypes.onToolTipInit.name, initToolTip );

    exchange.subscribe( messageTypes.onToolTipDestroy.name, destroyToolTip );

    function destroyToolTip( context, args ) {
        var element = extractElementFromArgs( args );
        var $element = element.control.controlView.$el;

        $element.tooltip( 'destroy' );
    }

    function initToolTip( context, args ) {
        var element = extractElementFromArgs( args );
        var content = extractContentFromArgs( args );
        var $element = element.control.controlView.$el;
        var options = {
            html: true,
            title: function() {
                return content.render();
            },
            placement: TOOLTIP_PLACEMENT,
            container: TOOLTIP_CONTAINER,
            trigger: TOOLTIP_TRIGGER
        };

        $element.tooltip( options );
    }

    /**
     *
     * @param {Object} args
     * @returns InfinniUI.Element
     */
    function extractContentFromArgs( args ) {
        return args.value.content;
    }

    /**
     *
     * @param {Object} args
     * @returns InfinniUI.Element
     */
    function extractElementFromArgs( args ) {
        return args.value.element;
    }

} )();
