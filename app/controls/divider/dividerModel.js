/**
 * @class
 * @arguments ControlModel
 */
var DividerModel = ControlModel.extend( /** @lends DividerModel.prototype */{

    initialize: function() {
        ControlModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.DividerModel = DividerModel;
