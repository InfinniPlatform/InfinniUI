/**
 *
 * @param {ActionFactory} actionFactory
 * @return {Function}
 * @constructor
 */
function ActionExecutor( actionFactory ) {
    var action = null;

    return function() {
        if( action === null ) {
            action = actionFactory.get();
        }

        var cb = Array.prototype.filter.call( arguments, function( arg ) {
            return typeof arg === 'function';
        } ).pop();

        var canExecute = action.getProperty( 'canExecute' );
        if( canExecute ) {
            new Promise( function( resolve, reject ) {
                resolve();
            } )
                .then( function() {
                    return canExecute();
                } )
                .then( function( result ) {
                    if( result ) {
                        action.execute.call( action, cb );
                    }
                } );
        } else {
            action.execute.call( action, cb );
        }
    };
}

InfinniUI.ActionExecutor = ActionExecutor;
