/**
 * @param parent
 * @constructor
 * @augments Container
 */
function Cell( parent ) {
    _.superClass( Cell, this, parent );
}

_.inherit( Cell, Container );

_.extend( Cell.prototype, {

    /**
     *
     * @returns {CellControl}
     */
    createControl: function() {
        return new CellControl();
    },

    /**
     * @returns {*}
     */
    getColumnSpan: function() {
        return this.control.get( 'columnSpan' );
    },

    /**
     *
     * @param newColumnSpan
     */
    setColumnSpan: function( newColumnSpan ) {
        this.control.set( 'columnSpan', newColumnSpan );
    }

} );

InfinniUI.Cell = Cell;
