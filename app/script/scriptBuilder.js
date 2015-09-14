/**
 *
 * @constructor
 */
function ScriptBuilder() {}

_.extend( ScriptBuilder.prototype, {
    build: function (context, args) {
        return new Script(args.metadata.Body, args.metadata.Name);
    }
});

