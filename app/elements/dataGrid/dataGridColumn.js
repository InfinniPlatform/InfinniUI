/**
 * @augments Backbone.Events
 * @constructor
 */
function DataGridColumn() {
    this._values = Object.create( null );
}

/**
 *
 * @param value
 */
DataGridColumn.prototype.setHeader = function( value ) {
    this.setProperty( 'header', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getHeader = function() {
    return this.getProperty( 'header' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setCellTemplate = function( value ) {
    this.setProperty( 'cellTemplate', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getCellTemplate = function() {
    return this.getProperty( 'cellTemplate' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setCellSelector = function( value ) {
    this.setProperty( 'cellSelector', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getCellSelector = function() {
    return this.getProperty( 'cellSelector' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setHeaderTemplate = function( value ) {
    this.setProperty( 'cellHeaderTemplate', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getHeaderTemplate = function() {
    return this.getProperty( 'cellHeaderTemplate' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setWidth = function( value ) {
    this.setProperty( 'width', value );
};

/**
 * @returns {*}
 * @param value
 */
DataGridColumn.prototype.getWidth = function( value ) {
    return this.getProperty( 'width' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setSortable = function( value ) {
    this.setProperty( 'sortable', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getSortable = function() {
    return this.getProperty( 'sortable' );
};

/**
 *
 * @returns {*}
 */
DataGridColumn.prototype.isSortable = function() {
    return this.getSortable();
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setSortDirection = function( value ) {
    this.setProperty( 'sortDirection', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getSortDirection = function() {
    return this.getProperty( 'sortDirection' );
};

/**
 *
 * @param handler
 */
DataGridColumn.prototype.setSortFunction = function( handler ) {
    this.setProperty( 'sortFunction', handler );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getSortFunction = function() {
    return this.getProperty( 'sortFunction' );
};

/**
 *
 * @param value
 */
DataGridColumn.prototype.setIsHeaderTemplateEmpty = function( value ) {
    this.setProperty( 'isHeaderTemplateEmpty', value );
};

/**
 * @returns {*}
 */
DataGridColumn.prototype.getIsHeaderTemplateEmpty = function() {
    return this.getProperty( 'isHeaderTemplateEmpty' );
};

/**
 *
 * @param handler
 */
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

/**
 *
 * @param propertyName
 * @returns {*}
 */
DataGridColumn.prototype.getProperty = function( propertyName ) {
    return this._values[ propertyName ];
};

_.extend( DataGridColumn.prototype, Backbone.Events );

InfinniUI.DataGridColumn = DataGridColumn;
