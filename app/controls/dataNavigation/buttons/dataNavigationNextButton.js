var DataNavigationNextButton = DataNavigationBaseButton.extend( {

    template: InfinniUI.Template[ 'controls/dataNavigation/buttons/template/next.tpl.html' ],

    events: {
        'click': 'onClickHandler'
    },

    initialize: function( options ) {
        this.model = new DataNavigationBaseButtonModel();
        DataNavigationBaseButton.prototype.initialize.call( this, options );
    },

    onClickHandler: function( event ) {
        this.trigger( 'command', 'next' );
    }

} );

InfinniUI.DataNavigationNextButton = DataNavigationNextButton;
