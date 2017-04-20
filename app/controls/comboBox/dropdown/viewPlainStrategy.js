/**
 *
 * @param {ComboBoxDropdownView} dropdownView
 * @augments ComboBoxBaseViewStrategy
 * @constructor
 */
function ComboBoxPlainViewStrategy( dropdownView ) {
    ComboBoxBaseViewStrategy.call( this, dropdownView );
}

ComboBoxPlainViewStrategy.prototype = Object.create( ComboBoxBaseViewStrategy.prototype );
ComboBoxPlainViewStrategy.prototype.constructor = ComboBoxPlainViewStrategy;

ComboBoxPlainViewStrategy.prototype.renderItems = function() {
    var
        $items = [],
        items = this.getModelAttribute( 'items' );

    if ( items ) {
        $items = this._renderItems( items.toArray() );
    }

    this.dropdownView.setItemsContent( $items );

    return $items;
};

ComboBoxPlainViewStrategy.prototype.template = InfinniUI.Template[ 'controls/comboBox/dropdown/template/plain/template.tpl.html' ];

ComboBoxPlainViewStrategy.prototype.getTemplate = function() {
    return this.template;
};
