/**
 *
 * @param parent
 * @constructor
 */
function ScriptExecutor( parent ) {
    this.parent = parent;
}

InfinniUI.ScriptExecutor = ScriptExecutor;

/**
 *
 * @param {string} scriptName
 * @param {Object} args
 * @returns {*}
 */
ScriptExecutor.prototype.executeScript = function( scriptName, args ) {
    var parent = this.parent;
    var context = parent.getContext();
    var result;
    var scriptBody;
    var scriptCompiled;

    // аналогичные действия выполняются в DataBindingBuilder, если будете править, там тоже измените
    if( scriptName.substr( 0, 1 ) == '{' ) {
        scriptBody = scriptName.substr( 1, scriptName.length - 2 );
        scriptCompiled = this.buildScriptByBody( scriptBody );
    } else {
        scriptCompiled = parent.getScripts().getById( scriptName );
        if( scriptCompiled ) {
            scriptCompiled = scriptCompiled.func;
        }
    }

    if( context && scriptCompiled ) {
        result = scriptCompiled.call( undefined, context, args );
    }

    return result;
};

/**
 *
 * @param scriptBody
 * @returns {Function}
 */
ScriptExecutor.prototype.buildScriptByBody = function( scriptBody ) {
    var context = this.parent.getContext();
    var args = {
        metadata: {
            'Body': scriptBody,
            'Name': 'InlineScript'
        }
    };
    var scriptBuilder = new ScriptBuilder();

    return scriptBuilder.build( context, args );
};
