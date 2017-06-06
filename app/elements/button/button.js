/**
 * @param parent
 * @param viewMode
 * @augments Element
 * @constructor
 * @mixes buttonMixin
 */
function Button( parent, viewMode ) {
    _.superClass( Button, this, parent, viewMode );
    this.buttonInit();
}

InfinniUI.Button = Button;

_.inherit( Button, Element );

_.extend( Button.prototype, {

    /**
     *
     * @param viewMode
     * @returns {ButtonControl}
     */
    createControl: function( viewMode ) {
        return new ButtonControl( viewMode );
    },

    /**
     *
     * @param type
     */
    setType: function( type ) {
        this.control.setType( type );
    },

    /**
     *
     * @returns {*|string}
     */
    getType: function() {
        return this.control.getType();
    }

}, buttonMixin );
