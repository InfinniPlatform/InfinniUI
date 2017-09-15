/**
 * @augments ElementBuilder
 * @constructor
 * @mixes displayFormatBuilderMixin
 */
function ContainerBuilder() {
    _.superClass( ContainerBuilder, this );
}

InfinniUI.ContainerBuilder = ContainerBuilder;

_.inherit( ContainerBuilder, ElementBuilder );

/**
 * @abstract
 */
_.extend( ContainerBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {{itemsBinding: {DataBinding}}}
     */
    applyMetadata: function( params ) {
        var itemsBinding;

        ElementBuilder.prototype.applyMetadata.call( this, params );

        itemsBinding = this.initItems( params );
        this.initGroup( params, itemsBinding );

        return {
            itemsBinding: itemsBinding
        };
    },

    /**
     *
     * @param params
     * @returns {*}
     */
    initItems: function( params ) {
        var metadata = params.metadata;
        var itemsBinding = null;

        if( Array.isArray( metadata.Items ) ) {
            // отдельные не шаблонизируемые items, в metadata.Items - список методанных item'ов
            this.initNotTemplatingItems( params );
        } else if( metadata.Items ) {
            // шаблонизируемые однотипные items, в metadata.Items - биндинг на данные item'ов
            itemsBinding = this.initTemplatingItems( params );
        }

        return itemsBinding;
    },

    /**
     *
     * @param params
     * @returns {*|null}
     */
    initTemplatingItems: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var itemTemplate;
        var binding;
        var property;

        binding = params.builder.buildBinding( metadata.Items, {
            parentView: params.parentView,
            basePathOfProperty: params.basePathOfProperty
        } );

        binding.setMode( InfinniUI.BindingModes.toElement );

        this.bindElementItemsWithSorting( binding, params );

        if( 'ItemTemplate' in metadata ) {
            itemTemplate = this.buildItemTemplate( metadata.ItemTemplate, params );
        } else if( 'ItemFormat' in metadata ) {
            itemTemplate = this.buildItemFormat( binding, metadata.ItemFormat, params );
        } else if( 'ItemSelector' in metadata ) {
            itemTemplate = this.buildItemSelector( binding, metadata.ItemSelector, params );
        } else {
            if( 'ItemProperty' in metadata ) {
                property = metadata.ItemProperty;
            } else {
                property = '';
            }
            itemTemplate = this.buildItemProperty( binding, property, params );
        }

        element.setItemTemplate( itemTemplate );

        return binding;
    },

    /**
     *
     * @param params
     */
    initNotTemplatingItems: function( params ) {
        var itemsMetadata = params.metadata.Items;
        var element = params.element;
        var items = itemsMetadata.slice( 0 );
        //var fakeItems = (new Array(itemsMetadata.length + 1)).join(' ').split('');

        element.getItems().set( items );
        var itemTemplate = this.buildItemTemplateForUniqueItem( items, params );
        element.setItemTemplate( itemTemplate );
    },

    /**
     *
     * @param itemsBinding
     */
    tuneItemsBinding: function( itemsBinding ) {
        var source = itemsBinding.getSource();

        if( typeof source.tryInitData === 'function' ) {
            source.tryInitData();
        }
    },

    /**
     *
     * @param params
     * @param itemsBinding
     */
    initGroup: function( params, itemsBinding ) {
        if( this.hasGrouping( params ) ) {
            this.initGroupValueSelector( params );
            this.initGroupItemTemplate( params, itemsBinding );
        }
    },

    /**
     *
     * @param params
     * @returns {*|string|string}
     */
    hasGrouping: function( params ) {
        return params.metadata.GroupValueSelector || params.metadata.GroupValueProperty;
    },

    /**
     *
     * @param params
     */
    initGroupValueSelector: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var groupValueSelector;

        if( metadata.GroupValueSelector ) {
            groupValueSelector = function( context, args ) {
                var scriptExecutor = new ScriptExecutor( element.getScriptsStorage() );
                return scriptExecutor.executeScript( metadata.GroupValueSelector, args );
            };
        } else if( metadata.GroupValueProperty ) {
            groupValueSelector = function( context, args ) {
                return InfinniUI.ObjectUtils.getPropertyValue( args.value, metadata.GroupValueProperty );
            };
        } else {
            //Без группировки
            groupValueSelector = null;
        }
        element.setGroupValueSelector( groupValueSelector );
    },

    /**
     *
     * @param params
     * @param itemsBinding
     */
    initGroupItemTemplate: function( params, itemsBinding ) {
        var metadata = params.metadata;
        var element = params.element;
        var itemTemplate;

        if( metadata.GroupItemTemplate ) {
            itemTemplate = this.buildItemTemplate( metadata.GroupItemTemplate, params );
        } else if( metadata.GroupItemFormat ) {
            itemTemplate = this.buildItemFormat( itemsBinding, metadata.GroupItemFormat, params );
        } else if( metadata.GroupItemSelector ) {
            itemTemplate = this.buildItemSelector( itemsBinding, metadata.GroupItemSelector, params );
        } else if( metadata.GroupItemProperty ) {
            itemTemplate = this.buildItemProperty( itemsBinding, metadata.GroupItemProperty, params );
        }

        if( itemTemplate ) {
            element.setGroupItemTemplate( itemTemplate );
        }
    },

    /**
     *
     * @param itemsBinding
     * @param itemPropertyMetadata
     * @param params
     * @returns {Function}
     */
    buildItemProperty: function( itemsBinding, itemPropertyMetadata, params ) {
        return function( context, args ) {
            var index = args.index;
            var label = new Label( this );
            var sourceProperty;
            var source = itemsBinding.getSource();
            var binding = new DataBinding();

            sourceProperty = index.toString();
            if( itemsBinding.getSourceProperty() != '' ) {
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }
            if( itemPropertyMetadata != '' ) {
                sourceProperty = sourceProperty + '.' + itemPropertyMetadata;
            }

            binding.bindSource( source, sourceProperty );
            binding.bindElement( label, 'value' );

            return label;
        };
    },

    /**
     *
     * @param itemsBinding
     * @param itemFormatMetadata
     * @param params
     * @returns {Function}
     */
    buildItemFormat: function( itemsBinding, itemFormatMetadata, params ) {
        var format = this.buildDisplayFormat( itemFormatMetadata, params );

        return function( context, args ) {
            var index = args.index;
            var label = new Label( this );
            var sourceProperty = itemsBinding.getSourceProperty();
            var source = itemsBinding.getSource();
            var binding = new DataBinding();

            sourceProperty = index.toString();
            if( itemsBinding.getSourceProperty() != '' ) {
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }

            label.setDisplayFormat( format );

            binding.bindSource( source, sourceProperty );
            binding.bindElement( label, 'value' );

            return label;
        };
    },

    /**
     *
     * @param itemsBinding
     * @param itemSelectorMetadata
     * @param params
     * @returns {Function}
     */
    buildItemSelector: function( itemsBinding, itemSelectorMetadata, params ) {
        return function( context, args ) {
            var index = args.index;
            var label = new Label( this );
            var scriptExecutor = new ScriptExecutor( params.parentView );
            var sourceProperty = itemsBinding.getSourceProperty();
            var source = itemsBinding.getSource();
            var binding = new DataBinding();

            binding.setMode( InfinniUI.BindingModes.toElement );
            sourceProperty = index.toString();

            if( itemsBinding.getSourceProperty() != '' ) {
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }

            binding.setConverter( {
                toElement: function( _context, _args ) {
                    return scriptExecutor.executeScript( itemSelectorMetadata, _args );
                }
            } );

            binding.bindSource( source, sourceProperty );
            binding.bindElement( label, 'value' );

            return label;
        };
    },

    /**
     *
     * @param templateMetadata
     * @param params
     * @returns {Function}
     */
    buildItemTemplate: function( templateMetadata, params ) {
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty( '' );
        var propertyForSource = params.metadata[ 'Items' ][ 'Property' ] || '';
        var that = this;

        return function( context, args ) {
            var index = args.index;
            var bindingIndex;
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView
            };

            if( typeof index !== 'undefined' && index !== null ) {
                bindingIndex = that.bindingIndexByItemsIndex( index, params );

                if( typeof bindingIndex !== 'undefined' && bindingIndex !== null ) {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild( propertyForSource, bindingIndex );
                } else {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild( propertyForSource, index );
                }
            }

            return builder.build( templateMetadata, argumentForBuilder );
        };
    },

    /**
     * @public
     * @memberOf ContainerBuilder
     * @description Возвращает функцию itemTemplate для не шаблонизируемого item'а.
     * @param {Object} itemsMetadata метаданные.
     * @param {Object} params стандартные params, передаваемые внутри билдеров.
     **/
    buildItemTemplateForUniqueItem: function( itemsMetadata, params ) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty( '' );

        return function( context, args ) {
            var index = args.index;
            var item = element.getItems().getByIndex( index );
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView,
                basePathOfProperty: basePathOfProperty
            };

            return builder.build( item, argumentForBuilder );
        };
    },

    /**
     *
     * @param index
     * @param params
     * @returns {*}
     */
    bindingIndexByItemsIndex: function( index, params ) {
        var element = params.element;
        var items = element.getItems();

        return items.getProperty( index, 'bindingIndex' );
    },

    /**
     *
     * @param binding
     * @param params
     */
    bindElementItemsWithSorting: function( binding, params ) {
        // нетривиальный биндинг элементов нужен для того, чтобы правильно учитывались индексы при сортировке элементов
        var metadata = params.metadata;
        var element = params.element;
        var scriptExecutor = new ScriptExecutor( params.parent );
        var itemComparator;

        if( metadata.ItemComparator ) {
            itemComparator = function( item1, item2 ) {
                return scriptExecutor.executeScript( metadata.ItemComparator, { item1: item1, item2: item2 } );
            };
        }

        /**
         *
         */
        var source = binding.getSource();
        source.onPropertyChanged( '*', function( context, args ) {
            var items = element.getItems();
            //При замене целого элемента списка, заменить элемент в коллекции
            if( args.property && args.property.match( /^\d+$/ ) ) {
                items.replace( args.oldValue, args.newValue );
            }
        } );

        element.onRemove( function( context, args ) {
            binding.remove();
        } );


        binding.bindElement( {
            setProperty: function( name, value ) {
                var items = element.getItems();
                var isCollectionChanged;

                if( element.isRemoved ) {
                    console.log( 'if you see it, something got wrong with UI-2587' );
                }

                if( itemComparator ) {
                    isCollectionChanged = items.set( value || [], true );

                    items.forEach( function( item, index, collection ) {
                        collection.setProperty( index, 'bindingIndex', index );
                    } );

                    if( isCollectionChanged ) {
                        items.sort( itemComparator );
                    }

                } else {
                    isCollectionChanged = items.set( value || [] );

                    items.forEach( function( item, index, collection ) {
                        collection.setProperty( index, 'bindingIndex', index );
                    } );
                }
            },

            onPropertyChanged: function() {
            }

        }, 'items' );
    }

}, displayFormatBuilderMixin );

