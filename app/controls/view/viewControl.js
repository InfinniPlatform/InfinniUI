/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function ViewControl( parent ) {
    _.superClass( ViewControl, this, parent );
}

_.inherit( ViewControl, ContainerControl );

_.extend( ViewControl.prototype,
    /** @lends ViewControl.prototype */
    {
        createControlModel: function() {
            return new ViewModel();
        },

        createControlView: function( model ) {
            return new ViewView( { model: model } );
        }
    }
);

