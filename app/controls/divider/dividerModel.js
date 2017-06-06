/**
 *
 * @arguments ControlModel
 * @constructor
 */
var DividerModel = ControlModel.extend( {

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.DividerModel = DividerModel;
