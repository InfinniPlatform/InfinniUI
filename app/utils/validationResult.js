/**
 *
 * @constructor
 */
function ValidationResult() {
    this.IsValid = true;
    this.Items = [];
}

_.extend( ValidationResult.prototype, {

    /**
     *
     * @param message
     * @param propertyName
     */
    error: function( message, propertyName ) {
        if( this.IsValid ) {
            this.IsValid = false;
        }

        this.Items.push( {
            Message: message,
            Property: propertyName || ''
        } );
    }

} );

InfinniUI.ValidationResult = ValidationResult;
