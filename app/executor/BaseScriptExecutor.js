function BaseScriptExecutor(view, scriptFactory) {

    var script = null;

    return function( args ) {
        var context = view ? view.getContext() : null;

        if (script === null) {
            script = scriptFactory.get();
        }

        return script.call(null, context, args)
    }

}