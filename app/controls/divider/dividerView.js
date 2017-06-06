/**
 *
 * @arguments ControlView
 * @constructor
 */
var DividerView = ControlView.extend( {

    tagName: 'hr',

    className: 'pl-divider',

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ControlView.prototype.initialize.call( this, options );
    },

    /**
     *
     * @returns {DividerView}
     */
    render: function() {
        this.prerenderingActions();

        this.updateProperties();
        this.trigger( 'render' );

        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    }

} );

InfinniUI.DividerView = DividerView;
