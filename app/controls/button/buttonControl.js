/**
 *
 * @param parent
 * @constructor
 * @augments Control
 */
function ButtonControl( viewMode ) {
    _.superClass( ButtonControl, this, viewMode );
}

_.inherit( ButtonControl, Control );

_.extend( ButtonControl.prototype, highlightMixin.control, {

    createControlModel: function() {
        return new ButtonModel();
    },

    createControlView: function( model, viewMode ) {
        if( !viewMode || !viewMode in InfinniUI.viewModes.Button ) {
            viewMode = 'common';
        }

        var ViewClass = InfinniUI.viewModes.Button[ viewMode ];

        return new ViewClass( { model: model } );
    },

    setType: function( type ) {
        this.controlModel.set( 'type', type );
    },

    getType: function() {
        return this.controlModel.get( 'type' );
    }

}, buttonControlMixin );

InfinniUI.ButtonControl = ButtonControl;

