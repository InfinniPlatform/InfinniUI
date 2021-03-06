/**
 * @constructor
 * @augments ControlModel
 */
var IconModel = ControlModel.extend( {

    defaults: _.defaults( {
        value: null,
        size: '',
        focusable: false

    }, ControlModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
    }

} );

InfinniUI.IconModel = IconModel;
