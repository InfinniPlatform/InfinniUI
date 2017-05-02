var CommonListBoxView = BaseListBoxView.extend( {

    className: 'pl-listbox pl-listbox-common-mode',

    events: _.extend( {}, BaseListBoxView.prototype.events ),

    initialize: function( options ) {
        BaseListBoxView.prototype.initialize.call( this, options );
        this.initDomHandlers();
    },

    initDomHandlers: function() {
        var $listBox = this.$el;
        var that = this;

        $listBox.get( 0 ).addEventListener( 'click', function( e ) {
            e = $.event.fix( e );
            var $el = $( e.target );
            var $currentListItem, item, isDisabledItem;

            while( $el.get( 0 ) != $listBox.get( 0 ) ) {
                if( $el.hasClass( 'pl-listbox-i' ) ) {
                    $currentListItem = $el;
                }

                $el = $el.parent();
            }

            if( $currentListItem.length > 0 ) {
                item = $currentListItem.data( 'pl-data-item' );
                isDisabledItem = that.model.isDisabledItem( item );

                if( !isDisabledItem ) {
                    that.model.toggleValue( item );
                }

                that.model.set( 'selectedItem', item );
            }
        }, true );
    }

} );

InfinniUI.ObjectUtils.setPropertyValueDirect( InfinniUI, 'viewModes.ListBox.common', CommonListBoxView );
