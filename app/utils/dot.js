/**
 * @description Синглтон для работы с путями построенными по dot-notation
 * @type {{getPropertyValue, setPropertyValue, setPropertyValueDirect}}
 */
InfinniUI.ObjectUtils = ( function() {

    /**
     * @description Возвращает значение свойства.
     * @private
     * @param {*} target Исходный объект.
     * @param {array} propertyPathTerms Путь к свойству объекта в виде коллекции термов.
     * @returns {*} Значение свойства.
     */
    function getPropertyByPath( target, propertyPathTerms ) {
        if( target !== null && typeof target !== 'undefined'
            && propertyPathTerms !== null && typeof propertyPathTerms !== 'undefined' ) {

            var parent = target;
            var length = propertyPathTerms.length;

            for( var i = 0; i < length; ++i ) {
                if( parent !== null && typeof parent !== 'undefined' ) {
                    var term = propertyPathTerms[ i ];
                    var termCollectionIndex = parseCollectionIndex( term );

                    if( termCollectionIndex >= 0 ) {
                        parent = getCollectionItem( parent, termCollectionIndex );
                    }
                    else {
                        parent = getObjectProperty( parent, term );
                    }
                }
                else {
                    return null;
                }
            }

            return parent;
        }

        return target;
    }

    /**
     * @description Возвращает значение свойства.
     * @private
     * @param {*} target Исходный объект.
     * @param {array} propertyPathTerms Путь к свойству объекта в виде коллекции термов.
     * @param {*} propertyValue Значение свойства объекта.
     * @returns {*} Значение свойства.
     */
    function setPropertyByPath( target, propertyPathTerms, propertyValue ) {
        var parent = target;
        var length = propertyPathTerms.length - 1;
        var term = propertyPathTerms[ 0 ];
        var termCollectionIndex = parseCollectionIndex( term );

        for( var i = 0; i < length; ++i ) {
            var termValue = ( termCollectionIndex >= 0 )
                ? getCollectionItem( parent, termCollectionIndex )
                : getObjectProperty( parent, term );

            var nextTerm = propertyPathTerms[ i + 1 ];
            var nextTermCollectionIndex = parseCollectionIndex( nextTerm );

            if( nextTermCollectionIndex >= 0 ) {
                if( !Array.isArray( termValue ) ) {
                    termValue = [];
                }

                setCollectionItem( parent, termCollectionIndex, termValue );
            } else {
                if( !$.isPlainObject( termValue ) ) {
                    termValue = {};
                }

                setObjectProperty( parent, term, termValue );
            }

            parent = termValue;
            term = nextTerm;
            termCollectionIndex = nextTermCollectionIndex;
        }

        if( termCollectionIndex >= 0 ) {
            setCollectionItem( parent, termCollectionIndex, propertyValue );
        }
        else {
            setObjectProperty( parent, term, propertyValue );
        }
    }


    /**
     * @description Разбивает путь к свойству, записанному в dot-notation, на термы.
     * @private
     * @param {string} propertyPath Имя свойства.
     */
    function splitPropertyPath( propertyPath ) {
        if( _.isEmpty( propertyPath ) ) {
            return null;
        }

        return propertyPath.split( '.' );
    }

    /**
     * @description Пытается интерпретировать имя свойства, как индекс элемента коллекции.
     * @private
     * @param {string} propertyName Имя свойства.
     * @returns {number} Индекс элемента коллекции или -1.
     */
    function parseCollectionIndex( propertyName ) {
        var index = -1;

        if( propertyName === '$' ) {
            index = 0;
        }
        else {
            var tryParse = parseInt( propertyName );

            if( !isNaN( tryParse ) ) {
                index = tryParse;
            }
        }

        return index;
    }


    /**
     * @description Возвращает элемент коллекции.
     * @private
     * @param {array} target Исходная коллекция.
     * @param {number} index Индекс элемента.
     * @returns {*} Элемент коллекции.
     */
    function getCollectionItem( target, index ) {
        if( target !== null && typeof target !== 'undefined'
            && Object.prototype.toString.call( target ) === '[object Array]'
            && index >= 0 && index < target.length ) {

            return target[ index ];
        }

        return null;
    }

    /**
     * @description Устанавливает элемент коллекции.
     * @private
     * @param {array} target Исходная коллекция.
     * @param {number} index Индекс элемента.
     * @param {*} item Элемент коллекции.
     */
    function setCollectionItem( target, index, item ) {
        if( target !== null && typeof target !== 'undefined'
            && Object.prototype.toString.call( target ) === '[object Array]'
            && index >= 0 && index < target.length ) {

            target[ index ] = item;
        }
    }


    /**
     * @description Возвращает значение свойства объекта.
     * @private
     * @param {object} target Исходный объект.
     * @param {string} propertyName Наименование свойства.
     * @returns {*} Значение свойства.
     */
    function getObjectProperty( target, propertyName ) {
        if( target !== null && typeof target !== 'undefined'
            && Object.prototype.toString.call( target ) === '[object Object]'
            && propertyName !== null && typeof propertyName !== 'undefined' ) {

            return target[ propertyName ];
        }

        return null;
    }

    /**
     * @description Устанавливает значение свойства объекта.
     * @private
     * @param {object} target Исходный объект.
     * @param {string} propertyName Наименование свойства.
     * @param {*} propertyValue Значение свойства.
     */
    function setObjectProperty( target, propertyName, propertyValue ) {
        if( target !== null && typeof target !== 'undefined'
            && Object.prototype.toString.call( target ) === '[object Object]'
            && propertyName !== null && typeof propertyName !== 'undefined' ) {

            target[ propertyName ] = propertyValue;
        }
    }

    return {

        /**
         * @description Возвращает значение свойства.
         * @public
         * @param {*} target Исходный объект.
         * @param {string|Object} propertyPath Путь к свойству или объект для построения значения.
         * @returns {*} Значение свойства.
         */
        getPropertyValue: function( target, propertyPath ) {
            var result;
            var getPropertyValue = function( target, propertyPath ) {
                var propertyPathTerms = splitPropertyPath( propertyPath );
                var result = getPropertyByPath( target, propertyPathTerms );

                return typeof result === 'undefined' ? null : result;
            };

            if( typeof propertyPath === 'object' ) {
                result = {};
                for( var key in propertyPath ) {
                    if( propertyPath.hasOwnProperty( key ) ) {
                        var value = propertyPath[ key ];
                        result[ key ] = getPropertyValue( target, value );
                    }
                }
            } else {
                result = getPropertyValue( target, propertyPath );
            }
            return result;
        },

        /**
         * @description Устанавливает значение свойства.
         * @public
         * @param {*} target Исходный объект.
         * @param {string} propertyPath Путь к свойству.
         * @param {*} propertyValue Значение свойства.
         */
        setPropertyValue: function( target, propertyPath, propertyValue ) {
            if( target !== null && typeof target !== 'undefined' && !_.isEmpty( propertyPath ) ) {
                var propertyPathTerms = splitPropertyPath( propertyPath );

                if( propertyValue instanceof Date ) {
                    setPropertyByPath( target, propertyPathTerms, new Date( propertyValue ) );
                } else if( propertyValue instanceof File ) {
                    setPropertyByPath( target, propertyPathTerms, propertyValue );
                } else {
                    setPropertyByPath( target, propertyPathTerms, propertyValue );
                }
            }
        },

        /**
         *
         * @param target
         * @param propertyPath
         * @param propertyValue
         */
        setPropertyValueDirect: function( target, propertyPath, propertyValue ) {
            if( target !== null && typeof target !== 'undefined' && !_.isEmpty( propertyPath ) ) {
                var propertyPathTerms = splitPropertyPath( propertyPath );
                setPropertyByPath( target, propertyPathTerms, propertyValue );
            }
        }
    };

} )();


