/**
 * @constructor
 * @augments ListEditorBaseView
 */
var DataGridView = ListEditorBaseView.extend( {

    template: {
        'grid': InfinniUI.Template[ 'controls/dataGrid/template/dataGrid.tpl.html' ],
        'gridStretched': InfinniUI.Template[ 'controls/dataGrid/template/dataGridStretched.tpl.html' ],
        'headerCell': InfinniUI.Template[ 'controls/dataGrid/template/headerCell.tpl.html' ],
        'sizeCell': InfinniUI.Template[ 'controls/dataGrid/template/sizeCell.tpl.html' ]
    },

    className: 'pl-datagrid',

    events: _.extend( {},
        ListEditorBaseView.prototype.events,
        {
            'click .pl-datagrid-toggle_all': 'onClickCheckAllHandler',
            'click thead .pl-datagrid-row__cell': 'onClickToHeaderCellHandler'
        }
    ),

    UI: _.defaults( {
        body: '.pl-datagrid__body',
        head: '.pl-datagrid__head',
        headContainer: '.pl-datagrid-container_head',
        header: '.pl-datagrid-row_header',
        firstRows: '.pl-datagrid-row_first',
        toggleCell: '.pl-toggle-cell',
        checkAll: '.pl-datagrid-toggle__button',
        items: 'tbody'
    }, ListEditorBaseView.prototype.UI ),

    initialize: function( options ) {
        ListEditorBaseView.prototype.initialize.call( this, options );
        this.rowElements = new HashMap();
    },

    initHandlersForProperties: function() {
        ListEditorBaseView.prototype.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:showSelectors', this.updateShowSelectors );
        this.listenTo( this.model, 'change:checkAllVisible', this.updateCheckAllVisible );
        this.listenTo( this.model, 'change:checkAll', this.updateCheckAll );
        this.listenTo( this.model, 'change:verticalAlignment', this.updateVerticalAlignment );

        /** Update hash item => element when item changed **/
        var rowElements = this.rowElements;
        var model = this.model;
        this.model.get( 'items' ).onChange( function( event ) {
            if( event.action === 'replace' ) {
                event.oldItems.forEach( function( oldItem, index ) {
                    rowElements.add( event.newItems[ index ], rowElements.get( oldItem ) );
                    rowElements.remove( oldItem );
                } );
            }
        } );
    },

    updateProperties: function() {
        ListEditorBaseView.prototype.updateProperties.call( this );
        this.updateShowSelectors();
        this.updateCheckAllVisible();
        this.updateCheckAll();
        this.updateDisabledItem();
        this.updateVerticalAlignment();
    },

    updateShowSelectors: function() {
        var showSelectors = this.model.get( 'showSelectors' );
        this.$el.toggleClass( 'pl-datagrid_selectors_show', showSelectors );
        this.$el.toggleClass( 'pl-datagrid_selectors_hide', !showSelectors );
    },

    updateGrouping: function() {
    },

    updateVerticalAlignment: function() {
        this.switchClass( 'verticalAlignment', this.model.get( 'verticalAlignment' ), this.$el, false );
        this.switchClass( 'verticalAlignment', this.model.get( 'verticalAlignment' ), this.ui.body, false );
    },

    updateCheckAll: function() {
        var checkAll = this.model.get( 'checkAll' );
        this.ui.checkAll.prop( 'checked', checkAll );
    },

    getHorizontalScrollBarWidth: function() {
        if( typeof DataGridView.scrollbarWidth === 'undefined' ) {
            var scrollDiv = document.createElement( 'div' );
            var body = document.body;

            scrollDiv.className = 'modal-scrollbar-measure';
            var style = {
                position: 'absolute',
                top: '-9999px',
                width: '50px',
                height: '50px',
                overflow: 'scroll'
            };

            for( var name in style ) {
                scrollDiv.style[ name ] = style[ name ];
            }

            body.appendChild( scrollDiv );
            DataGridView.scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            body.removeChild( scrollDiv );
        }

        return DataGridView.scrollbarWidth;
    },

    updateCheckAllVisible: function() {
        var checkAllVisible = this.model.get( 'checkAllVisible' );
        this.ui.checkAll.toggleClass( 'hidden', !checkAllVisible );
    },

    updateMultiSelect: function() {
        ListEditorBaseView.prototype.updateMultiSelect.call( this );

        var multiSelect = this.model.get( 'multiSelect' );
        this.$el.toggleClass( 'pl-datagrid_select_multi', multiSelect === true );
        this.$el.toggleClass( 'pl-datagrid_select_single', multiSelect !== true );
    },

    updateValue: function() {
        var model = this.model;
        var value = model.get( 'value' );
        var indices = [];
        var items = model.get( 'items' );

        if( !model.get( 'multiSelect' ) && value !== undefined && value !== null ) {
            value = [ value ];
        }

        if( Array.isArray( value ) ) {
            indices = value
                .map( function( val ) {
                    return model.itemIndexByValue( val );
                } )
                .filter( function( index ) {
                    return index !== -1;
                } );
        }

        this.rowElements.forEach( function( rowElement, item ) {
            var index = items.indexOf( item );
            var toggle = indices.indexOf( index ) !== -1;
            rowElement.toggle( toggle );
        } );
    },

    updateSelectedItem: function() {
        var model = this.model;
        var selectedItem = model.get( 'selectedItem' );

        this.rowElements.forEach( function( rowElement, item ) {
            rowElement.setSelected( item === selectedItem );
        } );
    },

    updateDisabledItem: function() {
        var model = this.model;
        var disabledItemCondition = model.get( 'disabledItemCondition' );
        var isEnabled;

        if( disabledItemCondition !== null ) {
            this.rowElements.forEach( function( rowElement, item ) {
                isEnabled = !disabledItemCondition( undefined, { value: item } );
                if( rowElement.getSelected() === item && isEnabled === false ) {
                    model.set( 'selectedItem', null );
                }
                rowElement.setEnabled( isEnabled );
            } );
        } else {
            this.rowElements.forEach( function( rowElement, item ) {
                rowElement.setEnabled( true );
            } );
        }
    },

    updateEnabled: function() {
        var isEnabled = this.model.get( 'enabled' );
        if( isEnabled ) {
            this.updateDisabledItem();
        } else {
            this.disableDataGridItems();
        }
    },

    disableDataGridItems: function() {
        this.model.set( 'selectedItem', null );
        this.rowElements.forEach( function( rowElement, item ) {
            rowElement.setEnabled( false );
        } );
    },

    render: function() {
        var that = this;
        this.prerenderingActions();

        var verticalAlignment = this.model.get( 'verticalAlignment' );
        var template = ( verticalAlignment === 'Stretch' ) ? this.template.gridStretched : this.template.grid;
        this.$el.html( template() );

        this.bindUIElements();

        this.renderHeaders();
        this.renderItems();

        this.trigger( 'render' );

        this.applyColumnWidth();
        this.syncBodyAndHead();
        this.postrenderingActions();
        setTimeout( function() {
            that.updateProperties();
            //devblockstart
            window.InfinniUI.global.messageBus.send( 'render', { element: that } );
            //devblockstop
        }, 0 );
        return this;
    },

    applyColumnWidth: function() {
        var columns = this.model.get( 'columns' );
        var fixedTableLayout = false;

        this.ui.firstRows.children().each( function( i, el ) {
            var columnIndex = i % ( columns.length + 1 );

            if( columnIndex === 0 ) {
                //skip columns with checkbox/radiobutton
                return;
            }

            var column = columns.getByIndex( columnIndex - 1 );
            var width = column && column.getWidth();

            if( width ) {
                $( el ).css( 'width', width );
                fixedTableLayout = true;
            }
        } );

        this.$el.toggleClass( 'pl-datagrid_layout_fixed', fixedTableLayout );
    },

    syncBodyAndHead: function() {
        var $head = this.ui.head;

        $head.css( 'padding-right', this.getHorizontalScrollBarWidth() + 'px' );

        this.ui.body
            .off( 'scroll' )
            .on( 'scroll', this.onScrollBodyHandler.bind( this ) );
    },

    onScrollBodyHandler: function() {
        this.ui.headContainer.scrollLeft( this.ui.body.scrollLeft() );
    },

    renderHeaders: function() {
        var that = this;
        var columns = this.model.get( 'columns' );
        var sizeCells = [];
        var templateSizeCells = this.template.sizeCell();

        var $headers = columns.toArray().map( function( column ) {
            sizeCells.push( templateSizeCells );
            // @TODO remove hardcoded template when the memory leaks of dataBindings would have fixed
            // bug related to task JK-4516
            var $th = $( '<th class="pl-datagrid-row__cell"></th>' );

            var headerTemplate = column.getHeaderTemplate();
            var header = column.getHeader();

            $th.data( 'pl-column', column );

            if( column.getSortable() ) {
                $th.addClass( 'sortable' );

                if( column.getSortDirection() ) {
                    setTimeout( function() {
                        that.setUpColumnSort( column, $th, column.getSortDirection(), false );
                    }, 0 );
                }
            }

            var headerElement;

            if( headerTemplate ) {
                headerElement = headerTemplate( null, { value: header } );
                $th.append( headerElement.render() );
            } else {
                $th.append( header );
            }
            return $th;
        } );

        this.ui.header.append( $headers );
        this.ui.firstRows.append( sizeCells );
    },

    renderItems: function() {
        var model = this.model;
        var valueSelector = model.get( 'valueSelector' );
        var itemTemplate = model.get( 'itemTemplate' );
        var items = model.get( 'items' );
        var $items = this.ui.items;
        var that = this;

        this.removeRowElements();

        items.forEach( function( item, index ) {
            setTimeout( function() {
                var element = itemTemplate( undefined, { index: index, item: item } );

                element.onBeforeClick( function() {
                    var items = model.get( 'items' );
                    var item = items.getByIndex( index );
                    var rowItem = that.rowElements.get( item );
                    if( rowItem.getEnabled() !== false ) {
                        model.set( 'selectedItem', item );
                    }
                } );

                element.onToggle( function() {
                    var enabled = this.model.get( 'enabled' );
                    var items = model.get( 'items' );

                    if( enabled ) {
                        model.toggleValue( valueSelector( undefined, { value: items.getByIndex( index ) } ) );
                    }
                } );
                that.addRowElement( item, element );

                var $element = element.render();
                $items.append( $element );
            }, 0 );
        }, this );
    },

    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        this.rowElements.values.forEach( function( element ) {
            if( focusable ) {
                element.control.controlView.$el.attr( 'tabindex', 0 );
            } else {
                element.control.controlView.$el.removeAttr( 'tabindex' );
            }
        } );
    },

    addRowElement: function( item, element ) {
        this.addChildElement( element );
        this.rowElements.add( item, element );
    },

    removeRowElements: function() {
        this.removeChildElements();
        this.rowElements.clear();
    },

    onClickCheckAllHandler: function() {
        this.model.toggleCheckAll();
    },

    onClickToHeaderCellHandler: function( e ) {
        var $th = $( e.currentTarget );
        var column = $th.data( 'pl-column' );

        if( column && column.isSortable() ) {
            if( column.getSortDirection() === null ) {
                this.resetSort();
                this.setUpColumnSort( column, $th, 'asc' );
            } else if( column.getSortDirection() === 'asc' ) {
                this.resetSort( 'asc' );
                this.setUpColumnSort( column, $th, 'desc' );
            } else if( column.getSortDirection() === 'desc' ) {
                this.resetSort( 'desc' );
                this.setUpColumnSort( column, $th, 'asc' );
            }
        }
    },

    setUpColumnSort: function( column, $th, direction, triggerEvent ) {
        column.setSortDirection( direction );
        this.model.set( 'sortedColumn', column );
        if( !column.getIsHeaderTemplateEmpty() ) {
            $th.addClass( 'sorted headerTemplate-sorted-' + direction );
        } else {
            $th.addClass( 'sorted sorted-' + direction );
        }
        if( triggerEvent !== false ) {
            column.trigger( 'onSort', { sortDirection: direction } );
        }
    },

    resetSort: function( direction ) {
        var $sortableCell;

        if( !direction ) {
            $sortableCell = this.$el.find( '.sorted' );
            $sortableCell.removeClass( 'sorted headerTemplate-sorted-asc headerTemplate-sorted-desc sorted-asc sorted-desc' );
            var sortedCell = this.model.get( 'sortedColumn' );
            if( sortedCell ) {
                sortedCell.setSortDirection( null );
            }
        } else {
            $sortableCell = this.$el.find( '.sorted' );
            $sortableCell.removeClass( 'headerTemplate-sorted-' + direction + ' sorted-' + direction );
        }
    }

} );


