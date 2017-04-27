/**
 * @class
 * @augments ControlView
 */
var ContainerView = ControlView.extend( {

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ControlView.prototype.initialize.call( this, options );

        this.childElements = [];

        this.listenTo( this.model, 'change:groupValueSelector', this.updateGrouping );
        this.updateGrouping();
    },

    /**
     *
     */
    updateGrouping: function() {
        throw 'ContainerView.updateGrouping В потомке ContainerView не реализовано обновление группировок.';
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );

        var that = this;
        this.model.get( 'items' ).onChange( function( event ) {
            switch( event.action ) {
                case 'replace':
                    break;
                default:
                    that.rerender();
            }
        } );
    },

    /**
     *
     */
    removeChildElements: function() {
        for( var i = 0, ii = this.childElements.length; i < ii; i++ ) {
            this.childElements[ i ].remove();
        }

        this.childElements = [];
    },

    /**
     *
     * @param child
     */
    addChildElement: function( child ) {
        this.childElements.push( child );
    }

} );

InfinniUI.ContainerView = ContainerView;
