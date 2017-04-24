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

    createControl: function() {
        return new CellControl();
    },

    getColumnSpan: function() {
        return this.control.get( 'columnSpan' );
    },

    setColumnSpan: function( newColumnSpan ) {
        this.control.set( 'columnSpan', newColumnSpan );
    }

} );

InfinniUI.Cell = Cell;
