/**
 *
 * @constructor
 */
var ListEditorBaseModel = ContainerModel.extend( _.extend( {

    defaults: _.defaults( {
        multiSelect: false,
        disabledItemCondition: null
    }, ContainerModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        var that = this;
        this.hashValueByItem = new HashMap();
        ContainerModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();

        this.bindSelectedItemsWithValue();

        this.get( 'items' ).onChange( function() {
            that.hashValueByItem.clear();
        } );
    },

    /**
     *
     * @param handler
     */
    onSelectedItemChanged: function( handler ) {
        this.on( 'change:selectedItem', function( source, newSelectedItem ) {
            handler( { value: newSelectedItem } );
        } );
    },

    /**
     *
     * @param value
     * @param toggle
     */
    toggleValue: function( value, toggle ) {
        var currentValue = this.get( 'value' );
        var multiSelect = this.get( 'multiSelect' );

        if( multiSelect ) {
            currentValue = Array.isArray( currentValue ) ? currentValue : [];

            var valueAsString = JSON.stringify( value );

            var newValue = currentValue.filter( function( val ) {
                return JSON.stringify( val ) !== valueAsString;
            } );

            if( typeof toggle === 'undefined' || toggle === true ) {
                if( newValue.length === currentValue.length ) {
                    newValue.push( value );
                }
            }

            this.set( 'value', newValue );

        } else {
            if( value != currentValue ) {
                this.set( 'value', value );
            }
        }
    },

    /**
     *
     */
    bindSelectedItemsWithValue: function() {
        return;
    },

    /**
     *
     * @param item
     * @returns {*}
     */
    valueByItem: function( item ) {
        var valueSelector = this.get( 'valueSelector' );

        if( !valueSelector ) {
            return item;
        } else {
            return valueSelector( undefined, { value: item } );
        }
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    itemInfoByValue: function( value ) {
        if( this.hashValueByItem.length === 0 ) {
            this.updateHashValueByItem();
        }
        var info;
        var index;
        var item = this.hashValueByItem.getKeyByValue( value );

        if( typeof item !== 'undefined' ) {
            info = {
                item: item,
                index: this.hashValueByItem.keys.indexOf( item )
            };
        } else {
            var text = JSON.stringify( value );
            index = this.hashValueByItem.findIndex( function( item, value ) {
                return JSON.stringify( value ) === text;
            } );

            if( index !== -1 ) {
                info = {
                    index: index,
                    item: this.hashValueByItem.keys[ index ]
                };
            }
        }

        return info;
    },

    /**
     *
     * @param value
     * @returns {undefined|*}
     */
    itemByValue: function( value ) {
        var itemInfo = this.itemInfoByValue( value );

        if( !itemInfo ) {
            return undefined;
        } else {
            return itemInfo.item;
        }
    },

    /**
     *
     * @param value
     * @returns {number}
     */
    itemIndexByValue: function( value ) {
        var itemInfo = this.itemInfoByValue( value );

        if( !itemInfo ) {
            return -1;
        } else {
            return itemInfo.index;
        }
    },

    /**
     *
     * @param item
     * @returns {*|number}
     */
    itemIndexByItem: function( item ) {
        var value = this.valueByItem( item );

        return this.itemIndexByValue( value );
    },

    /**
     *
     * @param item
     * @returns {boolean}
     */
    isDisabledItem: function( item ) {
        var disabledItemCondition = this.get( 'disabledItemCondition' );

        return ( disabledItemCondition !== null && typeof disabledItemCondition !== 'undefined' ) &&
            disabledItemCondition( undefined, { value: item } );
    },

    /**
     *
     */
    updateHashValueByItem: function() {
        var items = this.get( 'items' );
        var value;

        this.hashValueByItem.clear();
        items.forEach( function( item ) {
            value = this.valueByItem( item );
            this.hashValueByItem.add( item, value );
        }, this );
    }

}, editorBaseModelMixin ) );

InfinniUI.ListEditorBaseModel = ListEditorBaseModel;
