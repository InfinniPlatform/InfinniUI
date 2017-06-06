/**
 * @param parent
 * @param viewMode
 * @constructor
 * @augments Container
 * @mixes buttonMixin
 */
function PopupButton( parent, viewMode ) {
    _.superClass( PopupButton, this, parent, viewMode );
    this.buttonInit();
}

InfinniUI.PopupButton = PopupButton;

_.inherit( PopupButton, Container );

_.extend( PopupButton.prototype, {

    /**
     *
     * @param viewMode
     * @returns {PopupButtonControl}
     */
    createControl: function( viewMode ) {
        return new PopupButtonControl( viewMode );
    }

}, buttonMixin );
