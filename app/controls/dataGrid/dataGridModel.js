/**
 * @constructor
 * @augments ListEditorBaseModel
 */
var DataGridModel = ListEditorBaseModel.extend( {

    defaults: _.defaults( {
        showSelectors: true,
        checkAllVisible: false,
        checkAll: false,
        focusable: false,
        verticalAlignment: 'Top',
        sortedColumn: null,
        scroll: true
    }, ListEditorBaseModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ListEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        this.initColumns();
    },

    /**
     *
     */
    toggleCheckAll: function() {
        this.set( 'checkAll', !this.get( 'checkAll' ) );
    },

    /**
     *
     * @param handler
     */
    onCheckAllChanged: function( handler ) {
        this.on( 'change:checkAll', function( model, checkAll ) {
            handler.call( null, { value: checkAll } );
        } );
    },

    /**
     * @protected
     */
    initColumns: function() {
        this.set( 'columns', new Collection() );
    }

} );

InfinniUI.DataGridModel = DataGridModel;
