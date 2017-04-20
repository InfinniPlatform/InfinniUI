function DataNavigationButtonFactory( dataNavigation ) {
    this._dataNavigation = dataNavigation;
}

DataNavigationButtonFactory.prototype.buttons = {
    'prev': DataNavigationPrevButton,
    'page': DataNavigationPageButton,
    'next': DataNavigationNextButton
};

DataNavigationButtonFactory.prototype.createButton = function( type, options ) {
    var buttonConstructor = this.buttons[ type ];

    if ( typeof buttonConstructor !== 'function' ) {
        console.error( 'Wrong button type: ' + type );
        return;
    }

    var button = new buttonConstructor( options );
    button.setParent( this._dataNavigation );

    return button;
};
