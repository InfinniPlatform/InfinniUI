function hiddenScreen() {
    this.middleElement = $( '<div></div>' ).css( {
        'position': 'absolute',
        top: '-10000px'
    } );
}
hiddenScreen.prototype = {
    add: function( element ) {
        $( 'body' ).prepend( this.middleElement );
        this.middleElement.append( element );
    }
};

window.InfinniUI.hiddenScreen = hiddenScreen;
