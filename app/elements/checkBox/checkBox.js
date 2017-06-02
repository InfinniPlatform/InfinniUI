/**
 *
 * @param parent
 * @constructor
 * @augment Element
 * @mixes editorBaseMixin
 */
function CheckBox( parent ) {
    _.superClass( CheckBox, this, parent );
    this.initialize_editorBase();
}

InfinniUI.CheckBox = CheckBox;

_.inherit( CheckBox, Element );

_.extend( CheckBox.prototype, {

    /**
     *
     * @param parent
     * @returns {CheckBoxControl}
     */
    createControl: function( parent ) {
        return new CheckBoxControl( parent );
    }

}, editorBaseMixin );
