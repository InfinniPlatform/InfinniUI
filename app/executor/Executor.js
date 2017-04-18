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

    if (typeof metadata === 'string') {
        if (metadata[0] === '{' && metadata[metadata.length - 1] === '}') {
            scriptBody = metadata.substring(1, metadata.length - 1);
            handler = BaseScriptExecutor(builderParams.parentView, InlineScriptFactory(scriptBody, builder, builderParams));
        } else {
            scriptName = metadata;
            handler = BaseScriptExecutor(builderParams.parentView, CompiledScriptFactory(scriptName, builderParams.parentView));
        }
    } else if (metadata !== null && typeof metadata === 'object') {
        //Action
        handler = ActionExecutor(ActionFactory(metadata, builder, builderParams));
    }

    return handler ? handler :  function() {};
}