/**
 *
 * @constructor
 */
function HiddenScreen() {

    this.middleElement = $( '<div></div>' ).css( {
        'position': 'absolute',
        top: '-10000px'
    } );

}

/**
 *
 * @type {{add: HiddenScreen.add}}
 */
HiddenScreen.prototype = {

    /**
     *
     * @param element
     */
    add: function( element ) {
        $( 'body' ).prepend( this.middleElement );
        this.middleElement.append( element );
    }

};

InfinniUI.HiddenScreen = HiddenScreen;
