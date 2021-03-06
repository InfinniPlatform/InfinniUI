/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TabPanelControl( parent ) {
    _.superClass( TabPanelControl, this, parent );
}

_.inherit( TabPanelControl, ContainerControl );

_.extend( TabPanelControl.prototype, {

    /**
     *
     * @param value
     */
    setSelectedItem: function( value ) {
        /**
         * @TODO Отрефакторить! Временное решение т.к. коллекция model.items содержит не экземпляры страниц а метаданные! см. templating в Container
         */
        var selectedItem = null;
        var model = this.controlModel;
        var elements = this.controlView.childElements;
        var items = model.get( 'items' );

        if ( value instanceof TabPage ) {
            model.set( 'selectedItem', value );
        } else if ( Array.isArray( elements ) ) {
            var index = items.indexOf( value );
            if ( index !== -1 ) {
                selectedItem = elements[ index ];
            }
            this.controlModel.set( 'selectedItem', selectedItem );
        }
    },

    /**
     * @returns {TabPanelModel}
     */
    createControlModel: function() {
        return new TabPanelModel();
    },

    /**
     * @returns {TabPanelView}
     * @param model
     */
    createControlView: function( model ) {
        return new TabPanelView( { model: model } );
    }

} );

InfinniUI.TabPanelControl = TabPanelControl;
