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

Form.prototype.createControl = function( parent ) {
    return new FormControl( parent );
};

Form.prototype.onSubmit = function( handler ) {
    var callback = function( nativeEventData ) {
        handler( nativeEventData );
    };

    return this.control.onSubmit( callback );
};

Form.prototype.setSubmitFunction = function( func ) {
    this.control.setSubmitFunction( func );
};

Form.prototype.getSubmitFunction = function() {
    return this.control.getSubmitFunction();
};

Form.prototype.setMethod = function( method ) {
    this.control.setMethod( method );
};

Form.prototype.getMethod = function() {
    return this.control.getMethod();
};

Form.prototype.setAction = function( action ) {
    this.control.setAction( action );
};

Form.prototype.getAction = function() {
    return this.control.getAction();
};
