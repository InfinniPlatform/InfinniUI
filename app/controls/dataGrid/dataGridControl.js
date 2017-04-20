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

    createControlModel: function() {
        return new DataGridModel();
    },

    createControlView: function( model ) {
        return new DataGridView( { model: model } );
    },

    onCheckAllChanged: function( handler ) {
        this.controlModel.onCheckAllChanged( handler );
    },

    setEnabled: function( value ) {
        this.controlModel.set( 'enabled', value );
    },

    onRowClick: function( callback ) {
        this.controlView.$el.on( 'click', 'tbody .pl-datagrid-row', callback );
    },

    onRowDoubleClick: function( callback ) {
        this.controlView.$el.on( 'dblclick', 'tbody .pl-datagrid-row', callback );
    }
} );

