/**
 * @class
 * @arguments ControlView
 */
var DividerView = ControlView.extend(
    /** @lends DividerView.prototype */
    {
        tagName: 'hr',

        className: 'pl-divider',

        initialize: function( options ) {
            ControlView.prototype.initialize.call( this, options );
        },

        render: function() {
            this.prerenderingActions();

            this.updateProperties();
            this.trigger( 'render' );

            this.postrenderingActions();
            //devblockstart
            window.InfinniUI.global.messageBus.send( 'render', { element: this } );
            //devblockstop
            return this;
        }
    }

);
