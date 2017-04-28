function DataGridColumn() {
    this._values = Object.create( null );
}

DataGridColumn.prototype.setHeader = function( value ) {
    this.setProperty( 'header', value );
};

DataGridColumn.prototype.getHeader = function() {
    return this.getProperty( 'header' );
};

DataGridColumn.prototype.setCellTemplate = function( value ) {
    this.setProperty( 'cellTemplate', value );
};

DataGridColumn.prototype.getCellTemplate = function() {
    return this.getProperty( 'cellTemplate' );
};

DataGridColumn.prototype.setCellSelector = function( value ) {
    this.setProperty( 'cellSelector', value );
};

DataGridColumn.prototype.getCellSelector = function() {
    return this.getProperty( 'cellSelector' );
};

DataGridColumn.prototype.setHeaderTemplate = function( value ) {
    this.setProperty( 'cellHeaderTemplate', value );
};

DataGridColumn.prototype.getHeaderTemplate = function() {
    return this.getProperty( 'cellHeaderTemplate' );
};

DataGridColumn.prototype.setWidth = function( value ) {
    this.setProperty( 'width', value );
};

DataGridColumn.prototype.getWidth = function( value ) {
    return this.getProperty( 'width' );
};

DataGridColumn.prototype.setSortable = function( value ) {
    this.setProperty( 'sortable', value );
};

DataGridColumn.prototype.getSortable = function() {
    return this.getProperty( 'sortable' );
};

DataGridColumn.prototype.isSortable = function() {
    return this.getSortable();
};

DataGridColumn.prototype.setSortDirection = function( value ) {
    this.setProperty( 'sortDirection', value );
};

DataGridColumn.prototype.getSortDirection = function() {
    return this.getProperty( 'sortDirection' );
};

DataGridColumn.prototype.setSortFunction = function( handler ) {
    this.setProperty( 'sortFunction', handler );
};

DataGridColumn.prototype.getSortFunction = function() {
    return this.getProperty( 'sortFunction' );
};

DataGridColumn.prototype.setIsHeaderTemplateEmpty = function( value ) {
    this.setProperty( 'isHeaderTemplateEmpty', value );
};

DataGridColumn.prototype.getIsHeaderTemplateEmpty = function() {
    return this.getProperty( 'isHeaderTemplateEmpty' );
};

DataGridColumn.prototype.onSort = function( handler ) {
    var that = this;
    var callback = function( nativeEventData ) {
        handler( nativeEventData );
    };
    this.on( 'onSort', callback );
};

/**
 * @description Для взаимодействие с DataBinding
 * @param propertyName
 * @param callback
 */
DataGridColumn.prototype.onPropertyChanged = function( propertyName, callback ) {
    this.on( 'change:' + propertyName, callback );
};

/**
 * @description Для взаимодействие с DataBinding
 * @param propertyName
 * @param propertyValue
 */
DataGridColumn.prototype.setProperty = function( propertyName, propertyValue ) {
    var oldValue = this._values[ propertyName ];

    this._values[ propertyName ] = propertyValue;
    if( oldValue !== propertyValue ) {
        this.trigger( 'change:' + propertyName, null, {
            property: propertyName,
            oldValue: oldValue,
            newValue: propertyValue
        } );
    }
};

DataGridColumn.prototype.getProperty = function( propertyName ) {
    return this._values[ propertyName ];
};

_.extend( DataGridColumn.prototype, Backbone.Events );

InfinniUI.DataGridColumn = DataGridColumn;
