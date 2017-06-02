/**
 *
 * @param parent
 * @param viewMode
 * @constructor
 * @mixes editorBaseMixin
 */
function ListEditorBase( parent, viewMode ) {
    _.superClass( ListEditorBase, this, parent, viewMode );

    this.initialize_editorBase();
}

InfinniUI.ListEditorBase = ListEditorBase;

_.inherit( ListEditorBase, Container );

_.extend( ListEditorBase.prototype, {

    /**
     * @returns {*}
     */
    getMultiSelect: function() {
        return this.control.get( 'multiSelect' );
    },

    /**
     *
     * @param value
     */
    setMultiSelect: function( value ) {
        this.control.set( 'multiSelect', value );
    },

    /**
     * @returns {*}
     */
    getValueSelector: function() {
        return this.control.get( 'valueSelector' );
    },

    /**
     *
     * @param value
     */
    setValueSelector: function( value ) {
        this.control.set( 'valueSelector', value );
    },

    /**
     * @returns {*}
     */
    getDisabledItemCondition: function() {
        return this.control.get( 'disabledItemCondition' );
    },

    /**
     *
     * @param value
     */
    setDisabledItemCondition: function( value ) {
        this.control.set( 'disabledItemCondition', value );
    },

    /**
     *
     * @param item
     */
    setValueItem: function( item ) {
        var result;
        var isMultiSelect = this.getMultiSelect();
        var valueSelector = this.getValueSelector();

        if( isMultiSelect ) {
            result = [];

            for( var i = 0, ii = item.length; i < ii; i++ ) {
                result[ i ] = valueSelector( null, { value: item[ i ] } );
            }

        } else {
            result = valueSelector( null, { value: item } );
        }

        this.setValue( result );
    },

    /**
     * @returns {*}
     */
    getSelectedItem: function() {
        return this.control.get( 'selectedItem' );
    },

    /**
     *
     * @param value
     */
    setSelectedItem: function( value ) {
        this.control.set( 'selectedItem', value );
    },

    /**
     *
     * @param handler
     */
    onSelectedItemChanged: function( handler ) {
        this.control.onSelectedItemChanged( this.createControlEventHandler( this, handler ) );
    }

}, editorBaseMixin );
