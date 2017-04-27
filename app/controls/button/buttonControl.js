/**
 *
 * @param viewMode
 * @constructor
 * @augments Control
 */
function ButtonControl( viewMode ) {
    _.superClass( ButtonControl, this, viewMode );
}

_.inherit( ButtonControl, Control );

_.extend( ButtonControl.prototype, highlightMixin.control, {

    /**
     *
     * @returns {ButtonModel}
     */
    createControlModel: function() {
        return new ButtonModel();
    },

    /**
     *
     * @param model
     * @param viewMode
     * @returns {ViewClass}
     */
    createControlView: function( model, viewMode ) {
        if( !viewMode || !viewMode in InfinniUI.viewModes.Button ) {
            viewMode = 'common';
        }

        var ViewClass = InfinniUI.viewModes.Button[ viewMode ];

        return new ViewClass( { model: model } );
    },

    /**
     *
     * @param type
     */
    setType: function( type ) {
        this.controlModel.set( 'type', type );
    },

    /**
     *
     * @returns {string}
     */
    getType: function() {
        return this.controlModel.get( 'type' );
    }

}, buttonControlMixin );

InfinniUI.ButtonControl = ButtonControl;
