/**
 *
 * @param parent
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
function TextEditorBaseControl( parent ) {
    _.superClass( TextEditorBaseControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( TextEditorBaseControl, Control );

_.extend( TextEditorBaseControl.prototype, editorBaseControlMixin );