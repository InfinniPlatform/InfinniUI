function SpecialApplicationView() {
    this.isView = true;

    this.getContainer = function() {
        return this.$container;
    };

    this.open = function( $el ) {
        this.$container = $el;

        if( $el ) {
            $el.addClass( 'special-application-view' );
        }
    };

    this.getApplicationView = function() {
        return this;
    };

    this.getContext = function() {
        return null;
    };
}
