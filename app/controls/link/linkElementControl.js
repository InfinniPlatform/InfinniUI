/**
 *
 * @param parent
 * @constructor
 * @augments Control
 */
function LinkElementControl() {
    _.superClass( LinkElementControl, this );
}

_.inherit( LinkElementControl, ButtonControl );

_.extend(
    LinkElementControl.prototype, {

        createControlModel: function() {
            return new LinkElementModel();
        },

        createControlView: function( model ) {
            return new LinkElementView( { model: model } );
        }

    } );
