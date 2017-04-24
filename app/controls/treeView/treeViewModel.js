var TreeViewModel = ListEditorBaseModel.extend( {

    defaults: _.defaults( {
        onExpand: null,
        onCollapse: null
    },
        ListEditorBaseModel.prototype.defaults
    ),

    initialize: function() {
        ListEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    toggleItem: function( item, toggle ) {
        var value = this.valueByItem( item );

        this.toggleValue( value, toggle );
        this.trigger( 'toggle' );
    }

} );

InfinniUI.TreeViewModel = TreeViewModel;
