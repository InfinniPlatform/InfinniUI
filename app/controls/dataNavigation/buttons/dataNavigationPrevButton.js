/**
 *
 * @constructor
 */
var DataNavigationPrevButton = DataNavigationBaseButton.extend( {

    template: InfinniUI.Template[ 'controls/dataNavigation/buttons/template/prev.tpl.html' ],

    events: {
        'click': 'onClickHandler'
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        this.model = new DataNavigationBaseButtonModel();
        DataNavigationBaseButton.prototype.initialize.call( this, options );
    },

    /**
     *
     */
    onClickHandler: function() {
        this.trigger( 'command', 'prev' );
    }

} );

InfinniUI.DataNavigationPrevButton = DataNavigationPrevButton;
