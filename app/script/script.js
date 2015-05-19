/**
 *
 * @constructor
 */
function Script(body, name) {
    this.body = body;
    this.name = name;
}
/**
 *
 * @type {{collection: {}, addToCollection: addToCollection, run: run}}
 */
Script.prototype.run = function(context, args){
    var method = new Function('context', 'args', this.body);
    var result;

    try {
        result = method(context, args);
    } catch (err) {
        console.groupCollapsed('%2$s: %1$c%3$s', 'color: #ff0000', this.name, err.message);
        console.error(this.body);
        console.groupEnd();
        alert(this.name + "\r\n" + err.message  + "\r\n" + this.body);
    }
    return result;
};