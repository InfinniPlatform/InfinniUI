function ListEditorBaseControl( viewMode ) {
    _.superClass( ListEditorBaseControl, this, viewMode );
    this.initialize_editorBaseControl();
}

_.inherit( ListEditorBaseControl, ContainerControl );

_.extend( ListEditorBaseControl.prototype, {

    onSelectedItemChanged: function( handler ) {
        this.controlModel.onSelectedItemChanged( handler );
    }
}, editorBaseControlMixin );