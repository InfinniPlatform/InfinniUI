/**
 * @augments Control
 * @param viewMode
 * @constructor
 * @mixes editorBaseControlMixin
 */
var LabelControl = function( viewMode ) {
    _.superClass( LabelControl, this, viewMode );
    this.initialize_editorBaseControl();
};

_.inherit( LabelControl, Control );

_.extend( LabelControl.prototype, {

    /**
     * @returns {LabelModel}
     */
    createControlModel: function() {
        return new LabelModel();
    },

    /**
     * @returns {*}
     * @param model
     * @param viewMode
     */
    createControlView: function( model, viewMode ) {
        if( !viewMode || ! ( viewMode in InfinniUI.viewModes.Label ) ) {
            viewMode = 'simple';
        }

        var ViewClass = InfinniUI.viewModes.Label[ viewMode ];

        return new ViewClass( { model: model } );
    },

    /**
     * @returns {*}
     */
    getDisplayValue: function() {
        return this.controlView.getLabelText();
    }

}, editorBaseControlMixin );

InfinniUI.LabelControl = LabelControl;
