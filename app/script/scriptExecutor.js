/**
 *
 * @param parent
 * @constructor
 */
function ScriptExecutor(parent) {
    this.parent = parent;
}

/**
 *
 * @param {string} scriptName
 * @param {Object} args
 * @returns {*}
 */
ScriptExecutor.prototype.executeScript = function (scriptName, args) {
    var parent = this.parent;
    var context = parent.getContext();
    var result;

    var scriptCompiled = parent.getScripts().getById(scriptName);

    if (context && scriptCompiled) {
        result = scriptCompiled.func.call(undefined, context, args);
    }

    return result;
};