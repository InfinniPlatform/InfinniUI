/**
 *
 * @param {ActionFactory} actionFactory
 * @return {Function}
 * @constructor
 */
function ActionExecutor(actionFactory) {

    var action = null;

    return function( ) {

        if (action === null) {
            action = actionFactory.get();
        }

        var cb = Array.prototype.filter.call(arguments, function( arg ) {
            return typeof arg === 'function'
        }).pop();

        action.execute.call(action, cb);
    }

}