function ScriptExecutor(parent) {

    this.executeScript = function(scriptName,args ) {

        var context = parent.getContext();
        var result;

        var scriptCompiled = parent.getScript(scriptName);

        if(context && scriptCompiled){

            result = scriptCompiled.run(context,args);
        }

        return result;
    }
}