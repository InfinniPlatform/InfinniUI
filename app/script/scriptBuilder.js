/**
 *
 * @constructor
 */
function ScriptBuilder() {}

InfinniUI.ScriptBuilder = ScriptBuilder;

/**
 *
 * @param context
 * @param args
 * @returns {Function}
 */
ScriptBuilder.prototype.build = function( context, args ) {
    var metadata = args.metadata;
    var name = metadata.Name;
    var body = metadata.Body;
    var func = new Function( 'context', 'args', body );

    return function( context, args ) {
        var result;

        try {
            result = func.call( undefined, context, args );
        } catch ( err ) {
            console.groupCollapsed( '%2$s: %1$c%3$s', 'color: #ff0000', name, err.message );
            console.error( body );
            console.groupEnd();
        }

        return result;
    };
};

