/**
 *
 * @param parent
 * @constructor
 * @augments Control
 */
function ContainerControl(parent) {
    _.superClass(ContainerControl, this, parent);
    editorBaseControlMixin.call(this);
}

_.inherit(ContainerControl, Control);