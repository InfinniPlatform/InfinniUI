/**
 *
 * @param metadata
 * @param builder
 * @param {Object} builderParams
 * @param builderParams.parentView
 * @param builderParams.parent
 * @param {string} builderParams.basePathOfProperty
 * @return {Function}
 * @constructor
 */
function Executor(metadata, builder, builderParams) {

    var handler;
    var scriptName, scriptBody;

    if (!metadata) {
        console.log('Metadata not found');
    } else if (typeof metadata === 'string') {
        if (metadata[0] === '{' && metadata[metadata.length - 1] === '}') {
            scriptBody = metadata.substring(1, metadata.length - 1);
            handler = BaseScriptExecutor(builderParams.parentView, InlineScriptFactory(scriptBody, builder, builderParams));
        } else {
            scriptName = metadata;
            handler = BaseScriptExecutor(builderParams.parentView, CompiledScriptFactory(scriptName, builderParams.parentView));
        }
    } else if (metadata['Name']) {//CompiledScript
        scriptName = metadata['Name'];
        handler = BaseScriptExecutor(builderParams.parentView, CompiledScriptFactory(scriptName, builderParams.parentView));
    } else if (typeof metadata === 'object') {
        //Action
        handler = ActionExecutor(ActionFactory(metadata, builder, builderParams));
    } else {
        console.log('Unknown metadata');
    }

    return handler ? handler :  function() {};
}