/**
 *
 * @constructor
 */
function ScriptBuilder() {}

_.extend( ScriptBuilder.prototype, {
    build: function (metadata) {
        return new Script(metadata.Body, metadata.Name);
    }
});

