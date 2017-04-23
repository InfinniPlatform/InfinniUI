/**
 * @class
 * @augments ControlModel
 */
var ButtonModel = ControlModel.extend( {

    defaults: _.defaults( {
        content: null,
        contentTemplate: null,
        horizontalAlignment: 'Left',
        type: 'button'
    }, ControlModel.prototype.defaults ),

    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
    }

} );

InfinniUI.ButtonModel = ButtonModel;
