/**
 * @augments ContainerControl
 * @param viewMode
 * @constructor
 * @mixes buttonControlMixin
 */
function PopupButtonControl( viewMode ) {
    _.superClass( PopupButtonControl, this, viewMode );
}

_.inherit( PopupButtonControl, ContainerControl );

_.extend( PopupButtonControl.prototype, {

    /**
     * @returns {PopupButtonModel}
     */
    createControlModel: function() {
        return new PopupButtonModel();
    },

    /**
     * @returns {*}
     * @param model
     * @param viewMode
     */
    createControlView: function( model, viewMode ) {
        if( !viewMode || !viewMode in InfinniUI.viewModes.PopupButton ) {
            viewMode = 'common';
        }

        var ViewClass = InfinniUI.viewModes.PopupButton[ viewMode ];

        return new ViewClass( { model: model } );
    }

}, buttonControlMixin );

InfinniUI.PopupButtonControl = PopupButtonControl;
