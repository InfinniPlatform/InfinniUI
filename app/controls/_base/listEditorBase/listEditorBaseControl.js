/**
 *
 * @param viewMode
 * @constructor
 */
function ListEditorBaseControl( viewMode ) {
    _.superClass( ListEditorBaseControl, this, viewMode );
    this.initialize_editorBaseControl();
}

_.inherit( ListEditorBaseControl, ContainerControl );

_.extend( ListEditorBaseControl.prototype, {

    /**
     *
     * @param handler
     */
    onSelectedItemChanged: function( handler ) {
        this.controlModel.onSelectedItemChanged( handler );
    }

}, editorBaseControlMixin );

InfinniUI.ListEditorBaseControl = ListEditorBaseControl;
