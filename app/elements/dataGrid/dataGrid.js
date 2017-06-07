/**
 * @augments ListEditorBase
 * @param parent
 * @constructor
 */
function DataGrid( parent ) {
    _.superClass( DataGrid, this, parent );
}

InfinniUI.DataGrid = DataGrid;

_.inherit( DataGrid, ListEditorBase );

/**
 * Возвращает коллекцию колонок таблицы {@see DataGridColumn}
 * @returns {Collection}
 */
DataGrid.prototype.getColumns = function() {
    return this.control.get( 'columns' );
};

/**
 *
 * @param value
 */
DataGrid.prototype.setShowSelectors = function( value ) {
    if( typeof value !== 'undefined' && value !== null ) {
        this.control.set( 'showSelectors', !!value );
    }
};

/**
 * @returns {*}
 */
DataGrid.prototype.getShowSelectors = function() {
    return this.control.get( 'showSelectors' );
};

/**
 *
 * @returns {DataGridRow}
 */
DataGrid.prototype.createRow = function() {
    return new DataGridRow( this );
};

/**
 *
 * @param value
 */
DataGrid.prototype.setEnabled = function( value ) {
    if( typeof value === 'boolean' ) {
        this.control.setEnabled( value );
    }
};

/**
 * @description Устанавливает значение, определяющее виден ли элемент "Выбрать все" в шапке таблицы.
 * @param {boolean} value
 */
DataGrid.prototype.setCheckAllVisible = function( value ) {
    if( typeof value === 'boolean' ) {
        this.control.set( 'checkAllVisible', value );
    }
};

/**
 * @description Возвращает значение, определяющее виден ли элемент "Выбрать все" в шапке таблицы.
 * @returns {boolean}
 */
DataGrid.prototype.getCheckAllVisible = function() {
    return this.control.get( 'checkAllVisible' );
};

/**
 * @description Возвращает состояние элемента "Выбрать все" из шапки таблицы
 * @returns {boolean}
 */
DataGrid.prototype.getCheckAll = function() {
    return this.control.get( 'checkAll' );
};

/**
 * @description Устанавливает состояние элемента "Выбрать все" из шапки таблицы
 * @params {boolean} checkAll
 */
DataGrid.prototype.setCheckAll = function( checkAll ) {
    this.control.set( 'checkAll', checkAll );
};

/**
 * @description Устанавливает обработчик события о том, что изменилось состояние элемента "Выбрать все" в шапке таблицы
 * @param {function} handler
 */
DataGrid.prototype.onCheckAllChanged = function( handler ) {
    this.control.onCheckAllChanged( this.createControlEventHandler( this, handler ) );
};

/**
 *
 * @returns {DataGridControl}
 */
DataGrid.prototype.createControl = function() {
    return new DataGridControl();
};

/**
 *
 * @param handler
 * @returns {*}
 */
DataGrid.prototype.onRowClick = function( handler ) {
    var that = this;
    var callback = function( nativeEventData ) {
        var eventData = that._getHandlingMouseEventData( nativeEventData );
        handler( eventData );
    };
    return this.control.onRowClick( callback );
};

/**
 *
 * @param handler
 * @returns {*}
 */
DataGrid.prototype.onRowDoubleClick = function( handler ) {
    var that = this;
    var callback = function( nativeEventData ) {
        var eventData = that._getHandlingMouseEventData( nativeEventData );
        handler( eventData );
    };
    return this.control.onRowDoubleClick( callback );
};

/**
 * @returns {*}
 */
DataGrid.prototype.getVerticalAlignment = function() {
    return this.control.get( 'verticalAlignment' );
};

/**
 *
 * @param verticalAlignment
 */
DataGrid.prototype.setVerticalAlignment = function( verticalAlignment ) {
    if( typeof verticalAlignment === 'string' ) {
        this.control.set( 'verticalAlignment', verticalAlignment );
    }
};
