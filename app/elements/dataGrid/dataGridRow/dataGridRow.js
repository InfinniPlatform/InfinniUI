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

    createControl: function() {
        return new DataGridRowControl();
    },

    setCellElements: function( cellElements ) {
        this.control.set( 'cellElements', cellElements );
    },

    toggle: function( toggle ) {
        this.control.set( 'toggle', toggle );
    },

    getSelected: function() {
        this.control.get( 'selected' );
    },

    setSelected: function( selected ) {
        this.control.set( 'selected', selected );
    },

    setMultiSelect: function( multiSelect ) {
        this.control.set( 'multiSelect', multiSelect );
    },

    setShowSelectors: function( showSelectors ) {
        this.control.set( 'showSelectors', showSelectors );
    },

    onToggle: function( handler ) {
        this.control.onToggle( handler );
    },

    setRowBackground: function( value ) {
        this.control.set( 'rowBackground', value );
    },

    getRowBackground: function() {
        return this.control.get( 'rowBackground' );
    },

    setRowForeground: function( value ) {
        this.control.set( 'rowForeground', value );
    },

    getRowForeground: function() {
        return this.control.get( 'rowForeground' );
    },

    setRowTextStyle: function( value ) {
        this.control.set( 'rowTextStyle', value );
    },

    getRowTextStyle: function() {
        return this.control.get( 'rowTextStyle' );
    },

    setRowStyle: function( value ) {
        this.control.set( 'rowStyle', value );
    },

    getRowStyle: function() {
        return this.control.get( 'rowStyle' );
    },

    setGrid: function( grid ) {
        this.control.set( 'grid', grid );
    },

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

