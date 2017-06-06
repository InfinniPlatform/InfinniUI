/**
 *
 * @constructor
 */
function SpecialApplicationView() {

    this.isView = true;

    /**
     *
     * @returns {*}
     */
    this.getContainer = function() {
        return this.$container;
    };

    /**
     *
     * @param $el
     */
    this.open = function( $el ) {
        this.$container = $el;

        if( $el ) {
            $el.addClass( 'special-application-view' );
        }
    };

    /**
     *
     * @returns {SpecialApplicationView}
     */
    this.getApplicationView = function() {
        return this;
    };

    /**
     *
     * @returns {null}
     */
    this.getContext = function() {
        return null;
    };

}
