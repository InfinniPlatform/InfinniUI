/**
 *
 * @constructor
 * @augments ListEditorBaseControl
 */
function DataGridControl() {
    _.superClass( DataGridControl, this );
}

_.inherit( DataGridControl, ListEditorBaseControl );

_.extend( DataGridControl.prototype, {

    /**
     *
     * @returns {DataGridModel}
     */
    createControlModel: function() {
        return new DataGridModel();
    },

    /**
     *
     * @param model
     * @returns {DataGridView}
     */
    createControlView: function( model ) {
        return new DataGridView( { model: model } );
    },

    /**
     *
     * @param handler
     */
    onCheckAllChanged: function( handler ) {
        this.controlModel.onCheckAllChanged( handler );
    },

    /**
     *
     * @param value
     */
    setEnabled: function( value ) {
        this.controlModel.set( 'enabled', value );
    },

    /**
     *
     * @param callback
     */
    onRowClick: function( callback ) {
        this.controlView.$el.on( 'click', 'tbody .pl-datagrid-row', callback );
    },

    /**
     *
     * @param callback
     */
    onRowDoubleClick: function( callback ) {
        this.controlView.$el.on( 'dblclick', 'tbody .pl-datagrid-row', callback );
    }

} );

InfinniUI.DataGridControl = DataGridControl;
