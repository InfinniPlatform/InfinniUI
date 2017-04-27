/**
 *
 * @constructor
 */
function Builder() {
    var objectBuilders = [];

    this.appView = null;

    /**
     *
     * @param metadataType
     * @param objectBuilder
     */
    this.register = function( metadataType, objectBuilder ) {
        objectBuilders[ metadataType ] = objectBuilder;
    };

    /**
     *
     * @param metadataType
     * @param metadataValue
     * @param args
     * @returns {*|null}
     */
    this.buildType = function( metadataType, metadataValue, args ) {
        args = args || {};
        if( typeof objectBuilders[ metadataType ] === 'undefined' ) {
            return null;
        }

        var resultArgs = _.extend( {
            builder: this,
            metadata: metadataValue
        }, args );
        var context = args.parentView ? args.parentView.getContext() : {};

        return objectBuilders[ metadataType ].build( context, resultArgs );
    };

    /**
     *
     * @param metadataValue
     * @param args
     * @returns {*}
     */
    this.build = function( metadataValue, args ) {
        var key;
        var value;
        var result = null;

        args = args || {};

        for( var p in metadataValue ) {
            key = p;
            break; // берем первое найденное свойство в объекте! Остальное игнорируем
        }

        if( typeof key === 'undefined' || key === null ) {
            console.error( 'Builder: Не переданы метаданные' );
        } else {
            value = metadataValue[ key ];
            result = this.buildType( key, value, args );
        }
        return result;
    };

    /**
     *
     * @param metadataValue
     * @param args
     * @returns {Array}
     */
    this.buildMany = function( metadataValue, args ) {
        var items = [];

        if( metadataValue ) {
            for( var i = 0; i < metadataValue.length; i++ ) {
                var item = this.build( metadataValue[ i ], args );

                if( item !== null ) {
                    items.push( item );
                }
            }
        }

        return items;
    };

    /**
     *
     * @param bindingMetadata
     * @param args
     * @returns {*|null}
     */
    this.buildBinding = function( bindingMetadata, args ) {
        var dataBinding = this.buildType( 'PropertyBinding', bindingMetadata, args );

        return dataBinding;
    };
}

InfinniUI.Builder = Builder;
