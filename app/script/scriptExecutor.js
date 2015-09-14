function ScriptExecutor(parent) {

    this.executeScript = function (scriptName, args) {

        var context = parent.getContext();
        var result;

        var scriptCompiled = parent.getScripts().getById(scriptName);

        if (context && scriptCompiled) {
            result = scriptCompiled.func.run(context, args);
        }

        return result;
    }
}