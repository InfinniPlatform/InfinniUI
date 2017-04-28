var ActionOnLoseFocus = function( $el, action ) {
    var that = this;
    this.$el = $el;
    this.action = action;
    this.checkNeedToActionBinded = _.bind( this.checkNeedToAction, this );

    $( document ).on( 'mousedown', that.checkNeedToActionBinded );
};

ActionOnLoseFocus.prototype.checkNeedToAction = function( e ) {
    if ( $( e.target ).closest( this.$el ).length == 0 ) {
        this.action();
        $( document ).off( 'mousedown', this.checkNeedToActionBinded );
    }
};

InfinniUI.ActionOnLoseFocus = ActionOnLoseFocus;
