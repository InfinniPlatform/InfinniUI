/**
 * @augments Element
 * @constructor
 */
function DataGridRow() {
    _.superClass( DataGridRow, this );

    this._transformRowProperties( {
        rowBackground: 'background',
        rowForeground: 'foreground',
        rowTextStyle: 'textStyle',
        rowStyle: 'style'
    } );
}

_.inherit( DataGridRow, Element );

_.extend( DataGridRow.prototype, {

    /**
     *
     * @returns {DataGridRowControl}
     */
    createControl: function() {
        return new DataGridRowControl();
    },

    /**
     *
     * @param cellElements
     */
    setCellElements: function( cellElements ) {
        this.control.set( 'cellElements', cellElements );
    },

    /**
     *
     * @param toggle
     */
    toggle: function( toggle ) {
        this.control.set( 'toggle', toggle );
    },

    /**
     *
     */
    getSelected: function() {
        this.control.get( 'selected' );
    },

    /**
     *
     * @param selected
     */
    setSelected: function( selected ) {
        this.control.set( 'selected', selected );
    },

    /**
     *
     * @param multiSelect
     */
    setMultiSelect: function( multiSelect ) {
        this.control.set( 'multiSelect', multiSelect );
    },

    /**
     *
     * @param showSelectors
     */
    setShowSelectors: function( showSelectors ) {
        this.control.set( 'showSelectors', showSelectors );
    },

    /**
     *
     * @param handler
     */
    onToggle: function( handler ) {
        this.control.onToggle( handler );
    },

    /**
     *
     * @param value
     */
    setRowBackground: function( value ) {
        this.control.set( 'rowBackground', value );
    },

    /**
     * @returns {*}
     */
    getRowBackground: function() {
        return this.control.get( 'rowBackground' );
    },

    /**
     *
     * @param value
     */
    setRowForeground: function( value ) {
        this.control.set( 'rowForeground', value );
    },

    /**
     * @returns {*}
     */
    getRowForeground: function() {
        return this.control.get( 'rowForeground' );
    },

    /**
     *
     * @param value
     */
    setRowTextStyle: function( value ) {
        this.control.set( 'rowTextStyle', value );
    },

    /**
     * @returns {*}
     */
    getRowTextStyle: function() {
        return this.control.get( 'rowTextStyle' );
    },

    /**
     *
     * @param value
     */
    setRowStyle: function( value ) {
        this.control.set( 'rowStyle', value );
    },

    /**
     * @returns {*}
     */
    getRowStyle: function() {
        return this.control.get( 'rowStyle' );
    },

    /**
     *
     * @param grid
     */
    setGrid: function( grid ) {
        this.control.set( 'grid', grid );
    },

    /**
     *
     * @param properties
     * @private
     */
    _transformRowProperties: function( properties ) {
        for( var name in properties ) {
            if( !properties.hasOwnProperty( name ) ) {
                continue;
            }

            this.setProperty( properties[ name ], this.getProperty( name ) );

            this.onPropertyChanged( name, ( function( row, prop ) {
                return function( context, args ) {
                    row.setProperty( prop, args.newValue );
                };
            } )( this, properties[ name ] ) );
        }

    }

} );

