/**
 *
 * @param parent
 * @constructor
 * @augment CheckBox
 * @mixes editorBaseMixin
 */
function IndeterminateCheckBox( parent ) {
    _.superClass( IndeterminateCheckBox, this, parent );
    this.initialize_editorBase();
}

InfinniUI.IndeterminateCheckBox = IndeterminateCheckBox;

_.inherit( IndeterminateCheckBox, CheckBox );

_.extend( IndeterminateCheckBox.prototype, {

    /**
     *
     * @param parent
     * @returns {IndeterminateCheckBoxControl}
     */
    createControl: function( parent ) {
        return new IndeterminateCheckBoxControl( parent );
    }

}, editorBaseMixin );
