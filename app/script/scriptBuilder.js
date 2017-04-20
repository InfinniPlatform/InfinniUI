/**
 *
 * @constructor
 */
function ScriptBuilder() {}

window.InfinniUI.ScriptBuilder = ScriptBuilder;


ScriptBuilder.prototype.build = function( context, args ) {
    var
        metadata = args.metadata,
        name = metadata.Name,
        body = metadata.Body;

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

