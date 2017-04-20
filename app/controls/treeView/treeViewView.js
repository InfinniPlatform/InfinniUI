var TreeViewView = ListEditorBaseView.extend( {

    className: 'pl-treeview',

    classNameMultiSelect: 'pl-treeview_multi-select',

    classNameSingleSelect: 'pl-treeview_single-select',

    template: InfinniUI.Template[ 'controls/treeView/template/treeview.tpl.html' ],

    events: {},

    UI: _.defaults( {}, ListEditorBaseView.prototype.UI ),

    initialize: function( options ) {
        ListEditorBaseView.prototype.initialize.call( this, options );
        this.itemsMap = new HashMap();
        this.nodesMap = new HashMap();

    },

    addChildElement: function( node, item ) {
        this.nodesMap.add( item, node );
        ListEditorBaseView.prototype.addChildElement.call( this, node );
    },

    removeChildElements: function() {
        this.nodesMap.clear();
        this.itemsMap.clear();
        ListEditorBaseView.prototype.removeChildElements.call( this );
    },

    render: function() {
        this.prerenderingActions();
        this.removeChildElements();

        this.renderTemplate( this.getTemplate() );

        this.renderItems();
        this.updateProperties();

        this.trigger( 'render' );

        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    renderItems: function( parentId ) {
        var view = this;
        var $nodes;
        var model = this.model;
        var collection = model.get( 'items' );
        var parentSelector = model.get( 'parentSelector' );
        var keySelector = model.get( 'keySelector' );
        var nodeConstructor = this.getNodeConstructor();
        var itemTemplate = model.get( 'itemTemplate' );
        var itemsMap = this.itemsMap;

        $nodes = renderNodes();
        this.$el.append( $nodes );

        function renderNodes( parentId ) {
            return collection.toArray()
                .filter( function( item ) {
                    var parent = parentSelector( null, { value: item } );
                    return isEmpty( parentId ) ? isEmpty( parent ) : parent === parentId;
                } )
                .map( function( item ) {
                    var node = new nodeConstructor().render();
                    var $node = node.$el;
                    var $item = itemTemplate( null, {
                        value: item,
                        index: collection.indexOf( item )
                    } ).render();

                    $node.data( 'pl-data-item', item );

                    node.listenTo( model, 'change:selectedItem', function( model, selectedItem ) {
                        node.setSelected( selectedItem === item );
                    } );

                    node.listenTo( model, 'change:value', function( model, value ) {
                        var multiSelect = model.get( 'multiSelect' );

                        var checked;
                        if( !multiSelect ) {
                            checked = isValueForItem( value );
                        } else if( Array.isArray( value ) ) {
                            checked = value.some( isValueForItem );
                        } else {
                            checked = false;
                        }
                        node.setChecked( checked );
                    } );

                    view.listenTo( node, 'select', view.onSelectNodeHandler.bind( view, item, node ) );
                    view.listenTo( node, 'check', view.onCheckNodeHandler.bind( view, item, node ) );
                    view.listenTo( node, 'expand', view.onExpandNodeHandler.bind( view, item ) );
                    view.listenTo( node, 'collapse', view.onCollapseNodeHandler.bind( view, item ) );

                    node.setItemContent( $item );
                    var key = keySelector( null, { value: item } ),
                        $subitems = renderNodes( key );
                    node.setItemsContent( $subitems );

                    view.addChildElement( node, item );
                    itemsMap.add( key, item );

                    return $node;

                    function isValueForItem( value ) {
                        return model.itemByValue( value ) === item;
                    }
                } );
        }

        function isEmpty( value ) {
            return value === null || typeof value === 'undefined';
        }
    },

    getNodeConstructor: function() {
        var multiSelect = this.model.get( 'multiSelect' );

        return ( multiSelect === true ) ? TreeViewNodeCheckbox : TreeViewNodeRadio;
    },

    onSelectNodeHandler: function( item, index ) {
        var model = this.model;
        var multiSelect = model.get( 'multiSelect' );

        model.set( 'selectedItem', item );
        if( !multiSelect ) {
            //Клик по элементу одновременно переключает значение и делает элемент выделенным
            this.tryToggleValue( item );
        }
    },

    onCheckNodeHandler: function( item, index ) {
        var model = this.model;
        var multiSelect = model.get( 'multiSelect' );

        this.tryToggleValue( item );

        if( !multiSelect ) {
            //Клик по элементу одновременно переключает значение и делает элемент выделенным
            model.set( 'selectedItem', item );
        }
    },

    tryToggleValue: function( item ) {
        var model = this.model;
        var isDisabledItem = this.isDisabledItem( item );

        if( !isDisabledItem ) {
            var value = model.valueByItem( item );
            model.toggleValue( value );
        }
    },

    isDisabledItem: function( item ) {
        if( item === null && typeof item === 'undefined' ) {
            return false;
        }

        return this.model.isDisabledItem( item ) || this.isDisabledItem( this.getParent( item ) );
    },

    getParent: function( item ) {
        var parentSelector = this.model.get( 'parentSelector' );
        var parentId = parentSelector( null, { value: item } );

        return parentId && this.itemsMap.get( parentId );
    },

    getTemplate: function() {
        return this.template;
    },

    updateProperties: function() {
        ListEditorBaseView.prototype.updateProperties.call( this );
        this.updateMultiSelect();
    },

    updateMultiSelect: function() {
        var multiSelect = this.model.get( 'multiSelect' );
        this.$el.toggleClass( this.classNameMultiSelect, !!multiSelect );
        this.$el.toggleClass( this.classNameSingleSelect, !multiSelect );
    },

    updateEnabled: function() {
        ListEditorBaseView.prototype.updateEnabled.call( this );
    },

    updateValue: function() {
    },

    updateSelectedItem: function() {
    },

    updateGrouping: function() {
    },

    updateDisabledItem: function() {
        var model = this.model;
        var disabledItemCondition = model.get( 'disabledItemCondition' );
        var nodes = this.$el.find( '.pl-treeview-node' );

        nodes.removeClass( 'pl-disabled-list-item' );

        if( disabledItemCondition !== null && typeof disabledItemCondition !== 'undefined' ) {
            nodes.each( function( i, el ) {
                var $el = $( el );
                var item = $el.data( 'pl-data-item' );

                if( model.isDisabledItem( item ) ) {
                    $el.addClass( 'pl-disabled-list-item' );
                }
            } );
        }
    },

    collapseNode: function( key ) {
        var item = this.itemsMap.get( key );

        if( !item ) {
            return;
        }

        var node = this.nodesMap.get( item );
        if( node ) {
            node.collapse();
        }
    },

    toggleNode: function( key ) {
        var item = this.itemsMap.get( key );

        if( !item ) {
            return;
        }

        var node = this.nodesMap.get( item );
        if( node ) {
            var collapsed = node.getCollapsed();

            var toggle = collapsed ? this.expandNode : this.collapseNode;
            toggle.call( this, key );
        }
    },

    expandNode: function( key ) {
        var model = this.model;
        var item = this.itemsMap.get( key );

        if( !item ) {
            return;
        }

        var node = this.nodesMap.get( item );
        var parentSelector = model.get( 'parentSelector' );
        var keySelector = model.get( 'keySelector' );
        var parentId;
        var nodes = [ node ];

        while( parentId = parentSelector( null, { value: item } ) ) {
            if( !parentId ) {
                break;
            }
            item = this.itemsMap.get( parentId );
            node = this.nodesMap.get( item );
            nodes.push( node );
        }

        nodes.reverse().forEach( function( node ) {
            node.expand();
        } );
    },

    onExpandNodeHandler: function( item ) {
        var model = this.model;
        var onExpandNode = model.get( 'onExpand' );

        if( onExpandNode ) {
            onExpandNode( item );
        }
    },

    onCollapseNodeHandler: function( item ) {
        var model = this.model;
        var onCollapseNode = model.get( 'onCollapse' );

        if( onCollapseNode ) {
            onCollapseNode( item );
        }
    }

} );
