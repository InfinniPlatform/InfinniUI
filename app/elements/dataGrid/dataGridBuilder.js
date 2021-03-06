/**
 * @augments ListEditorBaseBuilder
 * @constructor
 */
function DataGridBuilder() {
    _.superClass( DataGridBuilder, this );
    this.columnBuilder = new DataGridColumnBuilder();
}

InfinniUI.DataGridBuilder = DataGridBuilder;

_.inherit( DataGridBuilder, ListEditorBaseBuilder );

_.extend( DataGridBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {DataGrid}
     */
    createElement: function( params ) {
        return new DataGrid( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ListEditorBaseBuilder.prototype.applyMetadata.call( this, params );

        var metadata = params.metadata;
        var element = params.element;

        element.setShowSelectors( metadata.ShowSelectors );
        element.setCheckAllVisible( metadata.CheckAllVisible );

        this.initBindingToProperty( params, 'VerticalAlignment' );

        var executorBuilderParams = {
            parentView: params.parentView,
            parent: element,
            basePathOfProperty: params.basePathOfProperty
        };

        if( metadata.OnCheckAllChanged ) {
            var onCheckAllChangedExecutor = Executor( metadata.OnCheckAllChanged, params.builder, executorBuilderParams );
            element.onCheckAllChanged( function( context, args ) {
                onCheckAllChangedExecutor( args );
            } );
        } else {
            setDefaultCheckAllBehavior( element );
        }

        if( metadata.OnRowClick ) {
            var onRowClickExecutor = Executor( metadata.OnRowClick, params.builder, executorBuilderParams );
            element.onRowClick( onRowClickExecutor );
        }

        if( metadata.OnRowDoubleClick ) {
            var onRowDoubleClickExecutor = Executor( metadata.OnRowDoubleClick, params.builder, executorBuilderParams );
            element.onRowDoubleClick( onRowDoubleClickExecutor );
        }

        if( typeof metadata.Scroll !== 'undefined' && metadata.Scroll === false ) {
            element.makeUnscrollable();
        }

        this.applyColumnsMetadata( params );
    },

    /**
     *
     * @param params
     */
    applyColumnsMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var collection = element.getColumns();

        if( Array.isArray( metadata.Columns ) ) {
            var columns = metadata.Columns.map( function( columnMetaData ) {
                return this.buildColumn( columnMetaData, params );
            }, this );

            collection.reset( columns );
        }
    },

    /**
     *
     * @param metadata
     * @param params
     * @returns {DataGridColumn}
     */
    buildColumn: function( metadata, params ) {
        return this.columnBuilder.build( params.element, metadata, params );
    },

    /**
     *
     * @param itemsBinding
     * @param itemPropertyMetadata
     * @param params
     * @returns {Function}
     */
    buildItemProperty: function( itemsBinding, itemPropertyMetadata, params ) {
        var dataGrid = params.element;
        var builder = this;

        return function( context, args ) {
            var row = params.builder.buildType( 'DataGridRow', {}, {
                parent: dataGrid,
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            } );

            row.setGrid( dataGrid );

            [ 'RowStyle', 'RowBackground', 'RowForeground', 'RowTextStyle' ]
                .forEach( initBindingToRowProperty.bind( null, row, args.index ) );

            var columns = dataGrid.getColumns();

            var cellElements = columns.toArray().map( function( column, index ) {
                var cellTemplate = column.getCellTemplate();
                var template = cellTemplate( itemsBinding, row );
                var cellEl = template( context, args );

                return cellEl;
            } );
            row.setCellElements( cellElements );
            row.setMultiSelect( dataGrid.getMultiSelect() );
            row.setShowSelectors( dataGrid.getShowSelectors() );
            return row;
        };

        function initBindingToRowProperty( row, index, propertyName ) {
            var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty( '' );
            var argumentForBuilder = {
                element: row,
                parent: dataGrid,
                builder: params.builder,
                metadata: params.metadata,
                parentView: params.parentView
            };
            argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild( '', index );

            builder.initBindingToProperty( argumentForBuilder, propertyName );
        }
    }

} );

/**
 * @description Устанавливает поведение по умолчанию для кнопки "Выбрать все"
 * @param {DataGrid} element
 * @constructor
 */
function setDefaultCheckAllBehavior( element ) {
    var checkAll = element.getCheckAll();

    element.onValueChanged( onValueChangedHandler );
    element.onCheckAllChanged( onCheckAllChangedHandler );

    /**
     *
     * @param context
     * @param {Object} event
     * @param {DataGrid} event.source
     * @param {boolean} event.newValue
     * @param {boolean} event.oldValue
     */
    function onValueChangedHandler( context, event ) {
        setCheckAll( _.isEqual( event.newValue, itemsToValue() ) );
    }

    /**
     *
     * @param context
     * @param {Object} event
     * @param {DataGrid} event.source
     * @param {boolean} event.value
     */
    function onCheckAllChangedHandler( context, event ) {
        var state = event.value;

        if( state === checkAll ) {
            return;
        }

        setCheckAll( state );

        var value = state ? itemsToValue() : [];

        element.setValue( value );
    }

    /**
     * @returns {Array}
     */
    function itemsToValue() {
        var valueSelector = element.getValueSelector();
        var items = element.getItems().toArray();

        return items.map( function( item ) {
            return valueSelector( undefined, { value: item } );
        } );
    }

    /**
     *
     * @param state
     */
    function setCheckAll( state ) {
        checkAll = state;
        element.setCheckAll( state );
    }
}
