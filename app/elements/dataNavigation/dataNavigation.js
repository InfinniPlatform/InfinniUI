/**
 * @augments Element
 * @param parent
 * @constructor
 */
function DataNavigation( parent ) {
    _.superClass( DataNavigation, this, parent );
}

InfinniUI.DataNavigation = DataNavigation;

_.inherit( DataNavigation, Element );

_.extend( DataNavigation.prototype, {

    /**
     *
     * @returns {DataNavigationControl}
     */
    createControl: function() {
        return new DataNavigationControl();
    },

    /**
     * @returns {*}
     */
    getDataSource: function() {
        return this.control.get( 'dataSource' );
    },

    /**
     *
     * @param value
     */
    setDataSource: function( value ) {
        this.control.set( 'dataSource', value );
    },

    /**
     * @returns {*}
     */
    getAvailablePageSizes: function() {
        return this.control.get( 'availablePageSizes' );
    },

    /**
     *
     * @param value
     */
    setPageNumber: function( value ) {
        this.control.set( 'pageNumber', value );
    },

    /**
     * @returns {*}
     */
    getPageNumber: function() {
        return this.control.get( 'pageNumber' );
    },

    /**
     *
     * @param handler
     */
    onPageNumberChanged: function( handler ) {
        this.control.onPageNumberChanged( this.createControlEventHandler( this, handler ) );
    },

    /**
     *
     * @param value
     */
    setPageSize: function( value ) {
        this.control.set( 'pageSize', value );
    },

    /**
     * @returns {*}
     */
    getPageSize: function() {
        return this.control.get( 'pageSize' );
    },

    /**
     *
     * @param handler
     */
    onPageSizeChanged: function( handler ) {
        this.control.onPageSizeChanged( this.createControlEventHandler( this, handler ) );
    },

    /**
     * @returns {*}
     */
    getPageCount: function() {
        return this.control.get( 'pageCount' );
    },

    /**
     *
     * @param value
     */
    setPageCount: function( value ) {
        this.control.set( 'pageCount', value );
    },

    /**
     * @returns {*}
     */
    getIsDataReady: function() {
        return this.control.get( 'isDataReady' );
    },

    /**
     *
     * @param value
     */
    setIsDataReady: function( value ) {
        this.control.set( 'isDataReady', value );
    }

} );
