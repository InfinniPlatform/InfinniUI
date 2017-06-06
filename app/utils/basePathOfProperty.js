/**
 *
 * @param basePathOfProperty
 * @param baseIndex
 * @param parentBasePath
 * @constructor
 */
function BasePathOfProperty( basePathOfProperty, baseIndex, parentBasePath ) {
    if( this.isRelativeProperty( basePathOfProperty ) ) {
        this.basePathOfProperty = parentBasePath.basePathOfProperty + this.excludeFirstChar( basePathOfProperty );
    } else {
        this.basePathOfProperty = basePathOfProperty;
    }

    if( !parentBasePath ) {
        if( typeof baseIndex !== 'undefined' && baseIndex !== null ) {
            this.indexesInParentLists = [ baseIndex ];
            this.basePathOfProperty += baseIndex;
        }
    } else {
        this.indexesInParentLists = parentBasePath.indexesInParentLists ? parentBasePath.indexesInParentLists.slice() : [];
        this.indexesInParentLists.push( baseIndex );

        this.parentBasePath = parentBasePath;
    }
}

InfinniUI.BasePathOfProperty = BasePathOfProperty;

_.extend( BasePathOfProperty.prototype, {

    /**
     * @description возвращает полный путь к свойству элемента в коллекции
     * @param property
     * @returns {*}
     */
    resolveProperty: function( property ) {
        if( typeof property === 'undefined' || property === null ) {
            property = '';
        }

        if( this.isRelativeProperty( property ) ) {
            property = this.excludeFirstChar( property );
            return stringUtils.formatProperty( this.basePathOfProperty + property, this.indexesInParentLists );
        } else {
            return stringUtils.formatProperty( property, this.indexesInParentLists );
        }
    },

    /**
     * @description возвращает полный путь к свойству элемента в коллекции по заданному относительному пути
     * @param relativeProperty
     * @returns {*}
     */
    resolveRelativeProperty: function( relativeProperty ) {
        var property;

        if( this.basePathOfProperty != '' ) {
            property = this.basePathOfProperty + '.' + relativeProperty;
        } else {
            property = relativeProperty;
        }

        return this.resolveProperty( property );
    },

    /**
     * @description создает BasePathOfProperty следующего уровня
     * @param basePathOfProperty
     * @param baseIndex
     * @returns {BasePathOfProperty}
     */
    buildChild: function( basePathOfProperty, baseIndex ) {
        return new BasePathOfProperty( basePathOfProperty, baseIndex, this );
    },

    /**
     * @description создает BasePathOfProperty следующего уровня с относительным путем
     * @param basePathOfProperty
     * @param baseIndex
     * @returns {BasePathOfProperty}
     */
    buildRelativeChild: function( basePathOfProperty, baseIndex ) {
        return new BasePathOfProperty( basePathOfProperty, baseIndex, this );
    },

    /**
     *
     * @param property
     * @returns {boolean}
     */
    isRelativeProperty: function( property ) {
        return property.substr( 0, 1 ) == '@';
    },

    /**
     *
     * @param str
     * @returns {string}
     */
    excludeFirstChar: function( str ) {
        return str.substr( 1, str.length - 1 );
    }

} );
