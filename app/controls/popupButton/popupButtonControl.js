function PopupButtonControl( viewMode ) {
    _.superClass( PopupButtonControl, this, viewMode );
}

_.inherit( PopupButtonControl, ContainerControl );

_.extend( PopupButtonControl.prototype, {

    createControlModel: function() {
        return new PopupButtonModel();
    },

    createControlView: function( model, viewMode ) {
        if( !viewMode || ! viewMode in InfinniUI.viewModes.PopupButton ) {
            viewMode = 'common';
        }

        var ViewClass = InfinniUI.viewModes.PopupButton[ viewMode ];

        return new ViewClass( { model: model } );
    }

}, buttonControlMixin );

InfinniUI.PopupButtonControl = PopupButtonControl;
