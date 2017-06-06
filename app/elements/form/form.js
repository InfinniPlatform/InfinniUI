/**
 *
 * @param parent
 * @constructor
 * @augment StackPanel
 */
function Form( parent ) {
    _.superClass( Form, this, parent );
}

InfinniUI.Form = Form;

_.inherit( Form, StackPanel );

/**
 *
 * @param parent
 * @returns {FormControl}
 */
Form.prototype.createControl = function( parent ) {
    return new FormControl( parent );
};

/**
 *
 * @param handler
 * @returns {*}
 */
Form.prototype.onSubmit = function( handler ) {
    var callback = function( nativeEventData ) {
        handler( nativeEventData );
    };

    return this.control.onSubmit( callback );
};

/**
 *
 * @param func
 */
Form.prototype.setSubmitFunction = function( func ) {
    this.control.setSubmitFunction( func );
};

/**
 *
 * @returns {*}
 */
Form.prototype.getSubmitFunction = function() {
    return this.control.getSubmitFunction();
};

/**
 *
 * @param method
 */
Form.prototype.setMethod = function( method ) {
    this.control.setMethod( method );
};

/**
 *
 * @returns {*}
 */
Form.prototype.getMethod = function() {
    return this.control.getMethod();
};

/**
 *
 * @param action
 */
Form.prototype.setAction = function( action ) {
    this.control.setAction( action );
};

/**
 *
 * @returns {*}
 */
Form.prototype.getAction = function() {
    return this.control.getAction();
};
