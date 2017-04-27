/**
 *
 * @augments ControlView
 * @constructor
 */
var MenuItemButtonView = LinkButtonView.extend( {

    /**
     *
     */
    updateHorizontalAlignment: function() {
        var horizontalAlignment = this.model.get( 'horizontalAlignment' );
        var that = this;
        var $el;

        domHelper.whenReady(
            function() {
                $el = that.$el.parent().parent();
                return $el.length > 0;
            },

            function() {
                if( horizontalAlignment == 'Right' ) {
                    $el
                        .addClass( 'pull-right' );
                } else {
                    $el
                        .removeClass( 'pull-right' );
                }
            }
        );
    }

} );

InfinniUI.ObjectUtils.setPropertyValueDirect( InfinniUI, 'viewModes.Button.menuItem', MenuItemButtonView );
